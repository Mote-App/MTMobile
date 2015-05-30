'use strict';

angular.module('Mote')

.factory('CameraService', function($q){
	
	return {
		
		takePicture: function(options){
			
			var defer = $q.defer();
			
			var options  = options || {
				quality : 25,
				encodingType: Camera.EncodingType.PNG,
				destinationType: Camera.DestinationType.FILE_URI,
			    sourceType: Camera.PictureSourceType.CAMERA
			};
			
				 
			navigator.camera.getPicture(
					 
				function(imageURI){
					defer.resolve(imageURI);	
					//$state.go('app.new_post', {imageURI: imageURI});
				},
				function(error){
					defer.reject(error);
				},
				options
			);
			
			return defer.promise;
		}
			 
			  
	}

});