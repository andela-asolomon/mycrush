'use strict';

angular.module('MyCrush')
  .controller('NavController', ['$scope', 'Authentication', '$state', 'toaster', 'Users',
    function ($scope, Authentication, $state, toaster, Users) {

    $scope.signedIn = Users.signedIn;

    $scope.currentUser = Users.user;

    $scope.login = function() {
      var options = { remember: true, scope: 'email' };
      Authentication.$authWithOAuthPopup("google", options).then(function(authData) {
        var user = {
          name: authData.google.cachedUserProfile.name,
          accessToken: authData.google.accessToken,
          gravatar: authData.google.cachedUserProfile.picture,
          email: authData.google.email
        };
        Users.createProfile(authData.uid, user);
        $state.go('timeline');
        toaster.pop('success', 'Logged in as ' + authData.google.cachedUserProfile.name);

      }).catch(function(error) {
        console.error("Authentication failed:", error);
        toaster.pop('error', 'Authentication failed');
      });
    };

    $scope.logout = function() {
      Users.getProfile($scope.currentUser.uid).$loaded()
        .then(function(profile){
          profile.online = null;
          profile.$save().then(function(){
            Authentication.$unauth();
            toaster.pop('success', 'Logged Out');
            $state.go('home');
          });
        }, function(error) {
          toaster.pop('error', 'Unable to Log Out');
        });
    };

  }]);


