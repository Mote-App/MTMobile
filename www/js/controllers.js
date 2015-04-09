angular.module('clcontrollers', [])

.filter('sliceTag', function() {
  return function(input, indexRange) {
    var indexes = indexRange.split(",");
    var start = parseInt(indexes[0], 10);
    var end = parseInt(indexes[1], 10);

    return input.slice(start, (start+end));
  };
})

.directive("headerBar", function(){
	
	return{
		restrict: 'E',
		link: function(scope,element,attrs){
		},
		templateUrl:'templates/header_bar.html'
	};
})


.directive("headerBarFeed", function(){
	
	return{
		restrict: 'E',
		link: function(scope,element,attrs){
		},
		templateUrl:'templates/feed_header_bar.html'
	};
})

.directive("postContent", function(){
	
	return{
		
		restrict: 'E',
		scope: {
			post: '=',
			user: '=',
			clhost: '@'
		},
		controller: function($scope){
			 $scope.formatTags = function(tagArr){
			    	
			    	var formattedStr = "";
			    	for( var i = 0; i < tagArr.length; i++){
			    		
			    		formattedStr = formattedStr + tagArr[i];
			    		
			    		if ( i != (tagArr.length -1)){
			    			formattedStr = formattedStr + ", ";
			    		}
			    	}
			    	
			    	return formattedStr;
			    };
	    },
		link: function(scope,element,attrs){
		},
		templateUrl: 'templates/post_content.html' 
	}
})

.directive("footerBarPost", function(){
	
	return{
		restrict: 'E',
		link: function(scope,element,attrs){
		},
		templateUrl:'templates/footer_bar_post.html'
	};
})

.directive("footerBarFeed", function(){
	
	return{
		restrict: 'E',
		link: function(scope,element,attrs){
		},
		templateUrl:'templates/footer_bar.html'
	};
})

