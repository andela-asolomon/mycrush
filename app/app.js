'use strict';

/**
 * @ngdoc overview
 * @name angularfireSlackApp
 * @description
 * # angularfireSlackApp
 *
 * Main module of the application.
 */
angular
  .module('MyCrush', [
    'firebase',
    'angular-md5',
    'ui.router',
    'ngAnimate',
    'toaster'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        controller: 'UserController',
        resolve : {
          users: function(Users) {
           return Users.all.$loaded()
            .then(function(users){
              return users;
            });
          },
          profile: function($state, Authentication, Users) {
            return Authentication.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded().then(function(profile){
                if(profile.username){
                  return profile
                } else {
                  $state.go('profile');
                }
              });
            }, function(error) {
              $state.go('home');
            });
          }
        }
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'users/profile.html',
        controller: 'ProfileCtrl',
        resolve: {
          auth: function($state, Users, Authentication) {
            return Authentication.$requireAuth().catch(function(){
              $state.go('home');
            });
          },
          profile: function(Users, Authentication) {
            return Authentication.$requireAuth().then(function(auth) {
              console.log("auth: ", auth);
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  })
  .constant('FURL', 'https://mycrush.firebaseio.com/');
