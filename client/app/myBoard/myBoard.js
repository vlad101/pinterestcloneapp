'use strict';

angular.module('workspaceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/myBoard', {
        templateUrl: 'app/myBoard/myBoard.html',
        controller: 'MyBoardCtrl'
      });
  });
