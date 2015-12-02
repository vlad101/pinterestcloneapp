'use strict';

angular.module('workspaceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/recentPins', {
        templateUrl: 'app/recentPins/recentPins.html',
        controller: 'RecentPinsCtrl'
      });
  });
