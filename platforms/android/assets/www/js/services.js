angular.module('clservices', ['ngResource'])

.factory('Tags', ['$resource',
  function($resource){
    return $resource('data/tags.json', {}, {
      query: {method:'GET', params:{}, isArray:false}
    });
  }])

.factory('Profile', ['$resource',
  function($resource){
    return $resource('data/profile.json', {}, {
      query: {method:'GET', params:{}, isArray:false}
    });
  }])

.factory('Schools', ['$resource',
  function($resource){
    return $resource('data/schools.json', {}, {
      query: {method:'GET', params:{}, isArray:false}
    });
  }])

.factory('FriendFeed', ['$resource',
  function($resource){
    return $resource('data/friend_feeds_data.json', {}, {
      query: {method:'GET', params:{}, isArray:false}
    });
  }])
  
 .factory('SchoolFeed', ['$resource',
  function($resource){
    return $resource('data/school_feeds_data.json', {}, {
      query: {method:'GET', params:{}, isArray:false}
    });
  }])
  
  .factory('NationalFeed', ['$resource',
  function($resource){
    return $resource('data/national_feeds_data.json', {}, {
      query: {method:'GET', params:{}, isArray:false}
    });
  }])