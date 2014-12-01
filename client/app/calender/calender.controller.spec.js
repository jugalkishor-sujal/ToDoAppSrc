'use strict';

describe('Controller: CalenderCtrl', function () {

  // load the controller's module
  beforeEach(module('toDoAppApp'));

  var CalenderCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CalenderCtrl = $controller('CalenderCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
