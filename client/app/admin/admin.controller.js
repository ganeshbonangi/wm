'use strict';

angular.module('workerManagementSystemApp')
  .controller('AdminCtrl', function ($scope) {
    $scope.$emit('DOMReady',false);
  });
