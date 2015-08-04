'use strict';

angular.module('workerManagementSystemApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/employer', {
        templateUrl: 'app/employer/employer.html',
        controller: 'EmpCtrl'
      });
  });