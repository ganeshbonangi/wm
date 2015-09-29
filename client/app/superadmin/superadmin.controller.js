'use strict';

angular.module('workerManagementSystemApp')
  .controller('SuperAdminCtrl', function ($scope) {
    $scope.$emit('DOMReady',true);
  });
