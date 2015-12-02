'use strict';

describe('Controller: RecentPinsCtrl', function () {

  // load the controller's module
  beforeEach(module('workspaceApp'));

  var RecentPinsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecentPinsCtrl = $controller('RecentPinsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
