'use strict';

angular.module('MyCrush')
  .controller('UserController', ['$scope', '$state', 'toaster', 'Users', 'users', 'profile',
    function ($scope, $state, toaster, Users, users, profile) {

      $scope.currentUser = Users.user;

      $scope.users = users;
      console.log("users: ", $scope.users);

      $scope.crush = function(id) {
        console.log("id: ", id);
      };

  }]);


