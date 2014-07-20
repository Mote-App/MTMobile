angular.module('clcontrollers', [])

.controller('AppCtrl', function($scope) {
})

// ***************** Use for the login page :: Start *****************
.controller('LoginCtrl', function($scope, $rootScope, $location, $state) {
  
  $rootScope.appHeader = "CollegeLife";
  $scope.loginData = {};

  $scope.validate = function(event){

      if( this.$parent.loginData.password == "cl123!"){
        //$location.path("#/app/playlists");
         $state.go('app.playlists');
      }
  }

  /*var dataRef = new Firebase("https://ionic-firebase-login.firebaseio.com/");
  $scope.loginObj = $firebaseSimpleLogin(dataRef);

  $scope.tryLogin = function() {
    $scope.loginObj.$login('facebook').then(function(user) {
      // The root scope event will trigger and navigate
    }, function(error) {
      // Show a form error here
      console.error('Unable to login', error);
    });
  };*/
})

.controller('SignupCtrl', function($scope) {
})

.controller('HomeCtrl', function($scope) {
})

// ***************** Use for the login page :: End *****************

.controller('PlaylistsCtrl', function($scope, $http, $ionicSlideBoxDelegate, User) {
  
  /*var data = Schools.query(function(imgData) { 
    $scope.imglists = imgData.schools;
  });*/
  
  var data = User.query(function(userData) { 
    $scope.users = userData.users[0].friends;
  });

  $scope.$broadcast('slideBox.setSlide', 1);

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
            return false;
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

          $('#menu16').circleMenu({
                    direction:'full', 
                    trigger:'click',
                    open: function(){console.log('menu opened');},
                    close: function(){console.log('menu closed');},
                    init: function(){console.log('menu initialized');},
                    select: function(evt,index){console.log(evt,index)}
                }).on('circleMenu-open',function(){
                    console.log('menu opened 2');
                });
        });

        
})

.controller('PlaylistCtrl', function($scope, $stateParams) {

})

.controller('SearchCtrl', function($scope, $stateParams) {

jQuery(document).ready(function(){

    $('#menu2').circleMenu({
                    item_diameter: 20,
                    circle_radius: 100,
                    direction:'full', 
                    trigger:'click',
                    open: function(){console.log('menu opened');},
                    close: function(){console.log('menu closed');},
                    init: function(){console.log('menu initialized');},
                    select: function(evt,index){console.log(evt,index)}
                }).on('circleMenu-open',function(){
                    console.log('menu opened 2');
                });
        });

})
