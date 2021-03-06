'use strict';

describe('Controller: HomeCtrl', function () {

  // load the controller's module
  beforeEach(module('toDoAppApp'));

  var HomeCtrl, scope,
      $httpBackend;

    // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/api/todos')
        .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

      scope = $rootScope.$new();
      HomeCtrl = $controller('HomeCtrl', {
          $scope: scope
      });
  }));

  it('should attach a list of things to the scope', function () {
      $httpBackend.flush();
      expect(scope.todos.length).toBe(4);
  });
});
