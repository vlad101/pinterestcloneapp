'use strict';

angular.module('workspaceApp')
  .controller('UsersCtrl', function ($scope, $http, $routeParams) {

	// Get user id from url
    if($routeParams.userId) {
      	var userId = $routeParams.userId;
  		// Get user object if the user id is valid
	    $http.get('/api/users/' + userId)
	      	.then(function successCallback(userInfo) {
	      		for(var i in userInfo.data) {
			        if(userInfo.data[i].hasOwnProperty('username'))
			          	$scope.userName = userInfo.data[i].username;
			        else
			          	$scope.userName = '';
	      		}
	        }, function errorCallback(response) {
	          $scope.userId = 'Something went wrong, try again.';
	    }).catch( function() {
	      $scope.userId = '';
	    });
  	}
  	
  });