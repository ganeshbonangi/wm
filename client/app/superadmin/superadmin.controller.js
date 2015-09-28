'use strict';

angular.module('workerManagementSystemApp')
  .controller('SuperAdminCtrl', function ($scope, $http, Auth, User, $timeout, $modal, socket, locationSer) {
    $scope.$emit("DOMReady",true);
  });
