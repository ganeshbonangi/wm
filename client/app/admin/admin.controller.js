'use strict';

angular.module('workerManagementSystemApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, $timeout, $modal, socket) {
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
      //$scope.count++;
      
         
           $scope.users.push(user);
           $scope.init();
         
      //$scope.$apply();
    //console.log(user);
    });
    $scope.init = function() {
      var locations = [];
      for(var i=0;i<$scope.users.length;i++){
        var b = [];
        var user = $scope.users[i];
        if( user.role !== 'admin' ){
          b[0] = '<div>'+user.name+'</div><hr/><div>'+user.gender+'</div><hr/><div>'+user.status+'</div><hr/><div>'+user.mobile+'</div>';
          b[1] = parseFloat(user.location.lat);
          b[2] = parseFloat(user.location.lng);
          b[3] = user.name;
          b[4] = user.status;
          locations.push(b);
        }
      }
      var workermap = new google.maps.Map(document.getElementById('workermap'), {
        zoom: 11,
        center: new google.maps.LatLng(19.164174, 72.948151),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      var marker;

      for ( i = 0; i < locations.length; i++) {  
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
      for(var i=0;i<$scope.awesomeOrders.length;i++){
        var b = [];
        var order = $scope.awesomeOrders[i];
          b[0] = '<div>'+order.startDate+'</div><div>'+order.endDate+'</div><div>'+order.startTime+'</div><div>'+order.endTime+'</div><div>'+order.availebleDay+'</div><div>'+order.typeOfShift+'</div><div>'+order.typeOfWork+'</div><div>Ph:'+order.mob+'</div><div>Needed:'+order.empCount+'</div><div>Desc:'+order.desc+'</div><div>mail:'+order.email+'</div>';
          b[1] = parseFloat(order.location.lat);
          b[2] = parseFloat(order.location.lng);
          b[3] = order.name;
          b[4] = order.status;
          locations.push(b);
      }
      var workermap = new google.maps.Map(document.getElementById('ordermap'), {
        zoom: 11,
        center: new google.maps.LatLng(19.164174, 72.948151),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      var marker;

      for ( i = 0; i < locations.length; i++) {  
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
          templateUrl: 'app/admin/addedituser/addedituser.html',
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
          templateUrl: 'app/admin/addedituser/addedituser.html',
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