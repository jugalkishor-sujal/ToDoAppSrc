'use strict';

angular.module('toDoAppApp')
  .controller('LoginCtrl', function ($scope,$location, Users) {
      $scope.doLogin = function () {
          $scope.loading = true;
          var loginUsername = $scope.username;
          if (!loginUsername) {
              return;
          }

          var loginPassword = $scope.password;
          if (!loginPassword) {
              return;
          }
          Users.login({ username: loginUsername, password: loginPassword })

                      // if successful creation, call our get function to get all the new todos
                      .success(function (response) {
                          $scope.userLoginInfo = response;
                          if ($scope.userLoginInfo.role) {
                              $location.path('/home');
                          } else {
                              $scope.error = response;
                              $scope.loading = false;
                          }

                      }).error(function (response) {
                          $scope.loading = false;
                          $scope.error = response;
                      });
      };
  });
