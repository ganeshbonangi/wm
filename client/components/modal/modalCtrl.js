'use strict';

angular.module('workerManagementSystemApp')
.controller('ModalInstanceCtrl', function ($scope, $modalInstance, title, dataObject, type) {

  $scope.dataObject = dataObject;
  $scope.title = title;
  $scope.type = type;
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});