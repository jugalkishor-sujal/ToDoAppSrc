'use strict';

angular.module('toDoAppApp')
  .controller('HomeCtrl', function ($scope, $http, Todos) {
      $scope.formData = {};
      $scope.loading = true;
      $scope.editing = $scope.editing || false;
      $scope.delete = $scope.delete || false;
      $scope.okButton = $scope.okButton || 'Add';
      $scope.todos = $scope.todos || [];

      // GET ==============================================================================
      //- User views list of ToDo items (including date info) : when landing on the page,
      //get all todos and show them
      // use the service to get all the todos
      $scope.GetAllTodo = function () {

          Todos.get()
               .success(function (response) {
                   $scope.todos = response;
                   $scope.loading = false;
               }).error(function (response) {
                   $scope.loading = false;
                   $scope.error = response;
               });
      };
      $scope.GetAllTodo();

      // CREATE & UPDATE ==================================================================
      // -User adds ToDo items and assigns date info : when submitting the add form, 
      //send the text to the node API
      $scope.createTodo = function () {
          $scope.loading = true;
          $scope.error = '';
          $scope.success = '';
          // validate the formData to make sure that sometodo is there
          // if form is empty, notodo will happen
          if ($scope.formData.todoTitle !== undefined) {
              if ($scope.editing) {
                  // call the create function from our service (returns a promise object)
                  Todos.update($scope.formData._id, $scope.formData)

                      // if successful creation, call our get function to get all the new todos
                      .success(function (response) {
                          $scope.loading = false;
                          $scope.okButton = 'Add';
                          $scope.editing = false;
                          $scope.delete = false;
                          $scope.formData = {}; // clear the form so our user is ready to enter another
                          $scope.success = response; // assign our new list of todos
                          $scope.GetAllTodo();

                      }).error(function (response) {
                          $scope.loading = false;
                          $scope.error = response;
                      });
              }
              else {
                  // call the create function from our service (returns a promise object)
                  Todos.create($scope.formData)

                      // if successful creation, call our get function to get all the new todos
                      .success(function (response) {
                          $scope.loading = false;
                          $scope.formData = {}; // clear the form so our user is ready to enter another
                          $scope.success = response; // assign our new list of todos
                          $scope.GetAllTodo();
                      }).error(function (response) {
                          $scope.loading = false;
                          $scope.error = response;
                      });
              }
          }
      };

      // DELETE ===========================================================================
      // delete a todo after checking it
      $scope.deleteTodo = function (id) {
          $scope.loading = true;
          $scope.error = '';
          $scope.success = '';
          Todos.delete(id)
              // if successful creation, call our get function to get all the new todos
              .success(function (response) {
                  $scope.loading = false;
                  $scope.okButton = 'Add';
                  $scope.editing = false;
                  $scope.delete = false;
                  $scope.success = response; // assign our new list of todos
                  $scope.GetAllTodo();
              }).error(function (response) {
                  $scope.loading = false;
                  $scope.error = response;
              });
      };

      // EDIT =============================================================================
      // - User changes date info for selected ToDo item : edit a todo after checking it
      $scope.editTodo = function (id) {
          $scope.loading = true;
          $scope.error = '';
          $scope.editing = true;
          $scope.delete = true;
          $scope.okButton = 'Update';
          $scope.formData = {};
          Todos.getById(id)
			.success(function (response) {
			    $scope.formData = response;
			    $scope.loading = false;
			}).error(function (response) {
			    $scope.loading = false;
			    $scope.error = response;
			});
      };


      $scope.clearTodo = function () {
          $scope.loading = false;
          $scope.error = '';
          $scope.success = '';
          $scope.formData = {};
          $scope.editing = false;
          $scope.delete = false;
          $scope.okButton = 'Add';
      };
  });
