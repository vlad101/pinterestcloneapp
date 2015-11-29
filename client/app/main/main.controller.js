'use strict';

angular.module('workspaceApp')
  .controller('MainCtrl', function ($scope, $http) {

    // Get user from session
    $http.get('/api/sessions/user')
      .then(function successCallback(userInfo) {
          $scope.userId = userInfo.data._id;
        }, function errorCallback(response) {
          $scope.userId = 'Something went wrong, try again.';
    }).catch( function() {
      $scope.userId = '';
    });

    // Redirect to the provided path, used to redirect to /auth/twitter path
    $scope.go = function ( path ) {
      if(!path) return;
      window.location.href = path;
    };

  });
