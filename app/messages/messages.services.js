angular.module('MyCrush')
  .factory('Messages', ['$firebaseArray', 'FURL', function ($firebaseArray, FURL) {

    var ref = new Firebase(FURL + 'usersMessages');

    return {
      forUsers: function(uid1, uid2) {
        var path = uid1 < uid2 ? uid1+'/'+uid2 : uid2+'/'+uid1;

        return $firebaseArray(ref.child(path));
      }
    };

  }])
