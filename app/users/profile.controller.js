angular.module('MyCrush')
  .controller('ProfileCtrl', ['$scope', '$state', 'toaster', 'profile', '$stateParams', 'Users',
    function ($scope, $state, toaster, profile, $stateParams, Users) {

      $scope.currentUser = Users.user;
      $scope.profile = profile;
      $scope.uid = $stateParams.uid;

      $scope.updateProfile = function() {
        $scope.profile.$save().then(function(){
          $state.go('timeline');
          toaster.pop('success', 'Profile Updated Successfully');
        });
      };

      /** Jquery */
      $("#toggle-link").click(function(e) {
           e.preventDefault();
           $("#profileCol").toggleClass("hidden");
           if($("#profileCol").hasClass('hidden')){

               $("#contentCol").removeClass('col-md-9');
               $("#contentCol").addClass('col-md-12 fade in');
               $(this).html('Show Menu <i class="fa fa-arrow-right"></i>');
           }else {
               $("#contentCol").removeClass('col-md-12');
               $("#contentCol").addClass('col-md-9');
               $(this).html('<i class="fa fa-arrow-left"></i> Hide Menu');
           }
       });
       $('.tip').tooltip();

  }])
