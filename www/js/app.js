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

.run(function($ionicPlatform, $rootScope) {
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

    $rootScope.appHeader="";

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
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    });
  
  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('index');
  $urlRouterProvider.otherwise('/app/login');
});

