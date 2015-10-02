angular.module('MyCrush')
  .controller('ProfileCtrl', ['$scope', '$state', 'toaster', 'profile', '$stateParams', 'Users',
    function ($scope, $state, toaster, profile, $stateParams, Users) {

      $scope.currentUser = Users.user;
      $scope.profile = profile;
      $scope.uid = $stateParams.uid;

      $scope.getUser = function(uid) {
        Users.getProfile(uid).$loaded()
        .then(function(user) {
          $scope.user = user;
          console.log("User: ", user);
        }, function(err) {
          console.log("Err: ", err);
        });
      }

      $scope.updateProfile = function() {
        $scope.profile.$save().then(function(){
          $('#posModal').modal('hide');
          toaster.pop('success', 'Profile Updated Successfully');
        });
      };

  }])
