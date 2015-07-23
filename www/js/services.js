angular.module('mtServices', ['ngResource'])

.factory('loginService', ['$resource','$rootScope',
  function($resource, $rootScope){
    return $resource($rootScope.clhost + $rootScope.clport + '/login', {}, {
    	authenticate: {method:'POST', params:{}, isArray:false}
    });
 }])


.factory('schoolFeedCutomizer', ['$resource','$rootScope',
	  function($resource, $rootScope){
	    return $resource($rootScope.clhost + $rootScope.clport + '/school_feed_filter', {}, {
	    	query: {method:'POST', params:{}, isArray:false}
	    });
}])
	 
	    
.factory('createAccountService', ['$resource','$rootScope',
  function($resource, $rootScope){
    return $resource($rootScope.clhost + $rootScope.clport + '/user/create', {}, {
    	create: {method:'POST', params:{}, isArray:false}
    });
 }])

.factory('Tags', ['$resource','$rootScope',
  function($resource, $rootScope){
    return $resource($rootScope.clhost + $rootScope.clport + '/tags', {}, {
      query: {method:'GET', params:{}, isArray:false}
    });
  }])

.factory('Profile', ['$resource', '$rootScope',
  function($resource, $rootScope){
    return $resource('data/profile.json', {}, {
      query: {method:'GET', params:{}, isArray:false}
    });
  }])

  .factory('Schools', ['$resource', '$rootScope',
  function($resource, $rootScope){
    return $resource($rootScope.clhost + $rootScope.clport + '/colleges', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
  }])

  .factory('FriendFeed', ['$resource', '$rootScope',
  function($resource, $rootScope){
    return $resource($rootScope.clhost + $rootScope.clport + '/friend_feeds?profileId=:profileId', {}, {
      query: {method:'GET', params:{profileId:'@profileId'}, isArray:true}
    });
  }])

  /*
   * Used for Add/Remove friends logic - Start
   */
 .factory('usersProfile', ['$resource', '$rootScope',
  function($resource, $rootScope){
    return $resource($rootScope.clhost + $rootScope.clport + '/users/profile?profileId=:userId', {}, {
      query: {method:'GET', params:{userId:'@userId'}, isArray:true}
    });
  }])

  .factory('userFriends', ['$resource', '$rootScope',
  function($resource, $rootScope){
    return $resource($rootScope.clhost + $rootScope.clport + '/user/friends?profileId=:userId', {}, {
      query: {method:'GET', params:{userId:'@userId'}, isArray:true}
    });
  }])
  
  .factory('addFriend', ['$resource', '$rootScope',
  function($resource, $rootScope){
    return $resource($rootScope.clhost + $rootScope.clport + '/user/add/friend?profileId=:userId&friendId=:friendId', {}, {
      save: {method:'GET', params:{userId:'@userId', friendId:'@friendId'}, isArray:false}
    });
  }])

  .factory('removeFriend', ['$resource', '$rootScope',
  function($resource, $rootScope){
    return $resource($rootScope.clhost + $rootScope.clport + '/user/remove/friend?profileId=:userId&friendId=:friendId', {}, {
      save: {method:'GET', params:{userId:'@userId', friendId:'@friendId'}, isArray:false}
    });
  }])

  /*
   * Used for Add/Remove friends logic - End
   */
  
 .factory('SchoolFeed', ['$resource', '$rootScope',
  function($resource, $rootScope){
    return $resource($rootScope.clhost + $rootScope.clport + '/school_feeds?collegeId=:collegeId&profileId=:profileId', {}, {
      query: {method:'GET', params:{collegeId:'@collegeId', profileId:'@profileId'}, isArray:true}
    });
  }])
  
 .factory('SchoolFeedFilter', ['$resource', '$rootScope',
  function($resource, $rootScope){
    return $resource($rootScope.clhost + $rootScope.clport + '/school_feed_filter?collegeId=:collegeId', {}, {
      query: {method:'GET', params:{collegeId:'@collegeId'}, isArray:true}
    });
  }])
  
  
  .factory('NationalFeed', ['$resource', '$rootScope',
  function($resource, $rootScope){
    return $resource($rootScope.clhost + $rootScope.clport + '/national_feeds?collegeId=:collegeId', {}, {
      query: {method:'GET', params:{collegeId:'@collegeId'}, isArray:true}
    });
  }])

  .factory('Like', ['$resource', '$rootScope',
  function($resource, $rootScope){
    return $resource($rootScope.clhost + $rootScope.clport + '/likes', {}, {
      update: {method:'POST', params:{}, isArray:false}
    });
  }])
  
  .factory('View', ['$resource', '$rootScope',
  function($resource, $rootScope){
    return $resource($rootScope.clhost + $rootScope.clport + '/views', {}, {
      update: {method:'POST', params:{}, isArray:false}
    });
  }])
  

.factory('Camera', ['$q', function($q) {
 
  return {
    getPicture: function(options) {
      var q = $q.defer();
      
      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);
      
      return q.promise;
    }
  }
}])

  
.factory('UserService', ['$resource', 
   function($resource) {
	return $resource('http://localhost:8080/:action', {},
			{
				authenticate: {
					method: 'POST',
					params: {'action' : 'authenticate'},
					headers : {'Content-Type': 'application/x-www-form-urlencoded'}
				},
			}
		);
  }])
  
/*
 * 
 */
  
.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])