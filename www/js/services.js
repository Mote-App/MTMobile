angular.module('clservices', ['ngResource'])

.factory('Tags', ['$resource',
  function($resource){
    return $resource('data/tags.json', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
  }])

.factory('Schools', ['$resource',
  function($resource){
    return $resource('data/schools.json', {}, {
      query: {method:'GET', params:{}, isArray:false}
    });
  }])

.factory('User', ['$resource',
  function($resource){
    return $resource('data/student_data.json', {}, {
      query: {method:'GET', params:{}, isArray:false}
    });
  }])