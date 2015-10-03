angular.module('MyCrush')
  .controller('ProfileCtrl', ['$scope', '$state', '$timeout', 'toaster', 'profile', '$stateParams', 'Users', 'minds', 'Comments',
    function ($scope, $state, $timeout, toaster, profile, $stateParams, Users, minds, Comments) {

      $scope.currentUser = Users.user;
      $scope.profile = profile;
      $scope.uid = $stateParams.uid;
      $scope.minds = minds;
      $scope.comments = {};

      $scope.getUser = function(uid) {
        Users.getProfile(uid).$loaded()
        .then(function(user) {
          $scope.user = user;
        }, function(err) {
          console.log("Err: ", err);
        });
      }

      $scope.setMind = function(mind) {

        if (mind === '') {
          toaster.pop('error', 'Empty string is not allowed');
          return;
        } else {
          $scope.minds.$add({
            body: mind,
            timestamp: Firebase.ServerValue.TIMESTAMP
          }).then(function() {
            toaster.pop('success', 'Status update successful');
          });
        }
      }

      $scope.addComment = function(id, content) {
        var commentObj = {
          body: content,
          name: $scope.currentUser.profile.name,
          gravatar: $scope.currentUser.profile.gravatar,
          timestamp: Firebase.ServerValue.TIMESTAMP
        }
        Comments.addComment(id, commentObj, function(err) {
          if (!err) {
          }
        });
      }

      $scope.getComments = function(id) {
        Comments.comments(id).$loaded()
        .then(function(comments) {
          $timeout(function () {
            $scope.comments[id] = comments;
          });
        }, function(err) {
          console.log(err);
        });
      }

      $scope.updateProfile = function() {
        $scope.profile.$save().then(function(){
          $('#posModal').modal('hide');
          toaster.pop('success', 'Profile Updated Successfully');
        });
      };

  }])
