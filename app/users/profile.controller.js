/*global Firebase */
'use strict'

angular.module('MyCrush')
  .controller('ProfileCtrl', ['$scope', '$state', '$timeout', 'toaster', 'profile', '$stateParams', 'Users', 'minds', 'Comments',
    function ($scope, $state, $timeout, toaster, profile, $stateParams, Users, minds, Comments) {

      $scope.currentUser = Users.user;
      $scope.profile = profile;
      $scope.uid = $stateParams.uid;
      $scope.minds = minds;
      $scope.editing = null;

      var toastError = function(message) {
        return function(err) {
          toaster.pop('error', message);
          console.log('Something failed:', err);
        };
      };
      
      $scope.getUser = function(uid) {
        Users.getProfile(uid).$loaded()
        .then(function(user) {
          $scope.user = user;
        }, function(err) {

          console.log("Err:", err);
        });
      }

      $scope.setMind = function(mind) {
        if (mind === '') {
          toaster.pop('error', 'Empty string is not allowed');
          return;
        } else {
          $scope.minds.$add({
            body      : mind,
            author    : $scope.currentUser.profile.$id,
            timestamp : Firebase.ServerValue.TIMESTAMP
          }).then(function(ref) {
            console.log('key', ref.key);
            toaster.pop('success', 'Status update successful');
          }).catch(toastError('Updating status failed'))
        }
      };

      $scope.openEditor = function(message){
        $scope.editing = message;
      };

      $scope.saveEdits = function (message) {
        $scope.minds.$save(message).then(function() {
          $scope.editing = null;
          toaster.pop('success', 'Saved status update!');
        }).catch(toastError('Updating status failed'));
      };

      $scope.addComment = function(msgScope, content) {
        var user = $scope.currentUser.profile,

          commentObj = {
            body       : content,
            name       : user.name,
            author         : user.$id,
            gravatar   : $scope.currentUser.profile.gravatar,
            timestamp  : Firebase.ServerValue.TIMESTAMP
        };

        msgScope.comments.$add(commentObj)
        .then(function() {
          toaster.pop('success', "comment updated Successfully");
        })
        .catch(toastError('Adding comment failed'));
      }

      $scope.updateComment = function(msgScope, comment) {
        msgScope.comments.$save(comment).then(function() {
          $scope.editing = null;
          toaster.pop('success', 'Comment updated!')
        }).catch(toastError('Updating comment failed'))
      }

      $scope.getComments = function(msgScope) {
        msgScope.comments = Comments(msgScope.message.$id);
        
      }

      $scope.deleteComments = function(msgScope, com) {

        msgScope.comments.$remove(com).then(function(){
          toaster.pop('info', 'Deleted successfully')
        }).catch(toastError('Error Deleting Comment'));
      };

      $scope.updateProfile = function() {
        $scope.profile.$save().then(function(){
          $('#posModal').modal('hide');
          toaster.pop('success', 'Profile Updated Successfully');
        });
      };

  }])
