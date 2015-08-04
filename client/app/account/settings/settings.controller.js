'use strict';

angular.module('workerManagementSystemApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, locationSer) {
    $scope.errors = {};
    $scope.user = Auth.getCurrentUser();
    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.cancel($scope.opened);
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};

    $scope.changeUserName = function(form) {
      $scope.submitted = true;
     // if(form.$valid) {
        Auth.changeUserName($scope.user.name)//$scope.user.name
        .then( function() {
          $scope.cancel($scope.opened);
          $scope.message = 'user name successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect user';
          $scope.message = '';
        });
     // }
    };    
    $scope.cancel = function( name ){
      $scope[name] = false;
      $scope.opened = null;
      $scope.user = User.get();
    };
    $scope.openPanel = function(name){
      if( $scope.opened != name){
        $scope.cancel($scope.opened);
        $scope.opened = name;
        $scope[name] = true;
      }      
    };
    $scope.changeMobile = function(form) {
      $scope.submitted = true;
      //if(form.$valid) {
        Auth.changeMobile( $scope.user.mobile )
        .then( function() {
          $scope.cancel($scope.opened);
          $scope.passWordmessage = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      //}
    };    
    $scope.changeSkills = function(form) {
      Auth.changeSkills( $scope.user.skills )
      .then( function() {
        $scope.cancel($scope.opened);
        $scope.message = 'Skills successfully changed.';
      })
      .catch( function() {
        form.password.$setValidity('mongoose', false);
        $scope.errors.other = 'Incorrect skills';
        $scope.message = '';
      });      
    };
    $scope.changeStatus = function(form) {
      $scope.submitted = true;
      //if(form.$valid) {
        Auth.changeStatus( $scope.user.status )
        .then( function() {
          $scope.cancel($scope.opened);
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      //}
    };
    $scope.changeLocation = function(form) {
      $scope.submitted = true;
      var locat={
            'lat' : locationSer.lat,
            'lng' : locationSer.lng,
            'address' : locationSer.address
          };
      //if(form.$valid) {
        Auth.changeLocation(locat)
        .then( function() {
          $scope.cancel($scope.opened);
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      //}
    };   
  });
