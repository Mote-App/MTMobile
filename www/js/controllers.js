angular.module('clcontrollers', [])

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

.controller('AppCtrl', function($scope) {
})

// ***************** Use for the login page :: Start *****************
.controller('LoginCtrl', function($scope, $rootScope, $state) {
  
  $rootScope.appHeader = "CollegeLife";
  $scope.loginData = {};

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

.controller('FriendsFeedsCtrl', function($scope, $http, $ionicSlideBoxDelegate, $state, FriendFeed) {
  
  /*var data = Schools.query(function(imgData) { 
    $scope.imglists = imgData.schools;
  });*/
  
  console.log("Inside FriendsFeedsCtrl");
  var data = FriendFeed.query(function(friendFeedData) { 
    $scope.users = friendFeedData.users[0].friends;
  });

  $scope.schoolFeed = function(schoolId){
     
   $state.go('app.school_feeds');
 
  }
        
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
