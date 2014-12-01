'use strict';

angular.module('toDoAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl'
      });
  }).factory('Todos', ['$http', function ($http) {
      return {
          get: function () {
              return $http.get('/api/todos');
          },
          getById: function (id) {
              return $http.get('/api/todos/' + id);
          },
          create: function (todoData) {
              return $http.post('/api/todos', todoData);
          },
          update: function (id, todoData) {
              return $http.put('/api/todos/' + id, todoData);
          },
          delete: function (id) {
              return $http.delete('/api/todos/' + id);
          }
      };
  }]);