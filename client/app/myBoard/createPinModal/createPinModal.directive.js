'use strict';

angular.module('workspaceApp')
  .directive('createPinModal', function () {
    return {
      templateUrl: 'app/myBoard/createPinModal/createPinModal.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });