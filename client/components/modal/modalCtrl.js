'use strict';

angular.module('workerManagementSystemApp')
.controller('ModalInstanceCtrl', function ($scope, $modalInstance, title, dataObject) {

  $scope.dataObject = dataObject;
  $scope.title = title;
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});