'use strict'

angular.module('slick', [])
  .directive "slick", ($timeout,$compile) ->
    restrict: "AEC"
    scope:
      initOnload: "@"
      data: "="
      currentIndex: "="
      accessibility: "@"
      adaptiveHeight: "@"
      arrows: "@"
      asNavFor: "@"
      appendArrows: "@"
      appendDots: "@"
      autoplay: "@"
      autoplaySpeed: "@"
      centerMode: "@"
      centerPadding: "@"
      cssEase: "@"
      customPaging: "&"
      customPagingScope: '='
      dots: "@"
      dotsClass: "@"
      draggable: "@"
      easing: "@"
      edgeFriction: "@"
      fade: "@"
      focusOnSelect: "@"
      focusOnChange: "@"
      infinite: "@"
      initialSlide: "@"
      lazyLoad: "@"
      mobileFirst: "@"
      onBeforeChange: "&"
      onAfterChange: "&"
      onInit: "&"
      onReInit: "&"
      onSetPosition: "&"
      pauseOnHover: "@"
      pauseOnFocus: "@"
      pauseOnDotsHover: "@"
      respondTo: "@"
      responsive: "="
      rows: "@"
      rtl: "@"
      slide: "@"
      slidesPerRow: "@"
      slidesToShow: "@"
      slidesToScroll: "@"
      speed: "@"
      swipe: "@"
      swipeToSlide: "@"
      touchMove: "@"
      touchThreshold: "@"
      useCSS: "@"
      useTransform: "@"
      variableWidth: "@"
      vertical: "@"
      verticalSwiping: "@"
      waitForAnimate: "@"
      zIndex: "@"
      prevArrow:"@"
      nextArrow:"@"

    link: (scope, element, attrs) ->
      destroySlick = () ->
        $timeout(() ->
          slider = $(element)
          slider.slick('unslick')
          slider.find('.slick-list').remove()
          slider
        )
      initializeSlick = () ->
        $timeout(() ->
          slider = $(element)

          currentIndex = scope.currentIndex if scope.currentIndex?

          customPaging = (slick, index) ->
            customPagingScope = scope.customPagingScope || scope;
            $compile(scope.customPaging({ slick: slick, index: index }))(customPagingScope)

          slider.on 'init', (evt, sl) ->
            scope.onInit() if attrs.onInit
            if currentIndex?
              sl.slideHandler(currentIndex)

          slider.on 'beforeChange', (event, slick, currentSlide, nextSlide) ->
            scope.onBeforeChange({event:event, slick: slick, currentSlide: currentSlide, nextSlide: nextSlide }) if scope.onBeforeChange

            if currentIndex?
                currentIndex = currentSlide
                scope.currentIndex = currentSlide

          slider.on 'afterChange', (event, slick, currentSlide, nextSlide) ->
            scope.onAfterChange({event:event, slick: slick, currentSlide: currentSlide, nextSlide: nextSlide }) if scope.onAfterChange

            if currentIndex?
              scope.$apply(->
                currentIndex = currentSlide
                scope.currentIndex = currentSlide
              )

          slider.slick
            accessibility: scope.accessibility isnt "false"
            adaptiveHeight: scope.adaptiveHeight is "true"
            arrows: scope.arrows isnt "false"
            asNavFor: if scope.asNavFor then scope.asNavFor else undefined
            appendArrows: if scope.appendArrows then $(scope.appendArrows) else $(element)
            appendDots: if scope.appendDots then $(scope.appendDots) else $(element)
            autoplay: scope.autoplay is "true"
            autoplaySpeed: if scope.autoplaySpeed? then parseInt(scope.autoplaySpeed, 10) else 3000
            centerMode: scope.centerMode is "true"
            centerPadding: scope.centerPadding or "50px"
            cssEase: scope.cssEase or "ease"
            customPaging: if attrs.customPaging then customPaging else undefined
            dots: scope.dots is "true"
            dotsClass: scope.dotsClass or "slick-dots"
            draggable: scope.draggable isnt "false"
            easing: scope.easing or "linear"
            edgeFriction: if scope.edgeFriction? then parseFloat(scope.edgeFriction) else 0.35
            fade: scope.fade is "true"
            focusOnSelect: scope.focusOnSelect is "true"
            focusOnChange: scope.focusOnChange is "true"
            infinite: scope.infinite isnt "false"
            initialSlide:scope.initialSlide or 0
            lazyLoad: scope.lazyLoad or "ondemand"
            mobileFirst: scope.mobileFirst is "true"
            beforeChange: if attrs.onBeforeChange then scope.onBeforeChange else undefined
            onReInit: if attrs.onReInit then scope.onReInit else undefined
            onSetPosition: if attrs.onSetPosition then scope.onSetPosition else undefined
            pauseOnHover: scope.pauseOnHover isnt "false"
            pauseOnFocus: scope.pauseOnFocus isnt "false"
            pauseOnDotsHover: scope.pauseOnDotsHover is "true"
            respondTo: scope.respondTo or "window"
            responsive: scope.responsive or undefined
            rows: scope.rows or 0
            rtl: scope.rtl is "true"
            slide: scope.slide or "div"
            slidesPerRow: if scope.slidesPerRow? then parseInt(scope.slidesPerRow, 10) else 1
            slidesToShow: if scope.slidesToShow? then parseInt(scope.slidesToShow, 10) else 1
            slidesToScroll: if scope.slidesToScroll? then parseInt(scope.slidesToScroll, 10) else 1
            speed: if scope.speed? then parseInt(scope.speed, 10) else 300
            swipe: scope.swipe isnt "false"
            swipeToSlide: scope.swipeToSlide is "true"
            touchMove: scope.touchMove isnt "false"
            touchThreshold: if scope.touchThreshold then parseInt(scope.touchThreshold, 10) else 5
            useCSS: scope.useCSS isnt "false"
            useTransform: scope.useTransform isnt "false"
            variableWidth: scope.variableWidth is "true"
            vertical: scope.vertical is "true"
            verticalSwiping: scope.verticalSwiping is "true"
            waitForAnimate: scope.waitForAnimate isnt "false"
            zIndex: if scope.zIndex? then parseInt(scope.zIndex, 10) else 1000
            prevArrow: if scope.prevArrow then $(scope.prevArrow) else undefined
            nextArrow: if scope.nextArrow then $(scope.nextArrow) else undefined

          scope.$watch("currentIndex", (newVal, oldVal) ->
            if currentIndex? and newVal? and newVal != currentIndex
              slider.slick('slickGoTo', newVal)
          )
        )

      if scope.initOnload
        isInitialized = false
        scope.$watch("data", (newVal, oldVal) ->
          if newVal?
            if isInitialized
              destroySlick()

            initializeSlick()
            isInitialized = true
        )
      else
        initializeSlick()
