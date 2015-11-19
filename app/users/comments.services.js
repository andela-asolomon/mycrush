'use strict';

angular.module('MyCrush')
 .factory('Comments', ['$firebaseArray', 'FURL', function ($firebaseArray, FURL) {
     var ref = new Firebase(FURL + 'comments');
    return function(mindID) {
      return $firebaseArray(ref.child(mindID));
    }
  }]);