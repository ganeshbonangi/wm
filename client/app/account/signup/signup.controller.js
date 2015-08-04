'use strict';

angular.module('workerManagementSystemApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, $window, locationSer) {

    $scope.init = function() {
      $scope.user = {};
      $scope.user.role = 'worker';
      $scope.roleChanged();
      $scope.errors = {};      
    };

    $scope.statusChange = function(){
      //$scope.$apply();
    }
    $scope.register = function(form, from) {
      $scope.submitted = true;

      if(form.$valid) {
        var locat={
                    'lat' : locationSer.lat,
                    'lng' : locationSer.lng,
                    'address' : locationSer.address
                  };
        Auth.createUser({
          name : $scope.user.name,
          mobile : $scope.user.mobile,
          password : $scope.user.password,
          location : locat,
          status : $scope.user.status,
          gender : $scope.user.gender,
          role : $scope.user.role,
          skills : $scope.user.skills
        })
        .then( function() {
          // Account created, redirect to home
          if(from !== 'modal') {
            $location.path('/');//$modalInstance.dismiss('cancel');
          }
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};
          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
      else if($scope.user.role === 'employer' && form.name.$valid && form.mobile.$valid && form.password.$valid ){
        var locat={
                    'lat' : locationSer.lat,
                    'lng' : locationSer.lng,
                    'address' : locationSer.address
                  };
        Auth.createUser({
          name : $scope.user.name,
          mobile : $scope.user.mobile,
          password : $scope.user.password,
          location : locat,/*
          status : $scope.user.status,
          gender : $scope.user.gender,*/
          role : $scope.user.role/*,
          skills : $scope.user.skills*/
        })
        .then( function() {
          // Account created, redirect to home
          if(from !== 'modal') {
            $location.path('/');//$modalInstance.dismiss('cancel');
          }
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};
          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        }); 
      }
    };
    $scope.updateUser = function(user){                                                      
       Auth.updateUser({ id: user._id });
       angular.forEach($scope.users, function(u, i) {
         if (u === user) {
           $scope.users[i]=user;
         }
       });
    };
    $scope.roleChanged = function() {
      if($scope.user.role === 'worker'){
        $scope.visablejson={
          name : true,
          mobile : true,
          password : true,
          location : true,
          status : true,
          gender : true,
          skills : true
        };
      }else{
        $scope.visablejson={
          name : true,
          mobile : true,
          password : true,
          location : true,
          status : false,
          gender : false
        };
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
      console.log($window.location.href);
    };

    $scope.init();
  });
