'use strict';

angular.module('MyCrush')
.factory('Authentication', ['FURL', '$firebaseAuth',
  function(FURL, $firebaseAuth) {

    var ref = new Firebase(FURL);
    var auth = $firebaseAuth(ref);

    return auth;
  }
]);
