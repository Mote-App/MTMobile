'use strict';
angular.module('Mote')

.factory('MoteInterceptor',
  function ($injector, $q, $rootScope) {
    var hideLoadingModalIfNecessary = function() {
      var $http = $http || $injector.get('$http');
      if ($http.pendingRequests.length === 0) {
        $injector.get('$ionicLoading').hide();
      }
    };

    return {
      request: function(config) {
        $injector.get('$ionicLoading').show({content:'<i class="ion-loading-c progress-indicator"></i>'});

        // Handle adding the access_token for instagram api requests
        /*var InstagramService = $injector.get('InstagramService');
        if (InstagramService.isLoggedIn() && config.url.indexOf(InstagramService.getEndpoint()) === 0) {
          config.params = config.params || {};
          config.params.access_token = InstagramService.getAccessToken(); // jshint ignore:line
        }*/
        return config;
      },
      requestError: function(rejection) {
        hideLoadingModalIfNecessary();
        return $q.reject(rejection);
      },
      response: function(response) {
        hideLoadingModalIfNecessary();
        return response;
      },
      responseError: function(rejection) {
        hideLoadingModalIfNecessary();
        if (rejection.status === 400) { // jshint ignore:line
          //console.log('detected what appears to be an Instagram auth error...');
          rejection.status = 401; // Set the status to 401 so that angular-http-auth inteceptor will handle it
        }
        return $q.reject(rejection);
      }
    };
  }
);