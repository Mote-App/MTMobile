angular.module('clservices', ['ngResource'])

.factory('loginService', ['$resource','$rootScope',
  function($resource, $rootScope){
    return $resource($rootScope.clhost + $rootScope.clport + '/login', {}, {
    	authenticate: {method:'POST', params:{}, isArray:false}
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
    return $resource($rootScope.clhost + $rootScope.clport + '/friend_feeds?userId=:userId', {}, {
      query: {method:'GET', params:{userId:'@userId'}, isArray:true}
    });
  }])
  
 .factory('SchoolFeed', ['$resource',
  function($resource){
    return $resource($rootScope.clhost + $rootScope.clport + '/school_feeds?collegeId=:collegeId', {}, {
      query: {method:'GET', params:{collegeId:'@collegeId'}, isArray:false}
    });
  }])
  
  .factory('NationalFeed', ['$resource',
  function($resource){
    return $resource($rootScope.clhost + $rootScope.clport + '/national_feeds?collegeId=:collegeId', {}, {
      query: {method:'GET', params:{collegeId:'@collegeId'}, isArray:false}
    });
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