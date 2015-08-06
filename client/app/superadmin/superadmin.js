'use strict';

angular.module('workerManagementSystemApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/superadmin', {
        templateUrl: 'app/superadmin/superadmin.html',
        controller: 'SuperAdminCtrl'
      });
  });