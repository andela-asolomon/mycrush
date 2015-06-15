'use strict';

angular.module('MyCrush')
.factory('Users', ['FURL', '$firebaseAuth', '$firebaseObject', '$firebaseArray',
  function(FURL, $firebaseAuth, $firebaseObject, $firebaseArray) {

    var ref       = new Firebase(FURL),
        usersRef  = new Firebase(FURL + 'users'),
        users     = $firebaseArray(usersRef),
        auth      = $firebaseAuth(ref);

  var connectedRef = new Firebase(FURL + '.info/connected');

    var Users = {

      user: {},

      all: users,

      createProfile: function(uid, user) {

          var profile = {
            name: user.name,
            accessToken: user.accessToken,
            gravatar: user.gravatar,
            email: user.email
          };

          return usersRef.child(uid).set(profile, function(error) {
            if (!error) {
              console.log("Successful");
            } else {
              console.log("Error: ", error);
            }
          });
      },

      getProfile: function(uid) {
        return $firebaseObject(usersRef.child(uid));
      },

      getUsername: function(uid) {
        return users.$getRecord(uid).username;
      },

      getGravatar: function(uid) {
        return users.$getRecord(uid).gravatar;
      },

      signedIn: function() {
        return !!Users.user.provider;
      },

      setCrush: function(id, cb) {
        Users.getProfile(id).$loaded().then(function(profile){
          if (profile.crush) {
            return;
          } else {
            profile.crush = Users.user.uid;
            profile.$save().then(function(){
              cb();
            });
          }
        }, function(error) {
          console.log("Error");
          cb(error);
        });
      },

      setOnline: function(uid) {
        var connected = $firebaseObject(connectedRef);
        var online = $firebaseArray(usersRef.child(uid + '/online'));

        connected.$watch(function() {
          if (connected.$value === true) {
            online.$add(true).then(function(connectedRef){
              connectedRef.onDisconnect().remove();
            });
          };
        });
      }
    };

    auth.$onAuth(function(authData) {
      if (authData) {
        angular.copy(authData, Users.user);
        Users.user.profile = $firebaseObject(usersRef.child(authData.uid));
      } else {
        if (Users.user && Users.user.profile) {
          Users.user.profile.$destroy();
        };
        angular.copy({}, Users.user)
      }
    });

    return Users;
  }
]);
