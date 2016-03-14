
angular.module('footer',[])

.directive("footerBarPost", function(){
	
	return{
		restrict: 'E',
		link: function(scope,element,attrs){
		},
		templateUrl:'js/directives/footer/templates/footer_bar_post.html'
	};
})

.directive("footerBarFeed", function(){
	
	return{
		restrict: 'E',
		link: function(scope,element,attrs){
		},
		templateUrl:'js/directives/footer/templates/footer_bar.html'
	};
})