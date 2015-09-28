'use strict';

angular.module('workerManagementSystemApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, $timeout, $modal, socket, locationSer) {
    $scope.$emit("DOMReady",false);
  });
