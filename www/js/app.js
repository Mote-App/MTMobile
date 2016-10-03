'use strict';
angular.module('Mote', ['ionic', 'ionic.cloud',
                            'ngCordova', 
                            'mtControllers',
                            'mtServices',
                            'pageslide-directive',
                            'http-auth-interceptor',
                            'header',
                            'footer'])

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

.run(function($ionicPlatform, $rootScope, $filter, $window, $state, $localstorage) {

	//$cordovaStatusbar.hide();
	
	// AWS EC2 URL http://54.149.27.205     Account was closed 28th December 2015
	// New AWS EC2 URL http://54.200.159.155
	$rootScope.clhost = "http://54.200.159.155";  // localhost URL
	$rootScope.clport = ":8080";
	$rootScope.lstTag = null;
	$rootScope.colleges = null;
	$rootScope.userId;
	
	$rootScope.showSettingMenu = false;
	
	$rootScope.friends = true;
	$rootScope.school = false;
	$rootScope.nation = false;
	$rootScope.public = true;
	$rootScope.username = false;
	$rootScope.anonymous = false;
	$rootScope.caption = false;
	
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, error){ 
		
		if (toState.data == undefined || !angular.isFunction(toState.data.rule)) return;
		
		if( toState.name == "app.logout"){
			$localstorage.set("token","0");
			$localstorage.set("collegeId","0");
		}
		var result = toState.data.rule();
		
		if (result) {
			
			event.preventDefault();
			
			/*
			 * Several decision point to make user to land safely on required page
			 * 1. First time user installed the App, check with installed flag, if undefined then it is new install. Store the installed flag with true value.
			 * 2. User re-installed the App. while deleting App, the "installed" flag should be removed. So that consider fresh install.  
			 * 3. User logged out. Check for "token" flag if undefined or null then redirect to login page.
			 * 4. User password is stored in cache then redirect to friends feed page.
			 *  
			 */
			
			var installed = $localstorage.get('installed');
			
			if( installed == undefined || isNaN(installed ) || installed == 0){
				$localstorage.set("installed","1");
				$state.go('app.create_account', toParams, {notify: true});
			}
			
			var token = $localstorage.get('token');
			
			if( token == undefined || isNaN(token) || token == 0){
				$state.go('app.login',toParams, {notify: true});
			}else if( token > 0){
				$rootScope.userId = token;
				$state.go('app.friends_feeds',toParams, {notify: true});
			}	
		}
	});
			
	
   $ionicPlatform.ready(function () {
      if (window.StatusBar) {
          StatusBar.styleDefault();
      }
  });

  /*$rootScope.$on('$stateChangeStart', function(event, toState) {
      if (toState.name !== "app.login" && toState.name !== "app.logout" && !$window.sessionStorage['fbtoken']) {
          $state.go('app.create_account');
          event.preventDefault();
      }
  });*/

  $rootScope.$on('OAuthException', function() {
      $state.go('app.login');
  });

  	$rootScope.postType = "anonymous";
  	
	$rootScope.setContext = function(context, nonav){
		
		if( context == 'friends'){
			$rootScope.friends = true;
			$rootScope.school = false;
			$rootScope.nation = false;
			
			if(nonav != "nonav"){
				$state.go('app.friends_feeds');
			}
		}
		if( context == 'school'){
			$rootScope.friends = false;
			$rootScope.school = true;
			$rootScope.nation = false;
			
			if(nonav != "nonav"){
				$state.go('app.school_feeds');
			}
		}
		if( context == 'nation'){
			$rootScope.friends = false;
			$rootScope.school = false;
			$rootScope.nation = true;
			
			if(nonav != "nonav"){
				$state.go('app.national_feeds');
			}
		}
		
		if( context == 'anonymous'){
			$rootScope.anonymous = true;
			$rootScope.public = false;
			$rootScope.username = false;
			$rootScope.postType = "anonymous";
			
		}
		
		if( context == 'username'){
			$rootScope.username = true;
			$rootScope.public = false;
			$rootScope.anonymous = false;
			$rootScope.postType = "username";
		}
		
		if( context == 'public'){
			$rootScope.public = true;
			$rootScope.anonymous = false;
			$rootScope.username = false;
			$rootScope.postType = "public";
			
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
      //StatusBar.styleDefault();
    	StatusBar.hide();
    }

    

    $rootScope.userId = 0;
    $rootScope.collegeId = 0;
    $rootScope.appHeader="";
    
    $rootScope.findTagByTagId = function(tagId){

      var tagObj = {};
      
      /*
       * Using angularJS provided filter, 
       * one issue is it filters value using pattern matching for string
       * For example if tagId = 1, then it returns arrays of 1, 10, 11 and so on.
       * So using the first index [0] to get the right result, assuming the master 
       * tag list is sorted in ASC order
       */
      
      tagObj = ($filter('filter')($rootScope.lstTag.tags,{tagId: tagId}))[0];
      
      return tagObj.tagDescription;
    };
    
    $rootScope.findCollegeByCollegeId = function(collegeId){

        var collegeObj = {};
        
        /*
         * Using angularJS provided filter, 
         * one issue is it filters value using pattern matching for string
         * For example if tagId = 1, then it returns arrays of 1, 10, 11 and so on.
         * So using the first index [0] to get the right result, assuming the master 
         * tag list is sorted in ASC order
         */
        
        collegeObj = ($filter('filter')($rootScope.colleges,{collegeId: collegeId}))[0];
        
        return tagObj.tagDescription;
      };
      
    $rootScope.formatTags = function(tagArr){
    	
    	var formattedStr = "";
    	for( var i = 0; i < tagArr.length; i++){
    		
    		var tagDescription = $rootScope.findTagByTagId(tagArr[i]);
    		
    		formattedStr = formattedStr + tagDescription;
    		
    		if ( i != (tagArr.length -1)){
    			formattedStr = formattedStr + ", ";
    		}
    	}
    	
    	return formattedStr;
    };
    
    $rootScope.formatColleges = function(collegeArr){
    	
    	var formattedStr = "";
    	for( var i = 0; i < collegeArr.length; i++){
    		
    		var collegeName = $rootScope.findCollegeByCollegeId(collegeArr[i]);
    		
    		formattedStr = formattedStr + collegeName;
    		
    		if ( i != (collegeArr.length -1)){
    			formattedStr = formattedStr + ", ";
    		}
    	}
    	
    	return formattedStr;
    };
    	
  });

})



