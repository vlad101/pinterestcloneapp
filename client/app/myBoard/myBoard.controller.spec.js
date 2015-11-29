'use strict';

describe('Controller: MyBoardCtrl', function () {

  // load the controller's module
  beforeEach(module('workspaceApp'));

  var MyBoardCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyBoardCtrl = $controller('MyBoardCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
