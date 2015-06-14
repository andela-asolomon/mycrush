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
        console.log("Logged in as:", authData);
        $state.go('timeline');
        toaster.pop('success', 'Logged in as ' + authData.google.cachedUserProfile.name);

      }).catch(function(error) {
        console.error("Authentication failed:", error);
        toaster.pop('error', 'Authentication failed');
      });
    };

    $scope.logout = function() {
      Authentication.$unauth();
      $state.go('home');
    };

  }]);


