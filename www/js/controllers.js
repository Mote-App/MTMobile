angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.imglists = [
    { imgPath: 'img/1.jpg', id: 1, comment: 'Healthy Living' },
    { imgPath: 'img/2.jpg', id: 2, comment: 'Beautiful Sunset' },
    { imgPath: 'img/3.jpg', id: 3, comment: 'Cosmic Wonder'},
    { imgPath: 'img/4.jpg', id: 4, comment: 'Pure Water' },
    { imgPath: 'img/5.jpg', id: 5, comment: 'Green Effect' },
    { imgPath: 'img/6.jpg', id: 6, comment: 'Healthy Living' },
    { imgPath: 'img/7.jpg', id: 6, comment: 'Water Density' },
    { imgPath: 'img/8.jpg', id: 6, comment: 'Cosmic Rays' },
    { imgPath: 'img/9.jpg', id: 6, comment: 'Beautiful Fall' }
  ];

   jQuery(document).ready(function(){

            var carousel = $("#carousel").waterwheelCarousel({
            flankingItems: 3,
            movingToCenter: function ($item) {
              $('#callback-output').prepend('movingToCenter: ' + $item.attr('id') + '<br/>');
            },
            movedToCenter: function ($item) {
              $('#callback-output').prepend('movedToCenter: ' + $item.attr('id') + '<br/>');
            },
            movingFromCenter: function ($item) {
              $('#callback-output').prepend('movingFromCenter: ' + $item.attr('id') + '<br/>');
            },
            movedFromCenter: function ($item) {
              $('#callback-output').prepend('movedFromCenter: ' + $item.attr('id') + '<br/>');
            },
            clickedCenter: function ($item) {
              $('#callback-output').prepend('clickedCenter: ' + $item.attr('id') + '<br/>');
            }
          });

          $('#prev').bind('click', function () {
            carousel.prev();
            return false
          });

          $('#next').bind('click', function () {
            carousel.next();
            return false;
          });

          $('#reload').bind('click', function () {
            newOptions = eval("(" + $('#newoptions').val() + ")");
            carousel.reload(newOptions);
            return false;
          });

          $('#socialLife').bind('click', function () {
              $("#subtags").empty();
              $("#subtags").append(buildElement(subtagsText.socialLife));
          });

          $('#smarts').bind('click', function () {
              $("#subtags").empty();
              $("#subtags").append(buildElement(subtagsText.smarts));
          });

          $('#sex').bind('click', function () {
              $("#subtags").empty();
              $("#subtags").append(buildElement(subtagsText.sex));
          });

        });
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})
