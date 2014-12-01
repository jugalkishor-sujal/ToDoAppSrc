'use strict';

angular.module('toDoAppApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/home'
    },
    {
        'title': 'Calender',
        'link': '/calender'
    },
    {
        'title': 'Logout',
        'link': '/login'
    }
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });