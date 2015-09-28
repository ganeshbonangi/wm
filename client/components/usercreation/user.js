'use strict';

angular.module('workerManagementSystemApp')
.directive('userCreation', function (Auth, $location, $window, locationSer,$rootScope) {
      // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
     scope: {
      role:'=?',
      isModal:'=?',
      user:'=?'
     }, 
     controller: function($scope, $element, $attrs) {
      $scope.init = function() {
        if(!$scope.user){
          $scope.user = {};
          if($scope.role=="admin")
            $scope.user.role = 'admin';
          else
            $scope.user.role = 'worker';
        }else{
          $scope.update = true;
        }
        $scope.roleChanged();
        $scope.errors = {}; 
        $scope.keyup = true;     
      };
      $scope.heading = $attrs.heading;
      $scope.statusChange = function(){
        //$scope.$apply();
      }
      $scope.register = function(form, from) {
        $scope.submitted = true;
        var userObject = {};
        var locat={
                    'lat' : $scope.marker.coords.latitude,
                    'lng' : $scope.marker.coords.longitude,
                    'address' : $scope.marker.coords.address
                  };
        if(form.$valid) {
          userObject = {
            name : $scope.user.name,
            mobile : $scope.user.mobile,
            password : $scope.user.password,
            location : locat,
            status : $scope.user.status,
            gender : $scope.user.gender,
            role : $scope.user.role,
            skills : $scope.user.skills
          };
          $scope.createUser(userObject, from);
        }else if(($scope.user.role === 'employer'||$scope.user.role === 'admin') && form.name.$valid && form.mobile.$valid && form.password.$valid ){
          userObject = {
            name : $scope.user.name,
            mobile : $scope.user.mobile,
            password : $scope.user.password,
            location : locat,/*
            status : $scope.user.status,
            gender : $scope.user.gender,*/
            role : $scope.user.role/*,
            skills : $scope.user.skills*/
          };
          $scope.createUser(userObject, from);
        }
      };
      $scope.createUser = function(userObj, from){
          Auth.createUser(userObj,$scope.isModal)
          .then( function() {
            if($scope.isModal){
              $scope.$parent.cancel();
            }else if($scope.user.role=="employer"){
              $location.path('/employer');//$modalInstance.dismiss('cancel');
            }else{
              $location.path('/');//$modalInstance.dismiss('cancel');
            }
          })
          .catch( function(err) {
            err = err.data;
            $scope.errors = {};
            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function(error, field) {
              if(field!=='mobile'){
                form[field].$setValidity('mongoose', false);
                $scope.errors[field] = error.message;
              }else{
                $scope.keyup=false;
              }
            });
          });
      }
      $scope.updateUser = function(user){                                                      
        var locat={
                    'lat' : $scope.marker.coords.latitude,
                    'lng' : $scope.marker.coords.longitude,
                    'address' : $scope.marker.coords.address
                  };
         $scope.user.location = locat;
         Auth.updateUser( $scope.user );
         $scope.$parent.$broadcast('editUpdate',$scope.user);
  /*       angular.forEach($scope.users, function(u, i) {
           if (u === user) {
             $scope.users[i]=user;
           }
         });*/
         $scope.$parent.cancel()
      };
      $scope.roleChanged = function() {
        if($scope.user.role === 'worker'){
          $scope.visablejson={
            role: true,
            name : true,
            mobile : true,
            password : true,
            location : true,
            status : true,
            gender : true,
            skills : true
          };
        }else if($scope.user.role === 'admin'){
          $scope.visablejson={
            role: false,
            name : true,
            mobile : true,
            password : true,
            location : true,
            status : false,
            gender : true
          };
        }else{
          $scope.visablejson={
            role: true,
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
      };
      $scope.init();
    },
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
     templateUrl: 'components/userCreation/user.html',
     replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {
      
    }
  };
});
