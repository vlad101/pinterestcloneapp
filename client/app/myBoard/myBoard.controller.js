'use strict';

angular.module('workspaceApp')
  .controller('MyBoardCtrl', function ($scope, $http) {

    // Get user from session
    $http.get('/api/sessions/user')
      .then(function successCallback(userInfo) {
          $scope.userId = userInfo.data._id;
        }, function errorCallback(response) {
          $scope.userId = 'Something went wrong, try again.';
    }).catch( function() {
      $scope.userId = '';
    });

});