.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $sceDelegateProvider, $ionicCloudProvider) {
  
	//$facebookProvider.setAppId('956170854392949').setPermissions(['email','user_friends']);
	
	$ionicCloudProvider.init({
		core: {
			app_id: '730ecd86'
		}
	});
	
	//Set the whitelist URL 
	$sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/video.xx.fbcdn.net/.+$'), new RegExp('^(http[s]?):\/\/scontent.xx.fbcdn.net/.+$')]);
	
	$stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })
    .state('app.initialize', {
      url: "/initialize",
      data: {
    	  
    	  rule: function(){
    		  return true;
    	  }
      }
    })
    
    .state('app.logout', {
      url: "/logout",
      data: {
    	  
    	  rule: function(){
    		  
    		  //$localstorage.set('token',"");
    		  //$rootScope.showSettingMenu = false;
    		  return true;
    	  }
      }
    })
    .state('error',{
    	url: "/error",
    	views: {
            	'menuContent' :{
            	templateUrl: "templates/error.html"
            	
          }
         }
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
        
    /* Instagram Authorization
     * 
     */
    .state('access_token', {
            url: "/access_token={access_token}",
            templateUrl: '',
            controller: 'IGLoginCtrl'
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
    
    .state('app.content_aggregation', {
      url: "/aggregation",
      views: {
        'menuContent' :{
          templateUrl: "templates/login_to_aggregate.html",
          controller: 'fbCtrl',
          resolve: {
        	  moteUserId: function($localstorage, $rootScope){
        		  return $localstorage.get("token");
        	  }
          }
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
    
	.state('app.test_page', {
		url: "/test_page",
		views: {
			'menuContent' :{
				templateUrl: "templates/test_page.html",
				controller: 'FriendsFeedsCtrl'
				
			}
		}
	})
	
	.state('app.add_friends',{
		url:"/add_friends",
		views:{
			'menuContent' :{
				templateUrl: "templates/add_friends.html",
				controller: 'AddFriendsCtrl'
				
			}
		}
			
	})
	
    .state('app.new_post', { 
    	url: "/new_post",
    	views : {
    		'menuContent' :{
    			templateUrl: "templates/new_post.html",
    			controller: 'NewPostCtrl' 
    				/*,
    			resolve: {
    					imageURI: function(Camera){ //$q, 
    						
    						//var deferred = $q.defer();
					    	Camera.getPicture().then(function(imageURI){
					    		//deferred.resolve(imageURI);
								return imageURI;
							},
							function(error){
								//deferred.resolve(error);
								return imageURI;
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
					    	//return deferred.promise;
    					}
    			}*/
    			
    		}
    	}
    });
    
  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('index');
  $urlRouterProvider.otherwise('/app/initialize');
  //$urlRouterProvider.otherwise('/app/test_page');
  
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
})

.constant('$ionicLoadingConfig', {
	  
})

.config(function($httpProvider, $compileProvider) {
	
	$httpProvider.interceptors.push('MoteInterceptor');
	$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
});

