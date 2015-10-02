angular.module('MyCrush')
  .controller('ProfileCtrl', ['$scope', '$state', 'toaster', 'profile', '$stateParams', 'Users', 'minds', 'Comments',
    function ($scope, $state, toaster, profile, $stateParams, Users, minds, Comments) {

      $scope.currentUser = Users.user;
      $scope.profile = profile;
      $scope.uid = $stateParams.uid;
      $scope.minds = minds;

      $scope.getUser = function(uid) {
        Users.getProfile(uid).$loaded()
        .then(function(user) {
          $scope.user = user;
        }, function(err) {
          console.log("Err: ", err);
        });
      }

      $scope.setMind = function(mind) {
        $scope.minds.$add({
          body: mind,
          timestamp: Firebase.ServerValue.TIMESTAMP
        }).then(function() {
          $scope.mind = "";
        });
        $scope.mind = "";
      }

      $scope.addComment = function(id, content) {
        var commentObj = {
          body: content,
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
          $scope.comments = comments;
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
