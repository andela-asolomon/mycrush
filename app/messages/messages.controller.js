angular.module('MyCrush')
  .controller('MessagesController', ['$scope', '$state', 'toaster', 'messages', 'user', 'profile', 'Users',
    function ($scope, $state, toaster, messages, user, profile, Users) {

      $scope.messages = messages;
      $scope.user = user;

      $scope.getUsername = Users.getUsername;
      $scope.getGravatar = Users.getGravatar;
      $scope.profile = profile;

      $scope.message = '';

      $scope.notification = [];

      $scope.sendMessaage = function() {
        if ($scope.message.length > 0) {
          $scope.notification.push($scope.message);
          $scope.messages.$add({
            uid: profile.$id,
            body: $scope.message,
            timestamp: Firebase.ServerValue.TIMESTAMP
          }).then(function(){
            $scope.message = '';
          });
        };
      }


      /**
       * Jquery for hiding and showing chat box
       */
      $('#live-chat header').on('click', function() {
        $('.chat').slideToggle(300, 'swing');
        $('.chat-message-counter').fadeToggle(300, 'swing');
      });

      $('.chat-close').on('click', function(e) {
        $state.go('timeline');
        e.preventDefault();
        $('#live-chat').fadeOut(300);
      });
  }]);
