'use strict';

angular.module('MyCrush')
  .controller('UserController', ['$scope', '$state', 'toaster', 'Users', 'users', 'profile',
    function ($scope, $state, toaster, Users, users, profile) {

      $scope.currentUser = Users.user;
      $scope.profile = profile;
      $scope.profile.online = Users.setOnline(profile.$id);

      $scope.users = users;
      console.log("users: ", $scope.users);

      $scope.crush = function(id) {
        console.log("id: ", id);
        Users.setCrush(id, function(){
          toaster.pop('success', 'Successfully set your crush');
        }, function(error) {
          toaster.pop('error', 'Not able to set your crush as this time');
        });
      };

      $scope.chat = function() {
        // body...
      }

  }]);


