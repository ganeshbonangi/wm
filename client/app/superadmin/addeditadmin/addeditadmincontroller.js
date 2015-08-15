'use strict';

angular.module('workerManagementSystemApp')
  .controller('AddEditAdminCtrl', function ($scope, Auth, $location, $window, locationSer, $modalInstance, user) {
    $scope.init = function() {
      if(user){
        $scope.admin =  user;  
        $scope.addadminbtn = false;
        $scope.editadminbtn = true;
      }else{
        $scope.admin =  {};
        $scope.addadminbtn = true;
        $scope.editadminbtn = false;
      }
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
          name : $scope.admin.name,
          mobile : $scope.admin.mobile,
          password : $scope.admin.password,
          location : locat,
          status : $scope.admin.status,
          gender : $scope.admin.gender,
          role:$scope.admin.role
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
    $scope.updateAdmin = function(admin){  
      var locat={
                    lat : locationSer.lat,
                    lng : locationSer.lng,
                    address : locationSer.address
                  };
        admin.location = locat;
       Auth.updateUser( admin );
       $scope.$parent.$broadcast('editUpdate',admin);
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
    $scope.addAdmin = function( ) {
      $scope.admin.role='admin';
      $scope.register('modal');
      //$modalInstance.close($scope.user);
      //$scope.closeModel();
    };


    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };

    $scope.init();
  });
