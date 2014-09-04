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

  function link (scope, element, attrs){


    //if (scope.$last){


      var menuType = attrs.menuType;

      var jquerySearchTag = "#" + menuType +  ' .circle a';

      var items = $(jquerySearchTag);

      var angle = 0;
      

      for(var i = 0, l = items.length; i < l; i++) {
        
        items[i].style.left = (50 - 55*Math.cos(-1 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";

        items[i].style.top = (50 + 55*Math.sin(-1 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";        
      
      }

      /*$(".menu-button").click(function(e) {
        console.log('clicked');
         e.preventDefault();
         $(".circle").toggleClass('open');
      });*/

    //}
    
  }

  return {
    link: link
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

.controller('FriendsFeedsCtrl', function($scope, $http, $ionicSlideBoxDelegate, $state, $filter, FriendFeed, Tags, sliceTagFilter) {
  
  /*var data = Schools.query(function(imgData) { 
    $scope.imglists = imgData.schools;
  });*/
  
  var data = FriendFeed.query(function(friendFeedData) { 
    $scope.users = friendFeedData.users[0].friends;
  });

  $scope.schoolFeed = function(schoolId){
     
   $state.go('app.school_feeds');
 
  };

 var tags = Tags.query(function(tagData) { 
      $scope.subtags = tagData.subtags;

       
      $scope.smartArr =  sliceTagFilter($scope.subtags.smarts, "0,5" );
      $scope.socialArr =  sliceTagFilter($scope.subtags.socials, "0,5" );
      $scope.genreArr =  sliceTagFilter($scope.subtags.forbidden, "0,5" );

 });


  $scope.socialMenuIndex = 0;
  $scope.smartMenuIndex = 0;
  $scope.genreMenuIndex = 0;
  $scope.menuIndexIncrement = 5;

  $scope.adjustMenuIndex = function(menuType){

    if ( menuType === "#social"){

      if ( $scope.socialMenuIndex >= $scope.subtags.socials.length) {
        $scope.socialMenuIndex = 0;
      }else{
        $scope.socialMenuIndex = $scope.socialMenuIndex + $scope.menuIndexIncrement;
      }

      var offsetStr = $scope.socialMenuIndex + "," + $scope.menuIndexIncrement;      
      $scope.socialArr =  sliceTagFilter($scope.subtags.socials, offsetStr );
    }
    if ( menuType === "#smart"){
      if ( $scope.smartMenuIndex >= $scope.subtags.smarts.length) {
        $scope.smartMenuIndex = 0;
      }else{
        $scope.smartMenuIndex = $scope.smartMenuIndex + $scope.menuIndexIncrement;
      }

      var offsetStr = $scope.smartMenuIndex + "," + $scope.menuIndexIncrement;      
      $scope.smartArr =  sliceTagFilter($scope.subtags.smarts, offsetStr );

    }
    if ( menuType === "#genre"){
      if ( $scope.genreMenuIndex >= $scope.subtags.forbidden.length) {
        $scope.genreMenuIndex = 0;
      }else{
        $scope.genreMenuIndex = $scope.genreMenuIndex + $scope.menuIndexIncrement;
      }

      var offsetStr = $scope.genreMenuIndex + "," + $scope.menuIndexIncrement;      
      $scope.genreArr =  sliceTagFilter($scope.subtags.forbidden, offsetStr );

    }

    //console.log (menuType + " : " + socialMenuIndex);

  };

  $scope.menu = function(menuType) {
    $(menuType + " .circle").toggleClass('open');   
  };

  $scope.tags = [];

  $scope.tagged = function(tagId, tagText, menuType){

      $scope.tags.push({"tagId" : tagId, "tagText" : tagText});

      $(menuType + " .circle").toggleClass('open');
  };
  
  $scope.removeTag = function(tagId){

     $scope.tags = _.reject($scope.tags, function (obj){
      return obj.tagId == tagId;
     });

  };

})


.controller('SchoolFeedsCtrl', function($scope, $stateParams, $state, SchoolFeed) {
	console.log("Inside SchoolFeedsCtrl");
	var data = SchoolFeed.query(function(schoolFeedData) { 
		$scope.schoolUsers = schoolFeedData.schools[0].users;
	});
	
	$scope.nationalFeed = function(){  
		$state.go('app.national_feeds');
	}
})

.controller('NationalFeedsCtrl', function($scope, $stateParams, NationalFeed, Schools) {

	Schools.query(function(schoolData) {
		$scope.schoolList = schoolData.schools;
	});
	
	var data = NationalFeed.query(function(nationalFeedData) { 
		$scope.nationalUsers = nationalFeedData.nations[0].users;
	});
  
  
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
