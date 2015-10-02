'use strict';

angular.module('MyCrush')
  .factory('Comments', ['$firebaseArray', 'FURL', function ($firebaseArray, FURL) {

    var ref = new Firebase(FURL + 'comments');

    var Comment = {
      comments: function(mindID) {
        return $firebaseArray(ref.child(mindID));
      },

      addComment: function(id, commentObj, cb) {
        return ref.child(id).push(commentObj, function(err) {
          if (!err) {
            cb();
          }
        })
      }
    }

    return Comment;

  }]);
