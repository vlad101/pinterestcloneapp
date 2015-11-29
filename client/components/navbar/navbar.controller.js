'use strict';

angular.module('workspaceApp')
  .controller('NavbarCtrl', function ($scope, $location, $http) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;

    // Get user from session
    $http.get('/api/sessions/user')
      .then(function successCallback(userInfo) {
          if(userInfo.data.hasOwnProperty('twitter'))
            $scope.userName = userInfo.data.twitter.username;
          else
            $scope.userName = '';
        }, function errorCallback(response) {
          $scope.userName = 'Something went wrong, try again.';
    }).catch( function() {
      $scope.userName = '';
    });

    // Redirect to the provided path, used to redirect to /auth/twitter path
    $scope.go = function ( path ) {
      if(!path) return;
      window.location.href = path;
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });