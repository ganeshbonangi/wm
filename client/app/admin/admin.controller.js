'use strict';

angular.module('workerManagementSystemApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, $timeout, $modal, socket, locationSer) {
    // Use the User $resource to fetch all users
    User.query({}, function(users) {
          $scope.users = users;
         $scope.init();
    });
    //$scope.users = User.query();
    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };

    $scope.$on('editUpdate', function(event,user) {
      //$scope.count++;
      angular.forEach($scope.users, function(u, i) {
         if (u === user) {
           $scope.users[i]=user;
         }
       });
      //$scope.$apply();
    //console.log(user);
     $scope.init();
    });   
     $scope.$on('createUpdate', function(event,user) {
           $scope.users.push(user);
           $scope.init();
    });
    $scope.init = function() {
      var locations = [];
      $scope.objectCollection = locationSer.mapMarkerHtml($scope.users);
      locations = $scope.objectCollection.workers;
      var workermap = new google.maps.Map(document.getElementById('workermap'), {
        zoom: 11,
        center: new google.maps.LatLng(19.164174, 72.948151),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      var marker;

      for ( var i = 0; i < locations.length; i++) {  
        var icon = locations[i][4]==='active'?'green-dot':'red-dot';
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][1], locations[i][2]),
          map: workermap,
          title: locations[i][3],
          icon: new google.maps.MarkerImage('http://maps.google.com/mapfiles/ms/icons/' + icon + '.png')
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            var infowindow = new google.maps.InfoWindow({content:locations[i][0]});
            //infowindow.setContent();
            // $timeout(function(){infowindow.close();});
            
            infowindow.open(workermap, marker);
          };
        })(marker, i));
      }
    };

    $scope.initOrder = function() {
      var locations = [];
      locations = locationSer.mapMarkerHtmlForOrders($scope.awesomeOrders);
      var workermap = new google.maps.Map(document.getElementById('ordermap'), {
        zoom: 11,
        center: new google.maps.LatLng(19.164174, 72.948151),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      var marker;

      for ( var i = 0; i < locations.length; i++) {  
        var icon = locations[i][4]==='active'?'green-dot':'red-dot';
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][1], locations[i][2]),
          map: workermap,
          title: locations[i][3],
          icon: new google.maps.MarkerImage('http://maps.google.com/mapfiles/ms/icons/' + icon + '.png')
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            var infowindow = new google.maps.InfoWindow({content:locations[i][0]});
            //infowindow.setContent();
            // $timeout(function(){infowindow.close();});
            
            infowindow.open(workermap, marker);
          };
        })(marker, i));
      }
    };


    $scope.addUser = function(size) {
     var modalInstance = $modal.open({
          templateUrl: 'components/addedituser/addedituser.html',
          controller: 'AddEditUserCtrl',
          size: size,
          resolve: {
            user: null
          }
        });
        modalInstance.result.then(function ( ) {
            $scope.users = User.query();//$scope.users.push(newUser);
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };
    $scope.edit= function(user) { 
     var modalInstance = $modal.open({
          templateUrl: 'components/addedituser/addedituser.html',
          controller: 'AddEditUserCtrl',
          size: 'lr',
          resolve: {
            user: function(){ return user;}//return should be there
          }
        });
        modalInstance.result.then(function ( ) {
            $scope.users = User.query();//$scope.users.push(newUser);
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.awesomeOrders = [];

    $http.get('/api/orders').success(function(awesomeOrders) {
      $scope.awesomeOrders = awesomeOrders;
      socket.syncUpdates('order', $scope.awesomeOrders);
      $scope.initOrder();
    });

    $scope.addOrder = function() {
      if($scope.newOrder === '') {
        return;
      }
      $http.post('/api/orders', { typeOfWork: $scope.newOrder });
      $scope.newOrder = '';
    };

    $scope.deleteOrder = function(order) {
      $http.delete('/api/orders/' + order._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('order');
    });

  });
function edit(user){
 angular.element(event.currentTarget).scope().edit(user);
}
function del(user){
 angular.element(event.currentTarget).scope().delete(user);
}