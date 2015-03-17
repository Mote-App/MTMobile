// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'clcontrollers','clservices','pageslide-directive', 'angular-carousel'])

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

.run(['$ionicPlatform', '$rootScope', '$filter', '$window'],
		function($ionicPlatform, $rootScope, $filter, $window) {

	//AWS http://54.149.27.205
	$rootScope.clhost = "http://54.149.27.205";
	$rootScope.clport = ":8080";
	$rootScope.lstTag = {};
	$rootScope.friends = true;
	$rootScope.school = false;
	$rootScope.nation = false;
	
	 $window.fbAsyncInit = function() {
        FB.init({
          appId      : '956170854392949',
          xfbml      : false,
          version    : 'v2.1'
        });
      };
	      
      
      (function(d){
    	    // load the Facebook javascript SDK

    	    var js, 
    	    id = 'facebook-jssdk', 
    	    ref = d.getElementsByTagName('script')[0];

    	    if (d.getElementById(id)) {
    	      return;
    	    }

    	    js = d.createElement('script'); 
    	    js.id = id; 
    	    js.async = true;
    	    js.src = "//connect.facebook.net/en_US/all.js";

    	    ref.parentNode.insertBefore(js, ref);

    	}(document));

      
	$rootScope.setContext = function(context){
		
		if( context == 'friends'){
			$rootScope.friends = true;
			$rootScope.school = false;
			$rootScope.nation = false;
			
		}
		if( context == 'school'){
			$rootScope.friends = false;
			$rootScope.school = true;
			$rootScope.nation = false;
			
		}
		if( context == 'nation'){
			$rootScope.friends = false;
			$rootScope.school = false;
			$rootScope.nation = true;

		}

	}
	
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

    

    $rootScope.userId = 0;
    $rootScope.collegeId = 0;
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
    
    $rootScope.formatTags = function(tagArr){
    	
    	var formattedStr = "";
    	for( var i = 0; i < tagArr.length; i++){
    		
    		formattedStr = formattedStr + tagArr[i];
    		
    		if ( i != (tagArr.length -1)){
    			formattedStr = formattedStr + ", ";
    		}
    	}
    	
    	return formattedStr;
    };
    
  });
  
  
})

.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
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
    
    .state('app.update_profile_img', {
      url: "/create_account",
      views: {
        'menuContent' :{
      templateUrl: "templates/upload_profile_img.html",
      controller: 'UploadProfileImgCtrl'
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

    .state('app.logout', {
      url: "/logout",
      views: {
        'menuContent' :{
          templateUrl: "templates/login.html",
          controller: 'LoginCtrl'
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
    })
    
    .state('app.new_post', { 
    	url: "/new_post",
    	views : {
    		'menuContent' :{
    			templateUrl: "templates/new_post.html",
    			controller: 'NewPostCtrl',
    			resolve: {
    					imageURI: function($q, Camera){
    						
    						var deferred = $q.defer();
					    	Camera.getPicture().then(function(imageURI){
					    		deferred.resolve(imageURI);
							},
							function(error){
								deferred.resolve(error);
							},
							{
								quality : 75,
								targetWidth: 300,
					            targetHeight: 300,
					            //popoverOptions: CameraPopoverOptions,
					            saveToPhotoAlbum: false,
					            encodingType: navigator.camera.EncodingType.JPEG,
					            destinationType: navigator.camera.DestinationType.FILE_URI
							}
							);
					    	return deferred.promise;
    					}
    			}
    			
    		}
    	}
    })
    ;
  
  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('index');
  $urlRouterProvider.otherwise('/app/create_account');
  
  
	  /* Registers auth token interceptor, auth token is either passed by header or by query parameter
	   * as soon as there is an authenticated user */
	/*  $httpProvider.interceptors.push(function ($q, $rootScope, $location) {
	      return {
	      	'request': function(config) {
	      		var isRestCall = config.url.indexOf('rest') == 0;
	      		if (isRestCall && angular.isDefined($rootScope.authToken)) {
	      			var authToken = $rootScope.authToken;
	      			if (exampleAppConfig.useAuthTokenHeader) {
	      				config.headers['X-Auth-Token'] = authToken;
	      			} else {
	      				config.url = config.url + "?token=" + authToken;
	      			}
	      		}
	      		return config || $q.when(config);
	      	}
	      };
	  }
	);*/
});

