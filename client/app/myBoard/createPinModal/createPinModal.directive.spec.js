'use strict';

describe('Directive: createPinModal', function () {

  // load the directive's module and view
  beforeEach(module('workspaceApp'));
  beforeEach(module('app/myBoard/createPinModal/createPinModal.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<create-pin-modal></create-pin-modal>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the createPinModal directive');
  }));
});