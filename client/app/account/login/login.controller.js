'use strict';

angular.module('workerManagementSystemApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

$scope.user.mobile=1234567871;
$scope.user.password='superadmin';
    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          mobile: $scope.user.mobile,
          password: $scope.user.password
        })
        .then( function(data) {
            //$location.path('/');
          // Logged in, redirect to home
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
      console.log($window.location.href);
    };
  });
