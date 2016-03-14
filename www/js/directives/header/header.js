
angular.module('header',[])

.directive("headerBar", function(){
	
	return{
		restrict: 'E',
		link: function(scope,element,attrs){
		},
		templateUrl:'js/directives/header/templates/header_bar.html'
	};
})


.directive("headerBarFeed", function(){
	
	return{
		restrict: 'E',
		link: function(scope,element,attrs){
		},
		templateUrl:'js/directives/header/templates/feed_header_bar.html'
	};
})