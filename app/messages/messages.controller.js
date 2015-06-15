angular.module('MyCrush')
  .controller('MessagesController', ['$scope', '$state', 'toaster', 'messages', 'user',
    function ($scope, $state, toaster, messages, user) {

      $scope.messages = messages;
      $scope.user = user;

      $scope.message = '';

      $scope.sendMessaage = function() {
        console.log("message: ", $scope.message);
        if ($scope.message.length > 0) {
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
       * Jquery Chat
       */
      $('#live-chat header').on('click', function() {
        $('.chat').slideToggle(300, 'swing');
        $('.chat-message-counter').fadeToggle(300, 'swing');
      });

      $('.chat-close').on('click', function(e) {
        e.preventDefault();
        $('#live-chat').fadeOut(300);
      });
  }]);
