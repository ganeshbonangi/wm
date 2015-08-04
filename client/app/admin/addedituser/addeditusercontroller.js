'use strict';

angular.module('workerManagementSystemApp')
  .controller('AddEditUserCtrl', function ($scope, Auth, $location, $window, locationSer, $modalInstance, user) {
    $scope.init = function() {
      if(user){
        $scope.user =  user;  
        $scope.adduserbtn = false;
        $scope.edituserbtn = true;
      }else{
        $scope.user =  {};
        $scope.user.role = 'worker';
        $scope.adduserbtn = true;
        $scope.edituserbtn = false;
      }

      $scope.roleChanged();
      $scope.errors = {};      
    };

    $scope.register = function( ) {
      $scope.submitted = true;

      //if(form.$valid) {
        var locat={
                    lat : locationSer.lat,
                    lng : locationSer.lng,
                    address : locationSer.address
                  };  
             $scope.location =  locat;     
        Auth.createUserByAdmin({
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
        //  if(from != 'modal') {
            $modalInstance.dismiss('cancel');
          //}
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};
          // Update validity of form fields that match the mongoose errors
          /*angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });*/
        });
        $scope.$parent.$broadcast('createUpdate',$scope.user);
    //  }
    };
    $scope.updateUser = function(user){  
      var locat={
                    lat : locationSer.lat,
                    lng : locationSer.lng,
                    address : locationSer.address
                  };
        user.location = locat;
       Auth.updateUser( user );
       $scope.$parent.$broadcast('editUpdate',user);
/*       angular.forEach($scope.users, function(u, i) {
         if (u === user) {
           $scope.users[i]=user;
         }
       });*/
       $scope.closeModel();
    };
    $scope.closeModel = function() {
     $modalInstance.dismiss('cancel');
     //$scope.$apply();
    };
    $scope.addUser = function( ) {
      $scope.register('modal');
      //$modalInstance.close($scope.user);
      //$scope.closeModel();
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
    };

    $scope.init();
  });
