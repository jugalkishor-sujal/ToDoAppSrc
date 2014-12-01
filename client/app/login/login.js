'use strict';

angular.module('toDoAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl'
      });
  }).factory('Users', ['$http', function ($http) {
      return {
          get: function () {
              return $http.get('/api/users');
          },
          getById: function (id) {
              return $http.get('/api/users/' + id);
          },
          login: function (todoData) {
              return $http.post('/api/users/login', todoData);
          },
          update: function (id, todoData) {
              return $http.put('/api/users/' + id, todoData);
          },
          delete: function (id) {
              return $http.delete('/api/users/' + id);
          }
      };
  }]);