'use strict';

angular.module('toDoAppApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ui.calendar',
  'ngQuickDate'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('login');

    $locationProvider.html5Mode(true);
  });