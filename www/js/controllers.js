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
            selectedtags: '='
    },
    templateUrl: 'templates/newtags.html',
    controller: function($scope,sliceTagFilter){

      $scope.$watch('selectedtags', function(){
        console.log(" watching selectedTags : " + $scope.selectedtags);
      });

      $scope.$watch('subtags', function() {
          $scope.tagsarr = sliceTagFilter($scope.subtags, "0,5");         
          $scope.menuIndex = 0;
          $scope.menuIndexIncrement = 5;

      });


      $scope.adjustMenuIndex = function(){

        //Handle the last menu items which is not in count of 5
        var indexDiff = $scope.subtags.length - $scope.menuIndex;

        if ( indexDiff != 0 && indexDiff < $scope.menuIndexIncrement){

            $scope.menuIndex = $scope.menuIndex - ($scope.menuIndexIncrement - indexDiff);
        } 

        console.log(" adjusted menuIndex : " + $scope.menuIndex);

        if ( $scope.menuIndex >= $scope.subtags.length) {
          $scope.menuIndex = 0;
        }else{
          $scope.menuIndex = $scope.menuIndex + $scope.menuIndexIncrement;
        }

        console.log("menuIndex : " + $scope.menuIndex);

        var offsetStr = $scope.menuIndex + "," + $scope.menuIndexIncrement;      
        $scope.tagsarr =  sliceTagFilter($scope.subtags, offsetStr );
        
      };

      $scope.tagged = function(tagId, tagText){

        if(tagId != undefined && tagId.length > 0 && $scope.selectedtags.indexOf(tagId) == -1){
          $scope.selectedtags.push(tagId); 
          console.log ('$scope.selectedTags : ' +  $scope.selectedtags);
        }else{
            console.log ('Invalid tagId : ' +  tagId);
        }

        $(".circle").toggleClass('open');
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

  
  var data = FriendFeed.query(function(friendFeedData) { 
    $scope.users = friendFeedData.users[0].friends;
  });

  $scope.schoolFeed = function(schoolId){
     
   $state.go('app.school_feeds');
 
  };




  $scope.subtagsArr = [];
  $scope.selectedTagsArr = [];

  $scope.menu = function(menuType, tagsArr) {

    console.log('tagsArr : ' + tagsArr);

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
    $scope.tags = _.reject(tagsArr, function (tag){
      return tag == tagId;
    });

    $scope.selectedTagsArr = $scope.tags;
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
