angular.module('MyCrush')
  .controller('ProfileCtrl', ['$scope', '$state', 'toaster', 'profile',
    function ($scope, $state, toaster, profile) {

      $scope.profile = profile;

      $scope.updateProfile = function() {
        $scope.profile.$save().then(function(){
          $state.go('timeline');
          toaster.pop('success', 'Profile Updated Successfully');
        });
      };

  }])
