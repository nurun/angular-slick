'use strict';
angular.module('slick', []).directive('slick', [
  '$timeout',
  '$compile',
  function ($timeout, $compile) {
    return {
      restrict: 'AEC',
      scope: {
        initOnload: '@',
        data: '=',
        currentIndex: '=',
        accessibility: '@',
        adaptiveHeight: '@',
        arrows: '@',
        asNavFor: '@',
        appendArrows: '@',
        appendDots: '@',
        autoplay: '@',
        autoplaySpeed: '@',
        centerMode: '@',
        centerPadding: '@',
        cssEase: '@',
        customPaging: '&',
        customPagingScope: '=',
        dots: '@',
        dotsClass: '@',
        draggable: '@',
        easing: '@',
        edgeFriction: '@',
        fade: '@',
        focusOnSelect: '@',
        focusOnChange: '@',
        infinite: '@',
        initialSlide: '@',
        lazyLoad: '@',
        mobileFirst: '@',
        outerEdgeLimit: '@',
        onBeforeChange: '&',
        onAfterChange: '&',
        onInit: '&',
        onReInit: '&',
        onSetPosition: '&',
        pauseOnHover: '@',
        pauseOnFocus: '@',
        pauseOnDotsHover: '@',
        respondTo: '@',
        responsive: '=',
        rows: '@',
        rtl: '@',
        slide: '@',
        slidesPerRow: '@',
        slidesToShow: '@',
        slidesToScroll: '@',
        speed: '@',
        swipe: '@',
        swipeToSlide: '@',
        touchMove: '@',
        touchThreshold: '@',
        useCSS: '@',
        useTransform: '@',
        variableWidth: '@',
        vertical: '@',
        verticalSwiping: '@',
        waitForAnimate: '@',
        zIndex: '@',
        prevArrow: '@',
        nextArrow: '@'
      },
      link: function (scope, element, attrs) {
        var destroySlick, initializeSlick, isInitialized;
        destroySlick = function () {
          return $timeout(function () {
            var slider;
            slider = $(element);
            slider.slick('unslick');
            slider.find('.slick-list').remove();
            return slider;
          });
        };
        initializeSlick = function () {
          return $timeout(function () {
            var currentIndex, customPaging, slider;
            slider = $(element);
            if (scope.currentIndex != null) {
              currentIndex = scope.currentIndex;
            }
            customPaging = function (slick, index) {
              var customPagingScope;
              customPagingScope = scope.customPagingScope || scope;
              return $compile(scope.customPaging({
                slick: slick,
                index: index
              }))(customPagingScope);
            };
            slider.on('init', function (evt, sl) {
              if (attrs.onInit) {
                scope.onInit();
              }
              if (currentIndex != null) {
                return sl.slideHandler(currentIndex);
              }
            });
            slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
              if (scope.onBeforeChange) {
                scope.onBeforeChange({
                  event: event,
                  slick: slick,
                  currentSlide: currentSlide,
                  nextSlide: nextSlide
                });
              }
              if (currentIndex != null) {
                currentIndex = currentSlide;
                return scope.currentIndex = currentSlide;
              }
            });
            slider.on('afterChange', function (event, slick, currentSlide, nextSlide) {
              if (scope.onAfterChange) {
                scope.onAfterChange({
                  event: event,
                  slick: slick,
                  currentSlide: currentSlide,
                  nextSlide: nextSlide
                });
              }
              if (currentIndex != null) {
                return scope.$apply(function () {
                  currentIndex = currentSlide;
                  return scope.currentIndex = currentSlide;
                });
              }
            });
            slider.slick({
              accessibility: scope.accessibility !== 'false',
              adaptiveHeight: scope.adaptiveHeight === 'true',
              arrows: scope.arrows !== 'false',
              asNavFor: scope.asNavFor ? scope.asNavFor : void 0,
              appendArrows: scope.appendArrows ? $(scope.appendArrows) : $(element),
              appendDots: scope.appendDots ? $(scope.appendDots) : $(element),
              autoplay: scope.autoplay === 'true',
              autoplaySpeed: scope.autoplaySpeed != null ? parseInt(scope.autoplaySpeed, 10) : 3000,
              centerMode: scope.centerMode === 'true',
              centerPadding: scope.centerPadding || '50px',
              cssEase: scope.cssEase || 'ease',
              customPaging: attrs.customPaging ? customPaging : void 0,
              dots: scope.dots === 'true',
              dotsClass: scope.dotsClass || 'slick-dots',
              draggable: scope.draggable !== 'false',
              easing: scope.easing || 'linear',
              edgeFriction: scope.edgeFriction != null ? parseFloat(scope.edgeFriction) : 0.35,
              fade: scope.fade === 'true',
              focusOnSelect: scope.focusOnSelect === 'true',
              focusOnChange: scope.focusOnChange === 'true',
              infinite: scope.infinite !== 'false',
              initialSlide: scope.initialSlide || 0,
              lazyLoad: scope.lazyLoad || 'ondemand',
              mobileFirst: scope.mobileFirst === 'true',
              outerEdgeLimit: scope.outerEdgeLimit === 'true',
              beforeChange: attrs.onBeforeChange ? scope.onBeforeChange : void 0,
              onReInit: attrs.onReInit ? scope.onReInit : void 0,
              onSetPosition: attrs.onSetPosition ? scope.onSetPosition : void 0,
              pauseOnHover: scope.pauseOnHover !== 'false',
              pauseOnFocus: scope.pauseOnFocus !== 'false',
              pauseOnDotsHover: scope.pauseOnDotsHover === 'true',
              respondTo: scope.respondTo || 'window',
              responsive: scope.responsive || void 0,
              rows: scope.rows || 0,
              rtl: scope.rtl === 'true',
              slide: scope.slide || 'div',
              slidesPerRow: scope.slidesPerRow != null ? parseInt(scope.slidesPerRow, 10) : 1,
              slidesToShow: scope.slidesToShow != null ? parseInt(scope.slidesToShow, 10) : 1,
              slidesToScroll: scope.slidesToScroll != null ? parseInt(scope.slidesToScroll, 10) : 1,
              speed: scope.speed != null ? parseInt(scope.speed, 10) : 300,
              swipe: scope.swipe !== 'false',
              swipeToSlide: scope.swipeToSlide === 'true',
              touchMove: scope.touchMove !== 'false',
              touchThreshold: scope.touchThreshold ? parseInt(scope.touchThreshold, 10) : 5,
              useCSS: scope.useCSS !== 'false',
              useTransform: scope.useTransform !== 'false',
              variableWidth: scope.variableWidth === 'true',
              vertical: scope.vertical === 'true',
              verticalSwiping: scope.verticalSwiping === 'true',
              waitForAnimate: scope.waitForAnimate !== 'false',
              zIndex: scope.zIndex != null ? parseInt(scope.zIndex, 10) : 1000,
              prevArrow: scope.prevArrow ? $(scope.prevArrow) : void 0,
              nextArrow: scope.nextArrow ? $(scope.nextArrow) : void 0
            });
            return scope.$watch('currentIndex', function (newVal, oldVal) {
              if (currentIndex != null && newVal != null && newVal !== currentIndex) {
                return slider.slick('slickGoTo', newVal);
              }
            });
          });
        };
        if (scope.initOnload) {
          isInitialized = false;
          return scope.$watch('data', function (newVal, oldVal) {
            if (newVal != null) {
              if (isInitialized) {
                destroySlick();
              }
              initializeSlick();
              return isInitialized = true;
            }
          });
        } else {
          return initializeSlick();
        }
      }
    };
  }
]);
