'use strict';

angular.module('workspaceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/users/:userId', {
        templateUrl: 'app/users/users.html',
        controller: 'UsersCtrl'
      });
  });
