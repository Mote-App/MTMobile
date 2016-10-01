angular.module('mtControllers', ['ionic.cloud'])

.filter('sliceTag', function() {
  return function(input, indexRange) {
    var indexes = indexRange.split(",");
    var start = parseInt(indexes[0], 10);
    var end = parseInt(indexes[1], 10);

    return input.slice(start, (start+end));
  };
})



.directive("postContent", function(){
	
	return{
		
		restrict: 'E',
		scope: {
			post: '=',
			user: '=',
			clhost: '@',
			level: '@'
		},
		controller: function($scope, $rootScope, $localstorage, Like, View){
			
			$scope.updateLike = function(post){
				
				/*
				 * Always a post will be liked once by a given user. So to avoid duplicate likes
				 * post.likeDone attribute is used. Only update like if post.likeDone == false
				 *  
				 */
				if( post.likeDone == false){
					$scope.selectedPost = post;
					Like.update({likeCount: 1, profileId: $localstorage.get('token'), postId: post.postId, level:$scope.level},function(like) { 
				    	$scope.selectedPost.likes = like.likeCount;
				    });
					
					//Update the view count if user liked the post.
					$scope.updateView($scope.selectedPost); 
				}
			};
			
			$scope.updateView = function(post){
				
				//View is once per user per post
				if( post.viewDone == false){
					View.update({viewCount: 1, profileId: $localstorage.get('token'), postId: post.postId, level:$scope.level});
				}
				
			};
			
			$scope.findTagByTagId = function(tagId){
			 return $rootScope.findTagByTagId(tagId); 
			}
			
			$scope.checkMediaType = function(post){
					
					var mediaUrl = post.postImg;
					
					if (mediaUrl.indexOf(".jpg") != -1){
						//console.log ("image");
						return "image";
					}
					if (mediaUrl.indexOf(".mp4") != -1){
						//console.log ("video");
						return "video";
					}
					
			};
			    
	    },
		link: function(scope,element,attrs){
			var videoIframe = element.find("iframe")
			if( videoIframe != undefined || videoIframe != null){
				videoIframe.attr('src',scope.post.postImg);
			}
			
		},
		templateUrl: 'templates/post_content.html' 
	}
})





.directive('repeatComplete', function(){ 
	function link (scope, element, attrs) {
		if (scope.$last){
			 var completeExpression = attrs.repeatComplete;
			 scope.$eval( completeExpression );
		}
	}
	
	return {
      link: link
    };
})

.directive('mediaData', function(){

    return {
        restrict: 'E',
        scope: {
        },
        controller: function($scope, $cordovaCamera){

          $scope.takePicture = function() {
            var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
	      $cordovaCamera.getPicture(options).then(function(imageData) {
	      	if(imageData == null){
	      		$scope.imgURI = "img/blank.png";
	      	}else{
	          $scope.imgURI = "data:image/jpeg;base64," + imageData;
	        }
	      }, function(err) {
	          // An error occured. Show a message to the user
	          $scope.imgURI = "img/blank.png";
	      });
          
          
          
        };
        
        	$scope.takePicture();

        },
        link: function(scope, element, attrs){
			
        },
        template: '<img class="full-image" ng-show="imgURI !== undefined" ng-src="{{imgURI}}">'  
    }
})

.directive('slidePage', function(){
	
	return{
	
		restrict: 'EA',
		controller: function($scope, $rootScope, Schools,schoolFeedCutomizer){
			 
			$scope.feedFilterTags = [];
			
			$scope.tagSelected = false;
			
			$scope.setTagID = function(tagId){
				
				//var ind = $scope.feedFilterTags.indexOf(tagId);
				
				var searchObj = _.findWhere($scope.feedFilterTags, {tagId: tagId});
					
				var tagObj = _.find($rootScope.lstTag.tags, function(tag){ return tag.tagId == tagId});
				
				//var subTagObj =  $scope.subTags[subTagIndex];
						
				if(searchObj == undefined || searchObj == null){
					$scope.feedFilterTags.push(tagObj);
					//$scope.tagSelected = true;
					
					tagObj.selected = true;
				}else {
					//Remove the existing one.
					$scope.feedFilterTags = _.reject($scope.feedFilterTags, function(tag){
					      return tag.tagId == tagId;
					});
					//$scope.tagSelected = false;
					tagObj.selected = false;
				}
				
				//$scope.selectedTagDescriptions = $rootScope.formatTags($scope.feedFilterTags);
			};
			
			
			$scope.applyCustomization = function(){
				$scope.checked = !$scope.checked;
				
				/*
				 * Call filter for School level post if user specified one
				 */
				if ($scope.feedFilterColleges.length > 0 || $scope.feedFilterTags.length > 0){
					
					$scope.feedFilterCollegeIds = _.pluck($scope.feedFilterColleges, 'collegeId');
					$scope.feedFilterTagIds = _.pluck($scope.feedFilterTags, 'tagId');
					
					var schoolFilters = {collegeIds: $scope.feedFilterCollegeIds, lstTags: $scope.feedFilterTagIds};
							
					schoolFeedCutomizer.query(schoolFilters).$promise.then(
						function(response){
							$scope.schoolUsers = response;
						},
						function(error){
							console.log("Filter failed");
						}
					);
				}
			};
			
			
			$scope.feedFilterColleges = [];
			
			$scope.collegeSelected = false;
			
			$scope.setCollegeId = function(collegeId){
				
				//var ind = $scope.feedFilterColleges.indexOf(collegeId);
				
				var searchObj = _.findWhere($scope.feedFilterColleges, {collegeId: collegeId});
				
				var collegeObj = _.find($rootScope.colleges, function(college){ return college.collegeId == collegeId});
				
				//var subTagObj =  $scope.subTags[subTagIndex];
						
				if(searchObj == undefined || searchObj == null){
					$scope.feedFilterColleges.push(collegeObj);
					//$scope.tagSelected = true;
					collegeObj.selected = true;
				}else {
					//Remove the existing one.
					$scope.feedFilterColleges = _.reject($scope.feedFilterColleges, function(college){
					      return college.collegeId == collegeId;
					});
					//$scope.tagSelected = false;
					collegeObj.selected = false;
				}
				
				//$scope.selectedCollegeDescriptions = $rootScope.formatTags($scope.feedFilterColleges);
			};
			
			/*$scope.subTags = [];
			
			$scope.showSubtags = function(tag){
				
				if(tag == 'socials'){
					$scope.subTags  = $rootScope.lstTag.socials;
				}
				
				if(tag == 'smarts'){
					$scope.subTags  = $rootScope.lstTag.smarts;
				}
				
				if(tag == 'genre'){
					$scope.subTags  = $rootScope.lstTag.genre;
				}
				
				_.each($scope.subTags, function(tagObj){
					
					tagObj.selected = false;
				});
			}*/
		},
		link: function(scope, element, attrs){
			
		},
		templateUrl: 'templates/pageslide.html'
	}
})

.directive('newPostSlidePage', function(){
	
	return{
		
		restrict: 'EA',
		controller: function($scope, $rootScope){
			
			$scope.caption="";
			
			$scope.updateRootScope = function(){
				
				$rootScope.caption = $scope.caption
			};
			
			$scope.setTagID = function(tagId){
				
				//var ind = $scope.feedFilterTags.indexOf(tagId);
				
				var searchObj = _.findWhere($scope.feedFilterTags, {tagId: tagId});
					
				var tagObj = _.find($rootScope.lstTag.tags, function(tag){ return tag.tagId == tagId});
				
				//var subTagObj =  $scope.subTags[subTagIndex];
						
				if(searchObj == undefined || searchObj == null){
					$scope.feedFilterTags.push(tagObj);
					//$scope.tagSelected = true;
					
					tagObj.selected = true;
				}else {
					//Remove the existing one.
					$scope.feedFilterTags = _.reject($scope.feedFilterTags, function(tag){
					      return tag.tagId == tagId;
					});
					//$scope.tagSelected = false;
					tagObj.selected = false;
				}
				
				//$scope.selectedTagDescriptions = $rootScope.formatTags($scope.feedFilterTags);
			};
			
			
		},
		link: function(scope, element, attrs){
			
		},
		templateUrl: 'templates/new_post_pageslide.html'
	}
	
})

