'use strict';

angular.module('Mote')

.service('CameraService', function($cordovaCamera, $ionicPlatform, $q){
	
	this.takePicture = function(options){
		
		var defer = $q.defer();
		
		var options  = options || {
			quality : 25,
			encodingType: Camera.EncodingType.JPEG,
			destinationType: Camera.DestinationType.FILE_URI,
		    sourceType: Camera.PictureSourceType.CAMERA
		};
		
		 $ionicPlatform.ready(function() {
			 
			 $cordovaCamera.cleanup();
			 
			 $cordovaCamera.getPicture(options).then(
				function(imageURI){
					defer.resolve(imageURI);	
					//$state.go('app.new_post', {imageURI: imageURI});
				},
				function(error){
					defer.reject(error);
				});
		});
		 
		 return defer.promise; 
	}
		 
});