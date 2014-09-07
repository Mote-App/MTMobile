angular.module('clcontrollers', [])

.filter('sliceTag', function() {
  return function(input, indexRange) {
    var indexes = indexRange.split(",");
    var start = parseInt(indexes[0], 10);
    var end = parseInt(indexes[1], 10);

    return input.slice(start, (start+end));
  };
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

.directive('circularMenu', function() {

  return {
    
    restrict: 'EA', 
    scope: {
            
            subtags: '=',
            selectedTags: '='
    },
    templateUrl: 'templates/newtags.html',
    controller: function($scope,sliceTagFilter){
      //console.log ('$scope.subtags : ' +  $scope.subtags);

      //$scope.tagsArr = sliceTagFilter($scope.subtags, "0,5");
      console.log ('$scope.tagsArr : ' +  $scope.subtags);

      $scope.$watch('subtags', function() {
          $scope.tagsarr = sliceTagFilter($scope.subtags, "0,5");
          $scope.menuIndex = 0;
          $scope.menuIndexIncrement = 5;

      });


      $scope.adjustMenuIndex = function(){

        if ( $scope.menuIndex >= $scope.subtags.length) {
          $scope.menuIndex = 0;
        }else{
          $scope.menuIndex = $scope.menuIndex + $scope.menuIndexIncrement;
        }

        var offsetStr = $scope.menuIndex + "," + $scope.menuIndexIncrement;      
        $scope.tagsarr =  sliceTagFilter($scope.subtags, offsetStr );
        
      };

      $scope.tagged = function(tagId, tagText){

        $scope.selectedTags.push({"tagId" : tagId, "tagText" : tagText});

        $(".circle").toggleClass('open');
      };
  
      $scope.removeTag = function(tagId){
        $scope.tags = _.reject($scope.selectedTags, function (obj){
          return obj.tagId == tagId;
        });

      };

    },
    link: function(scope, element, attrs){

        //var menuType = attrs.menuType;

        var jquerySearchTag = '#menu .circle a';

        var items = $(jquerySearchTag);
        
        console.log( " ITems length : " + items.length );

        for(var i = 0, l = items.length; i < l; i++) {
          
          items[i].style.left = (50 - 55*Math.cos(-1 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";

          items[i].style.top = (50 + 55*Math.sin(-1 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";        
        
        }     
    }
  }  
})

.controller('AppCtrl', function($scope) {
})

// ***************** Use for the login page :: Start *****************
.controller('LoginCtrl', function($scope, $rootScope, $state, Schools) {
  
  $rootScope.appHeader = "CollegeLife";
  $scope.loginData = {};

  var data = Schools.query(function(schoolData) { 
    $scope.schools = schoolData.schools;
  });

  $scope.validate = function(event){

      if( this.$parent.loginData.password == "cl123!"){
         $state.go('app.friends_feeds');
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

.controller('FriendsFeedsCtrl', function($scope, 
                                          $http, 
                                          $ionicSlideBoxDelegate, 
                                          $state, 
                                          $filter, 
                                          $rootScope,
                                          FriendFeed, 
                                          Tags, 
                                          sliceTagFilter) {
  
  /*var data = Schools.query(function(imgData) { 
    $scope.imglists = imgData.schools;
  });*/

  $scope.selectedTags = [];  
  $scope.popularPostTags  = [];
  $scope.currentPostTags  = [];
  $scope.mostRecentPostTags   = [];
  
  $scope.slideHasChanged = function(index) {

    if ( index == 0){
      $scope.selectedTags = $scope.popularPostTags;
    }

    if ( index == 1){
      $scope.selectedTags = $scope.currentPostTags;
    }

    if ( index == 2){
      $scope.selectedTags = $scope.mostRecentPostTags;
    }

  };

  var data = FriendFeed.query(function(friendFeedData) { 
    $scope.users = friendFeedData.users[0].friends;
  });

  $scope.schoolFeed = function(schoolId){
     
   $state.go('app.school_feeds');
 
  };


  $scope.subtagsArr = [];
  
  $scope.menu = function(menuType) {

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

})


.controller('SchoolFeedsCtrl', function($scope, 
                                        $stateParams, 
                                        $state, 
                                        $rootScope,
                                        SchoolFeed, 
                                        Tags, 
                                        sliceTagFilter) {
	console.log("Inside SchoolFeedsCtrl");
	var data = SchoolFeed.query(function(schoolFeedData) { 
		$scope.schoolUsers = schoolFeedData.schools[0].users;
	});
	
	$scope.nationalFeed = function(){  
		$state.go('app.national_feeds');
	};

  $scope.subtagsArr = $rootScope.socialArr;
  
  $scope.menu = function(menuType) {

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

})

.controller('NationalFeedsCtrl', function($scope, 
                                          $stateParams, 
                                          $rootScope,
                                          NationalFeed, 
                                          Schools, 
                                          Tags, 
                                          sliceTagFilter) {

	Schools.query(function(schoolData) {
		$scope.schoolList = schoolData.schools;
	});
	
	var data = NationalFeed.query(function(nationalFeedData) { 
		$scope.nationalUsers = nationalFeedData.nations[0].users;
	});
  
  $scope.subtagsArr = $rootScope.socialArr;
  
  $scope.menu = function(menuType) {

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

	//jQuery(document).ready(function(){
	
	$scope.renderCarousel = function(index) {
			console.log ( "total image :" + index);
            var carousel = $('#carousel').waterwheelCarousel({
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

    };
		
})

.controller('PlaylistCtrl', function($scope, $stateParams) {

})

.controller('SearchCtrl', function($scope, $stateParams) {

})
