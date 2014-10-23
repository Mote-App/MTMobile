// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'clcontrollers','clservices'])

/*.run(function($ionicPlatform, $rootScope, $firebaseSimpleLogin, $state, $window) {
  var dataRef = new Firebase("https://ionic-firebase-login.firebaseio.com/");
  var loginObj = $firebaseSimpleLogin(dataRef);
  
  loginObj.$getCurrentUser().then(function(user) {
    if(!user){ 
      // Might already be handled by logout event below
      $state.go('app.login');
    }
  }, function(err) {
  });
  
  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    $state.go('app.home_landing');
  });
  
  $rootScope.$on('$firebaseSimpleLogin:logout', function(e, user) {
    console.log($state);
    $state.go('app.login');
  });
})*/

.run(function($ionicPlatform, $rootScope, $filter, Tags) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    Tags.query(function(tagData) { 
        $rootScope.allSubtags = tagData.subtags;
        $rootScope.smartArr =  $rootScope.allSubtags.smarts;
        $rootScope.socialArr = $rootScope.allSubtags.socials;
        $rootScope.genreArr =  $rootScope.allSubtags.genre;

    });

    $rootScope.appHeader="";

    $rootScope.findTagByTagId = function(tagId){

      var result = tagId.split('_');
      var tagObj = {};
      //smart
      if( result[0] == "1"){
        tagObj = ($filter('filter')($rootScope.smartArr,{id: tagId}))[0];
        //($rootScope.smartArr | filter:{id: tagId } )[0].tagText;
      }
      //social
      if( result[0] == "2"){
        tagObj = ($filter('filter')($rootScope.socialArr,{id: tagId}))[0];
      }
      //genre
      if( result[0] == "3"){
        tagObj = ($filter('filter')($rootScope.genreArr,{id: tagId}))[0];
      }
      
      return tagObj.tagText;
    };

    $scope.takePicture = function() {
    var options = { 
        quality : 75, 
        destinationType : Camera.DestinationType.DATA_URL, 
        sourceType : Camera.PictureSourceType.CAMERA, 
        allowEdit : true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      // Success! Image data is here
    }, function(err) {
        // An error occured. Show a message to the user
      });
    };
  

  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.login', {
      url: "/login",
      views: {
        'menuContent' :{
      templateUrl: "templates/login.html",
      controller: 'LoginCtrl'
      }
     }
    })

    .state('app.create_account', {
      url: "/create_account",
      views: {
        'menuContent' :{
      templateUrl: "templates/create_account.html",
      controller: 'LoginCtrl'
      }
     }
    })
    
    .state('app.forgot_password', {
      url: "/forgot_password",
      views: {
        'menuContent' :{
      templateUrl: "templates/forgot_password.html",
      controller: 'LoginCtrl'
      }
     }
    })
    // ***************** Use for the login page :: Start *****************
    .state('app.splash', {
      url: "/",
      views: {
        'menuContent' :{
          templateUrl: "templates/splash.html"
        }
      }
    })
    
    
    
    .state('app.signup', {
      url: "/signup",
      views: {
        'menuContent' :{
          templateUrl: "templates/signup.html",
          controller: 'SignupCtrl'
        }
      }
    })
    
    .state('app.home_landing', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller: 'HomeCtrl'
        }
      }
    })
    // ***************** Use for the login page :: End *****************
    
    .state('app.profile', {
      url: "/profile",
      views: {
        'menuContent' :{
          templateUrl: "templates/profile.html",
          controller: 'ProfileCtrl'
        }
      }
    })

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html",
          controller: 'SearchCtrl'
        }
      }
    })

    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/browse.html"
        }
      }
    })
    .state('app.friends_feeds', {
      url: "/friends_feeds",
      views: {
        'menuContent' :{
          templateUrl: "templates/friends_feeds.html",
          controller: 'FriendsFeedsCtrl'
        }
      }
    })

	.state('app.school_feeds', {
      url: "/school_feeds",
      views: {
        'menuContent' :{
          templateUrl: "templates/school_feeds.html",
          controller: 'SchoolFeedsCtrl'
        }
      }
    })
	
	.state('app.national_feeds', {
      url: "/national_feeds",
      views: {
        'menuContent' :{
          templateUrl: "templates/national_feeds.html",
          controller: 'NationalFeedsCtrl'
        }
      }
    })
	
    .state('app.custom_tags', {
      url: "/custom_tags",
      views: {
        'menuContent' :{
          templateUrl: "templates/custom_tags.html",
          controller: 'CustomTagCtrl'
        }
      }
    });
  
  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('index');
  $urlRouterProvider.otherwise('/app/login');
});