.directive("waterWheelCarousel", function(){

    return {

      restrict: 'EA', 
      scope: {
          clcontext: '='
      },
      
      controller: function($scope, Schools, sliceTagFilter){

        Schools.query(function(schoolData) { 
          $scope.schools = schoolData.schools;
          
          //$scope.schoolsArr = sliceTagFilter($scope.schools, "0,10");         		
        });
		
		/*$scope.startIndex = 0;
		$scope.endIndex = 10;
		
		$scope.adjustMenuIndex = function(){
                
	        var offsetStr = $scope.startIndex + "," + $scope.endIndex;      
	        $scope.schoolsArr =  sliceTagFilter($scope.schools, offsetStr );
	               
	        //Increment the menuIndex after processing the offsetStr.
	        if ( $scope.endIndex >= $scope.schools.length) {
	          $scope.startIndex = 0;
	          $scope.endIndex = 10;
	        }else{
	          $scope.startIndex++;
	          $scope.endIndex++;          
	        }
	        
	   };*/
      
				
      },
      link: function(scope,element,attrs){
       
            var contextTag = "#" + attrs.clcontext;

            var carousel = $(contextTag).waterwheelCarousel({
            flankingItems: 3,
            forcedImageWidth: 80,
            forcedImageHeight: 80,
            separation: 80,
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

          
      },
      templateUrl: 'templates/water_wheel_carousel.html'

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
			 
			$scope.feedFilterCollegeId = 0;
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
			
			
			$scope.applyCustomization = function(){
				$scope.checked = !$scope.checked;
				
				/*
				 * Call filter for School level post if user specified one
				 */
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
			}
		},
		link: function(scope, element, attrs){
			
		},
		templateUrl: 'templates/pageslide.html'
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

// ***************** Use for the login page :: Start *****************
.controller('LoginCtrl', function($scope, 
									$rootScope, 
									$state, 
									$ionicModal, 
									Schools, 
									Tags, 
									loginService, 
									createAccountService,
									OpenFB) {
  
	$scope.rememberMe = false;
	$scope.errorMsg = "";
	
	$scope.loginDetail={};
	
	$rootScope.appHeader = "Mote";

	Schools.query(function(response) { 
		$scope.schools = response;
	});
	 
	Tags.query(function(response) { 
    	$rootScope.lstTag = response;
    	
    });
	
	$scope.login = function() {
		
		loginService.authenticate($scope.loginDetail).$promise.then(
			function(success){
				$rootScope.userId = success.userId;
				$rootScope.collegeId = success.collegeId;
		        $state.go('app.friends_feeds');
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
	
	$scope.createAccount = function(){
		
		/*Prepare for db update*/
		
		$scope.userDetail.college = angular.fromJson($scope.userDetail.college);
		$scope.userDetail.isAlumni = $scope.userDetail.isAlumni == true ? "Y" : "N";
		
		$scope.userDetail.profilePictureUrl = "dummy";
		
		createAccountService.create($scope.userDetail).$promise.then(
			function(response){
				//$scope.userCreateMessage = response;
				
				$rootScope.newUserId = response.id;
				
				$state.go('app.update_profile_img');
			},
			function(error){
				$scope.errorMsg = error.data.message;
			}
		);
	}
	
	/*OpenFB Facebeeok */

	$scope.facebookLogin = { checked: false};
	$scope.isInstagramLogin = false;

	$scope.checkFacebookLogin = function(){

		if($scope.facebookLogin.checked == true){
			$scope.facebookLogin();
		}else if($scope.facebookLogin.checked == false){
			$scope.logout();
		}	
	};

	
    $scope.facebookLogin = function () {

    	OpenFB.login('email,public_profile,user_friends').then(
        function () {
            //$location.path('/app/person/me/feed');
            $scope.getFriends();
            //$scope.facebookLoginForFriends();
        },
        function () {
            alert('OpenFB login failed');
        });
	};

	$scope.facebookLoginForFriends = function () {

    	OpenFB.login('').then(
        function () {
            //$location.path('/app/person/me/feed');
            $scope.getFriends();
        },
        function () {
            alert('OpenFB login failed');
        });
	};

	$scope.logout = function () {
        OpenFB.logout();
        $state.go('app.create_account');
    };

    $scope.revokePermissions = function () {
        OpenFB.revokePermissions().then(
            function () {
                $state.go('app.create_account');
            },
            function () {
                alert('Revoke permissions failed');
            });
    };

	$scope.getFriends = function() {
		OpenFB.get('/friend-list-id', {limit: 50})
            .success(function (result) {
                $scope.friends = result.data;
                console.log($scope.friends);
                $state.go('app.create_account');
            })
            .error(function(data) {
                alert(data.error.message);
            });
    };

	/*
	 *  ng-facebook Facebook event
	 */
	/*$scope.$on('fb.auth.authResponseChange', function() {
	      $scope.status = $facebook.isConnected();
	      if($scope.status) {
	        $facebook.api('/me').then(function(user) {
	          $scope.user = user;
	          console.log(user);
	        });
	      }
	 });
	
	$scope.getFriends = function() {
	      if(!$scope.status) return;
	      $facebook.cachedApi('/me/friends').then(function(friends) {
	        $scope.friends = friends.data;
	      });
	};
	
	$scope.loginToggle = function() {
	      if($scope.status) {
	    	 console.log("Logout");
	        $facebook.logout();
	      } else {
	        $facebook.login();
	        console.log("Login");
	      }
	 };*/
	   
	 /*
	  * University selection modal window
	  * 
	  */
	 $scope.setCollege = function(school){
		 $scope.userDetail.college = school;
		 $scope.userDetail.univName = school.name;
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
	    $scope.modal.remove();
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

.controller('SignupCtrl', function($scope) {
})

.controller('HomeCtrl', function($scope) {
})

// ***************** Use for the login page :: End *****************

.controller('FriendsFeedsCtrl', function($scope, 
                                          $http, 
                                          $ionicSlideBoxDelegate, 
                                          $state, 
                                          $filter, 
                                          $rootScope,
                                          FriendFeed, 
                                          Tags, 
                                          sliceTagFilter, 
                                          updateLike) {
  
  /*var data = Schools.query(function(imgData) { 
    $scope.imglists = imgData.schools;
  });*/

	$scope.updateLike = function(post){
		
		if( post.likeDone == false){
			$scope.selectedPost = post;
		    updateLike.update({likeCount: post.likes, userId: $rootScope.userId, postId: post.postId, level:'F'},function(like) { 
		    	$scope.selectedPost.likes = like.likeCount;
		    });
		}
	};

  var data = FriendFeed.query({userId: $rootScope.userId},function(friendFeedData) { 
    $scope.users = friendFeedData;
  });

  $scope.schoolFeed = function(schoolId){
   
   $rootScope.collegeId = schoolId;
   $rootScope.setContext("school");
   
   $state.go('app.school_feeds');
 
  };

	$scope.checked = false;
	
	$scope.toggleCustomMenu = function(){
		
		$scope.checked = !$scope.checked;
	};
	
 /*$scope.takePicture = function(){
	$state.go('app.new_post');			
 };*/
	
  //This block of code needs to be repeated in every control where 
  //circular menu is required - need to fit in some directive
 /* $scope.subtagsArr = [];
  $scope.selectedTagsArr = [];*/

 /* $scope.menu = function(menuType, tagsArr) {

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
  };*/

  /*$scope.removeTag = function(tagId, tagsArr){
    $scope.selectedTagsArr = tagsArr;

    tagsArr = _.reject(tagsArr, function (tag){
      return tag == tagId;
    });

    //Make a deep copy to reflect the changes and refresh the deletion
    angular.copy(tagsArr, $scope.selectedTagsArr);

  };
*/
})


.controller('SchoolFeedsCtrl', function($scope, 
                                        $stateParams, 
                                        $state, 
                                        $rootScope,
                                        SchoolFeed, 
                                        sliceTagFilter,
                                        Schools,
                                        schoolFeedCutomizer) {
	
	var data = SchoolFeed.query({collegeId: $rootScope.collegeId, userId: $rootScope.userId},function(schoolFeedData) { 
		$scope.schoolUsers = schoolFeedData;
		
		for ( var i=0; i < $scope.schoolUsers.length; i ++ ){
			var user = $scope.schoolUsers[i];
			user.post.tags.push("football");
			user.post.tags.push("baseball");
			
			user.post.tags.push("tailgate");
		}
		
	});
	
	$scope.updateLike = function(post){
		
		if( post.likeDone == false){
			$scope.selectedPost = post;
			updateLike.update({likeCount: post.likes, userId: $rootScope.userId, postId: post.postId, level:'S'},function(like) { 
				$scope.selectedPost.likes = like.likeCount;
			});
		}
	};
	
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
	
//This block of code needs to be repeated in every control where 
  //circular menu is required - need to fit in some directive
 /* $scope.subtagsArr = [];
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

  };*/

})

.controller('NationalFeedsCtrl', function($scope, 
                                          $stateParams, 
                                          $rootScope,
                                          NationalFeed, 
                                          Schools, 
                                          sliceTagFilter) {

	NationalFeed.query({collegeId: $rootScope.collegeId, userId: $rootScope.userId}, function(nationalFeedData) { 
		$scope.nationalUsers = nationalFeedData;
		for ( var i=0; i < $scope.nationalUsers .length; i ++ ){
			var user = $scope.nationalUsers[i];
			user.post.tags.push("football");
			user.post.tags.push("baseball");
			user.post.tags.push("soccer");
			
		}
	});

	$scope.updateLike = function(post){
		
		if( post.likeDone == false){
			$scope.selectedPost = post;
		    updateLike.update({likeCount: post.likes, userId: $rootScope.userId, postId: post.postId, level:'N'},function(like) { 
		    	$scope.selectedPost.likes = like.likeCount;
		    });
		}
	};
	
	/*For Slide Page */
	$scope.checked = false;
	$scope.toggleCustomMenu = function(){
		$scope.checked = !$scope.checked;
	};
	
//This block of code needs to be repeated in every control where 
  //circular menu is required - need to fit in some directive
 /* $scope.subtagsArr = [];
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

  };*/

	//jQuery(document).ready(function(){
		
})

.controller('NewPostCtrl', function($scope, $rootScope, $state, $ionicModal, $stateParams, Camera) {

	//alert("imageURI in NewPostCtrl: " + imageURI);
	$scope.postImgUrl;
	$scope.customTags		= "";
	$scope.caption			= "";
	
	$scope.takePicture = function(){
		
		Camera.getPicture().then(
			function(imageURI){
				$scope.postImgUrl = imageURI;
			},
			function(error){
				console.log(error);
			},
			{
				quality : 75,
				targetWidth: 320,
				targetHeight: 320,
				//popoverOptions: CameraPopoverOptions,
				saveToPhotoAlbum: false,
				encodingType: navigator.camera.EncodingType.JPEG,
				destinationType: navigator.camera.DestinationType.FILE_URI
			}
		);
	};
	
	/*For Slide Page */
	$scope.checked = false;
	$scope.toggleCustomMenu = function(){
		$scope.checked = !$scope.checked;
	};
	//$scope.$on('$ionicView.enter', function( ){
	//	console.log("Entered view");
	//});
	
	if( $stateParams.take == 1){
		//$scope.takePicture();
	}
	
	$scope.cancel = function(){
		
	};
	
	$scope.uploadImg = function(){
		
		var fileURL = $scope.postImgUrl;
		
		var options = new FileUploadOptions();
		options.fileKey = "file";
		options.fileName = fileURL.substr(fileURL.lastIndexOf('/')+1);
		options.mimeType = "image/jpeg";
		
		
		var postDto = {userId: $rootScope.userId, caption: $scope.caption, tags: $scope.feedFilterTags, customTags: $scope.customTags};
		params = {};
		params.post = angular.toJson(postDto);
		
		options.params = params;
		//options.header = {'Content-Type': undefined};
		
		var ft = new FileTransfer();
		ft.upload(fileURL, encodeURI($rootScope.clhost + $rootScope.clport + '/upload_post'), 
				function(success){
					console.log(success);
					$state.go('app.friends_feeds');
				}, 
				function(error){
					console.log(error);
				}, 
				options
		);

	};
	
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
	}
	
	$scope.feedFilterTags = [];

	//$scope.tagSelected = false;
	
	$scope.setTagID = function(tagId){
		
		var ind = $scope.feedFilterTags.indexOf(tagId);
		
		var subTagObj = _.find($scope.subTags, function(tag){ return tag.id == tagId});
		
		//var subTagObj =  $scope.subTags[subTagIndex];
				
		if(ind == -1){
			$scope.feedFilterTags.push(tagId);
			//$scope.tagSelected = true;
			subTagObj.selected = true;
		}else {
			//Remove the existing one.
			$scope.feedFilterTags = _.reject($scope.feedFilterTags, function(tag){
			      return tag == tagId;
			});
			//$scope.tagSelected = false;
			subTagObj.selected = false;
		}
	};
	
	//Handle model to show option for adding post details
	$ionicModal.fromTemplateUrl('new_post.html', {
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
	  //Clean up the modal when we're done with it!
	  $scope.$on('$destroy', function() {
	    $scope.modal.remove();
	  });
	  
  //This block of code needs to be repeated in every control where 
  //circular menu is required - need to fit in some directive
  /*$scope.subtagsArr = [];
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

  };*/
  
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
			quality : 75,
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
