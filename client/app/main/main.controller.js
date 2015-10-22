'use strict';

angular.module('workerManagementSystemApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

   $scope.slides = [{
      image:"assets/images/plumber.jpg",
      text:"Plumbing work"
    },{
      image: "assets/images/Nursing-home-photo.jpg",
      text:"Health care"
    },{
      image:"assets/images/local-electrician-huntington-beach-area.jpg",
      text:"Electrician"
    },{
      image:"assets/images/home.jpg",
      text:"House keeping"
    }];
  });