.directive('circularMenu', function() {

  return {
    
    restrict: 'EA', 
    scope: {
            
            subtags: '=',
            selectedtags: '=',
            mypagekey: "=" 
    },
    controller: function($scope,sliceTagFilter){


      /*$scope.$watch('selectedtags', function(){
        console.log(" watching selectedTags : " + $scope.selectedtags);
      });*/

      $scope.$watch('subtags', function() {
          $scope.tagsarr = sliceTagFilter($scope.subtags, "0,5");         		
		  $scope.startIndex = 0;
		  $scope.endIndex = 5;
		  	
      });


      $scope.adjustMenuIndex = function(){
                
        var offsetStr = $scope.startIndex + "," + $scope.endIndex;      
        $scope.tagsarr =  sliceTagFilter($scope.subtags, offsetStr );
        
        console.log("offsetstr : " + offsetStr);
        
        //Increment the menuIndex after processing the offsetStr.
        if ( $scope.endIndex >= $scope.subtags.length) {
          $scope.startIndex = 0;
          $scope.endIndex = 5;
        }else{
          $scope.startIndex++;
          $scope.endIndex++;          
        }
        
      };

      $scope.tagged = function(tagId, tagText){

        if(tagId != undefined && tagId.length > 0 && $scope.selectedtags.indexOf(tagId) == -1){
          $scope.selectedtags.push(tagId); 
          
        }else{
            console.log ('Invalid tagId : ' +  tagId);
        }

        $(".circle").toggleClass('open');
      };
  

    },
    link: function(scope, element, attrs){

        
      var jquerySearchTag = '#menu .circle a';
      var items = $(jquerySearchTag);
       
      //Hacky way to avoid reading 2 set of "menu circle a" element generated by 2 circular menu directive.
      //Just take the last 5.
      if ( items.length > 5) {
          items.splice(0,5);
      }      
      for(var i = 0, l = items.length; i < l; i++) {
        
          items[i].style.left = (50 - 55*Math.cos(-1 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";

          items[i].style.top = (50 + 55*Math.sin(-1 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";        
        
      }
        

    },
    templateUrl: 'templates/newtags.html'

  }  
})

.controller('AppCtrl', function($scope) {
	
})

.controller('fbCtrl', function($scope, $state, $http, $ionicAuth, $ionicUser, $ionicPopup, moteUserId){ 

	$scope.moteUserId = moteUserId;
	
	params = {token: "",userId:1, collegeId:1};
	
	$scope.fbtoken = "";
	
	$scope.checkFBLoggedIn = function(){
		
		$ionicAuth.login('facebook',['public_profile','email,user_friends','user_posts','user_photos','user_videos']).then(function(response){
			$scope.fbtoken = 'Access Token' + $ionicAuth.getToken();
		}, function(error){
			$scope.fbtoken = "error " + angular.toJson(error, true);
		});
		
		//$http.get('https://www.facebook.com/v2.7/dialog/oauth?client_id=1105685566108143&display=popup&response_type=code%20token&scope=public_profile,email,user_friends,user_posts,user_photos,user_videos&redirect_uri=https://www.facebook.com/connect/login_success.html').then(function(success){
			//console.log(success);
			/*if( success.data === "redirect:/connect/facebook"){
				$http.post('http://54.200.159.155:8080/connect/facebook',{}).then(function(success){
					console.log("FB Success");
					console.log(success);
					$ionicPopup.alert({
						title: "FB Login Success",
						template: success.data
					});
				}, function(error){
					console.log("FB Failure");
					console.log(error);
					$ionicPopup.alert({
						title: "FB Login Failed",
						template: error.data
					});
				});
			}*/
			//redirect:/connect/facebook
		//}, function(error){
			//console.log(error);
		//});
	}
	
	$scope.goToFriendsFeed = function(){
		$state.go('app.friends_feeds');
	}
})		

// ***************** Use for the login page :: Start *****************
.controller('LoginCtrl', function($scope, 
									$rootScope, 
									$state, 
									$ionicModal,
									$localstorage,
									$http,
									Schools, 
									Tags, 
									loginService, 
									createAccountService,
									addFriend,
									igLogin,
									instagramLogin,
									igAdd,
									springFB) {
  
	
	$scope.rememberMe = false;
	$scope.errorMsg = "";
	$scope.loginDetail={};
	$rootScope.appHeader = "Mote";
	
	Schools.query(function(response) { 
		$rootScope.colleges = response;
	});
	 
	Tags.query(function(response) { 
    	$rootScope.lstTag = response;
    	
    });
	
	$scope.getUserId = function(){
		
		return $localstorage.get("token");
	};
	
	$scope.login = function() {
		
		loginService.authenticate($scope.loginDetail).$promise.then(
			function(success){
				
				/*
				 * Store the user id as token for future call for 
				 * friends, schools and National feed
				 */
				$localstorage.set("token",success.userId);
				$localstorage.set("collegeId",success.collegeId);
				$rootScope.userId = success.userId;

				$rootScope.collegeId = success.collegeId;
				$state.go('app.content_aggregation');
			},
			function(error){
				$scope.errorMsg = error.data.message;
			}
		);
		
	/*	UserService.authenticate($.param({username: $scope.username, password: $scope.password}), function(authenticationResult) {
			var authToken = authenticationResult.token;
			$rootScope.authToken = authToken;
			if ($scope.rememberMe) {
				$cookieStore.put('authToken', authToken);
			}
			UserService.get(function(user) {
				$rootScope.user = user;
				$location.path("/");
			});
		});*/	
	};

	$scope.userCreateMessage="";
	$scope.userDetail = {};
	$scope.userDetail.aggregationDtoList = [];
	
	
	$scope.goToLogin = function(){
		$state.go('app.login');
	}

	$scope.goToCreateAccount = function(){
		$state.go('app.create_account');
	}
	
	$scope.goToGetConnected = function(){
		$state.go('app.content_aggregation');
	}
	
	

	function isAdded(array, name) {
		for (var i = 0; i < array.length; i++ ) {
			if (array[i].aggregationName == name) {
				return true;
			}
		}
		return false;
	}
	
	$scope.createAccount = function(){
		
		/*Prepare for db update*/
		
		$scope.userDetail.college = angular.fromJson($scope.userDetail.college);
		$scope.userDetail.profilePictureUrl = "img/profiles/blank_person.jpg";
		
		//Add to userDetail a list of aggregation platforms [aggregation id, aggregation name] to map to the List<AggregationDto> in UserDto
		
		createAccountService.create($scope.userDetail).$promise.then(
			function(response){
				//$scope.userCreateMessage = response;
				
				$rootScope.newUserId = response.id;
				
				$state.go('app.content_aggregation');
			},
			function(error){
				$scope.errorMsg = error.data.message;
			}
		);
	}
	
	/*OpenFB Facebeeok */
	
	$scope.isFacebookLogin = false;
	
	$scope.toggleIsFacebookLogin = function(){

		//$scope.facebookLoginStatus();
		
		if($scope.isFacebookLogin == false){
			$scope.facebookLogin();
			$scope.isFacebookLogin = true;
		}else if($scope.isFacebookLogin == true){
			$scope.facebookLogout();
			$scope.isFacebookLogin = false;
		}	
	};

	
	/* Instagram */
    $scope.instagramLogin = function () {

        var platform = ionic.Platform.platform();

        if (platform == 'android') {
        	instagramLogin.login();
        } else {
        	igLogin.login();
        }
        
        var userId = $localstorage.get("token");
        var igId = $localstorage.getObject("ig_user").data.id;
        var igToken =  $localstorage.getValue('ig_token');
        
    	igAdd.create({userId: userId, igId: igId, igToken: igToken}).$promise.then(
    			
    			function(success){
    				$scope.igFriends = success;
    			},
    			function(error){
    				console.log(error);
    			}
    	);

	};

	/* End Instagram */
	
   
	   
	 /*
	  * University selection modal window
	  * 
	  */
	 $scope.setCollege = function(college){
		 $scope.userDetail.college = college;
		 $scope.userDetail.collegeName = college.collegeName;
		 $scope.closeModal();
	 };
	 
	 $ionicModal.fromTemplateUrl('univ-selection-modal.html', {
		    scope: $scope,
		    animation: 'slide-in-up'
		  }).then(function(modal) {
		    $scope.modal = modal;
	 });
	 
	 $scope.openModal = function() {
		    $scope.modal.show();
	  };
	  $scope.closeModal = function() {
	    $scope.modal.hide();
	  };
	  //Cleanup the modal when we're done with it!
	  $scope.$on('$destroy', function() {
		
		  if( $scope.modal != undefined){
			  $scope.modal.remove();
		  }
	    
	  });
	  
	 /* $scope.validate = function(event){
	
	      if( this.$parent.loginData.password == "cl123!"){
	         $state.go('app.friends_feeds');
	      }
	  }*/
 
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

/* Instagram integration - Pop-up window redirects to Instagram login where the Oauth token is obtained.
 * Then it redirects to Mote app where this controller is executed.  The Instagram token is stored in 
 * localstorage, and the User Detail object is then retrieved from Instagram API and also stored in localstorage.
 */
.controller('IGLoginCtrl', function ($stateParams, $window, $state, $localstorage, igUserInfo) {
	
	if (angular.isDefined(window.opener) && window.opener != null) {
	    
	    if (angular.isDefined($stateParams.access_token)) {
	    	
	    	$localstorage.set("ig_token", $stateParams.access_token);
		    igUserInfo.query({access_token: $stateParams.access_token}).$promise.then(function(igUserDetail) { 
		    	$localstorage.setObject("ig_user", igUserDetail);
		        $window.close();
		    });
		    
	    }
	    
	}

})
/* End Instagram
 * 
 */


.controller('SignupCtrl', function($scope) {
})

.controller('HomeCtrl', function($scope) {
})

// ***************** Use for the login page :: End *****************


.controller('AddFriendsCtrl', function(	$scope,
										$localstorage,
										addFriend,
										removeFriend,
										usersProfile,
										userFriends){
	
	$scope.profiles = [];
	$scope.userFriends = [];
	
	usersProfile.query({userId: $localstorage.get('token')}).$promise.then(
			
			function(success){
				$scope.profiles = success;
			},
			function(error){
				console.log(error);
			}
	);
	
	
	userFriends.query({userId: $localstorage.get('token')}).$promise.then(
			
			function(success){
				$scope.userFriends = success;
			},
			function(error){
				console.log(error);
			}
	);
	

	/*
	 * This method will toggle to call makeFriend/makeStanger
	 */
	$scope.toggleAddRemoveFriend = function(friend){
		
		if( friend.isFriend == 0){
			$scope.makeFriend(friend);
		}
		
		if( friend.isFriend == 1){
			$scope.makeStanger(friend);
		}
		
	};
	
	$scope.makeFriend = function(friend){
				
		addFriend.save({userId: $localstorage.get('token'), friendId: friend.profileId }).$promise.then(
			
				function(success){
					
					friend.isFriend = 1;
				},
				function(error){
					friend.isFriend = 0;
					console.log(error);
				}
		); 
	};
	
	$scope.makeStanger = function(friend){
		
		removeFriend.save({userId: $localstorage.get('token'), friendId: friend.profileId }).$promise.then(
			
				function(success){
					
					friend.isFriend = 0;
				},
				function(error){
					friend.isFriend = 1;
					console.log(error);
				}
		);
	};
	
})

.controller('FriendsFeedsCtrl', function($scope, 
                                          $http, 
                                          $ionicSlideBoxDelegate, 
                                          $state, 
                                          $filter, 
                                          $rootScope,
                                          $localstorage,
                                          FriendFeed, 
                                          Tags,
                                          Schools,
                                          sliceTagFilter, 
                                          Like,
                                          View,
                                          $stateParams ) {
  	
	
	
	$rootScope.showSettingMenu = true;
	$scope.moteActiveSlide = 1;
	
	//It is possible if user is already logged in and detail is stored locally
	if( $rootScope.lstTag == undefined ||$rootScope.lstTag == null){
		Tags.query(function(response) { 
	    	$rootScope.lstTag = response;
	    });

	}
	
	//It is possible if user is already logged in and detail is stored locally
	if( $rootScope.colleges == undefined || $rootScope.colleges == null){
		Schools.query(function(response) { 
			$rootScope.colleges = response;
	    });

	}
	
	
	var data = FriendFeed.query({profileId: $localstorage.get('token')},function(friendFeedData) { 
	    $scope.users = friendFeedData;
	});
	
	$scope.getPostImage = function(currentPost){
		return currentPost.postImg;
	};
	
	$scope.schoolFeed = function(schoolId){
	   
	   $rootScope.collegeId = schoolId;
	   $rootScope.setContext("school");
	   
	   $state.go('app.school_feeds');
	 
	};

	$scope.onGesture = function(gesture) {
	    //$scope.gesture.used = gesture;
	    console.log(gesture);
	 }
	/*
	 * This flag is required for the slide page to customize the feeds
	 */
	$scope.checked = false;
	$scope.toggleCustomMenu = function(){
		$scope.checked = !$scope.checked;
	};
		
	$scope.updateView = function(post){
		
		//View is once per user per post
		if( post.viewDone == false){
			View.update({viewCount: 1, profileId: $localstorage.get('token'), postId: post.postId, level:'F'});
		}
		
	};
	
	$scope.slideHasChanged = function(index, posts){
		
		if(index == 0){
			//Popular Post
			$scope.updateView(posts.popularPost);
		}
		
		if( index == 1){
			//Current Post
			$scope.updateView(posts.currentPost);
		}
		
		if( index == 2){
			//Most recent post
			$scope.updateView(posts.mostRecentPost);
		}
	};
	
 
})


.controller('SchoolFeedsCtrl', function($scope, 
                                        $stateParams, 
                                        $state, 
                                        $rootScope,
                                        $localstorage,
                                        SchoolFeed, 
                                        sliceTagFilter,
                                        Schools,
                                        schoolFeedCutomizer,
                                        Like) {
	
	$rootScope.showSettingMenu = true;
	
	var data = SchoolFeed.query({collegeId: $localstorage.get('collegeId'), profileId: $localstorage.get('token')},function(schoolFeedData) { 
		$scope.schoolUsers = schoolFeedData;
		
		for ( var i=0; i < $scope.schoolUsers.length; i ++ ){
			var user = $scope.schoolUsers[i];
			user.post.tags.push("football");
			user.post.tags.push("baseball");
			
			user.post.tags.push("tailgate");
		}
		
	});
	
	
	$scope.checked = false;
	$scope.toggleCustomMenu = function(){
		$scope.checked = !$scope.checked;
	};

	
	/*Required for School Feed filter - start*/
	/*$scope.feedFilterCollegeId = 0;
	$scope.feedFilterTags = [];

	$scope.setFilterCollegeId = function(schoolId){
		$scope.filterCollegeId = schoolId;
	};
	
	$scope.tagSelected = false;
	
	$scope.setTagID = function(tagId){
		
		var ind = $scope.feedFilterTags.indexOf(tagId);
		
		var subTagObj = _.find($scope.subTags, function(tag){ return tag.id == tagId});
		
		//var subTagObj =  $scope.subTags[subTagIndex];
				
		if(ind == -1){
			$scope.feedFilterTags.push(tagId);
			$scope.tagSelected = true;
			subTagObj.selected = true;
		}else {
			//Remove the existing one.
			$scope.feedFilterTags = _.reject($scope.feedFilterTags, function(tag){
			      return tag == tagId;
			});
			$scope.tagSelected = false;
			subTagObj.selected = false;
		}
	};
	
	$scope.checked = false;
	
	$scope.toggleCustomMenu = function(){
		$scope.checked = !$scope.checked;
		
		
		 * Call filter for School level post if user specified one
		 
		if ($scope.feedFilterCollegeId > 0 || $scope.feedFilterTags.length > 0){
			
			var schoolFilters = {collegeId: $scope.feedFilterCollegeId, lstTags: $scope.feedFilterTags};
					
			schoolFeedCutomizer.query(schoolFilters).$promise.then(
				function(response){
					$scope.schoolUsers = response;
				},
				function(error){
					console.log("Filter failed");
				}
			);
		}
	};
	
	Schools.query(function(schoolData) { 
        $scope.schools = schoolData;
    });
	
	$scope.subTags = [];
	
	$scope.showSubtags = function(tag){
		
		if(tag == 'socials'){
			$scope.subTags  = $rootScope.lstTag.socials;
		}
		
		if(tag == 'smarts'){
			$scope.subTags  = $rootScope.lstTag.smarts;
		}
		
		if(tag == 'genre'){
			$scope.subTags  = $rootScope.lstTag.genre;
		}
		
		_.each($scope.subTags, function(tagObj){
			
			tagObj.selected = false;
		});
	}*/
	
	/*School Feed filter - End*/
	


})

.controller('NationalFeedsCtrl', function($scope, 
                                          $stateParams, 
                                          $rootScope,
                                          $localstorage,
                                          NationalFeed, 
                                          Schools, 
                                          sliceTagFilter,
                                          Like) {

	$rootScope.showSettingMenu = true;
	
	NationalFeed.query({collegeId: $localstorage.get('collegeId'), profileId: $localstorage.get('token')}, function(nationalFeedData) { 
		$scope.nationalUsers = nationalFeedData;
		for ( var i=0; i < $scope.nationalUsers .length; i ++ ){
			var user = $scope.nationalUsers[i];
			user.post.tags.push("football");
			user.post.tags.push("baseball");
			user.post.tags.push("soccer");
			
		}
	});
	
	/*For Slide Page */
	$scope.checked = false;
	$scope.toggleCustomMenu = function(){
		$scope.checked = !$scope.checked;
	};
	
		
})

.controller('NewPostCtrl', function($scope, $rootScope, $localstorage, $state, $ionicModal, $stateParams, $ionicPopup, $ionicLoading, CameraService) {

	
	/*$ionicPopup.alert({
		title: "Image Path",
		template: $stateParams.imageURI
	});*/
	
	$scope.postImgUrl = "";
	$scope.customTags = "";
	$scope.feedFilterTags = [];
	
	$scope.takePicture = function(){
		
		CameraService.takePicture().then(
				
				function(imageURI){
					$scope.postImgUrl = imageURI;
					$scope.caption = "";
				},
				function(error){
					
					/*$ionicPopup.alert({
						title: "Image Capture Error",
						template: error
					});*/
					
					$state.go('app.friends_feeds');
				}
			);
	};
	
	$scope.takePicture();
	
	
	
	/*For Slide Page */
	$scope.checked = false;
	$scope.toggleCustomMenu = function(){
		$scope.checked = !$scope.checked;
	};
	
	
	$scope.uploadImg = function(){
		
		$ionicLoading.show({content:'<i class="ion-loading-c progress-indicator"></i>'});
		
		var fileURL = $scope.postImgUrl;
		
		var options = new FileUploadOptions();
		options.fileKey = "file";
		options.fileName = fileURL.substr(fileURL.lastIndexOf('/')+1);
		options.mimeType = "image/png";
		options.headers = {Connection: "close"};
		
		$scope.feedFilterTagIds = _.pluck($scope.feedFilterTags,'tagId');
		
		var postDto = {postType:$rootScope.postType, 
						userId: $localstorage.get('token'), 
						caption: $rootScope.caption, 
						tags: $scope.feedFilterTagIds, 
						customTags: $scope.customTags};

		params = {};
		params.post = angular.toJson(postDto);
		
		options.params = params;
		//options.header = {'Content-Type': undefined};
		
		
		
		var ft = new FileTransfer();
		ft.upload(fileURL, encodeURI($rootScope.clhost + $rootScope.clport + '/upload_post'), 
				function(success){
					console.log(success);
					$ionicLoading.hide();
					$state.go('app.friends_feeds');
				}, 
				function(error){
					console.log(error);
					$ionicLoading.hide();
					$ionicPopup.alert({
						title: "File Upload Failed",
						template: error
					});
					
					
				}, 
				options
		);

	};
	
  
})


.controller('CustomTagCtrl', function($scope, $rootScope, Schools) {
  
  $scope.university = "";
  
  Schools.query(function(schoolData) { 
    $scope.schools = schoolData.schools;
  });
  
  //This block of code needs to be repeated in every control where 
  //circular menu is required - need to fit in some directive
  $scope.subtagsArr = [];
  $scope.selectedTagsArr = [];

  $scope.menu = function(menuType, tagsArr) {

    $scope.selectedTagsArr = tagsArr;

    if ( menuType == "#social"){
      $scope.subtagsArr = $rootScope.socialArr;
    }
    if ( menuType == "#smart"){
      $scope.subtagsArr = $rootScope.smartArr;
    }
    if ( menuType == "#genre"){
      $scope.subtagsArr = $rootScope.genreArr;
    }

    $(".circle").toggleClass('open');   
  };

  $scope.removeTag = function(tagId, tagsArr){
    $scope.selectedTagsArr = tagsArr;

    tagsArr = _.reject(tagsArr, function (tag){
      return tag == tagId;
    });

    //Make a deep copy to reflect the changes and refresh the deletion
    angular.copy(tagsArr, $scope.selectedTagsArr);

  };
  
})

.controller('ProfileCtrl', function($scope, $stateParams, Profile) {

  Profile.query(function(profileData) {
    $scope.profile = profileData.user;
  });
})

.controller('SearchCtrl', function($scope, $stateParams) {

  $scope.filterByTags = [];
  $scope.searchCriteria = 0;
  
})

.controller('UploadProfileImgCtrl', function($scope, $state, $rootScope, Camera) {

	$scope.profileImgUrl = "";
	$scope.errorMsg="";
	
	$scope.takePicture = function(){

		Camera.getPicture().then(function(imageURI){
			$scope.profileImgUrl = imageURI;
		},
		function(error){
			$scope.errorMsg = error.data.message;
		},
		{
			quality : 40,
			targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            encodingType: navigator.camera.EncodingType.JPEG,
            destinationType: navigator.camera.DestinationType.FILE_URI
		}
		);
	};
	  
	$scope.uploadImg = function(){
		
		var fileURL = $scope.profileImgUrl;
		
		var options = new FileUploadOptions();
		options.fileKey = "file";
		options.fileName = fileURL.substr(fileURL.lastIndexOf('/')+1);
		options.mimeType = "image/jpeg";
		
		var params = {};
		params.name = $rootScope.newUserId;

		options.params = params;
		
		var ft = new FileTransfer();
		ft.upload(fileURL, encodeURI($rootScope.clhost + $rootScope.clport + '/upload'), 
				function(success){
					$state.go('app.login');
				}, 
				function(error){
					console.log(error);
					//$scope.errorMsg = error.data.message;
				}, 
				options
		);

	};
	
})
