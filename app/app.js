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
    'toaster',
    'angularMoment'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        resolve: {
          requireNoAuth: function($state, Authentication) {
            return Authentication.$requireAuth().then(function(auth){
              $state.go('timeline');
            }, function(error) {
              return;
            });
          }
        }
      })
      .state('timeline', {
        url: '/timeline',
        templateUrl: 'home/timeline.html',
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
      .state('timeline.direct', {
        url: '/{uid}/direct',
        controller: 'MessagesController',
        templateUrl: 'messages/messages.html',
        resolve: {
          messages: function($stateParams, Messages, profile) {
            return Messages.forUsers($stateParams.uid, profile.$id).$loaded();
          },
          user: function($stateParams, Users) {
            return Users.getUsername($stateParams.uid);
          },
          profile: function(Users, Authentication) {
            return Authentication.$requireAuth().then(function(auth) {
              return Users.getProfile(auth.uid).$loaded();
            });
          },
          crush: function($stateParams, Users) {
            return Users.getProfile($stateParams.uid).$loaded();
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
