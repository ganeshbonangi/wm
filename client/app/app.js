'use strict';

var devloperVersion = false;
angular.module('workerManagementSystemApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'btford.socket-io',
  'ui.bootstrap',
  'ngAnimate'
]).value('mapOptions',{
                        zoom: 11,
                        center: new google.maps.LatLng(17.6800900, 83.2016100),
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        scrollwheel: false
                      })
  .controller('wmCtrl', function($scope, $http, Auth, User, $timeout, $modal, socket, locationSer, mapOptions){
      // Use the User $resource to fetch all users
    //$scope.users = User.query();
    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u.mobile === user.mobile) {
          $scope.users.splice(i, 1);
        }
      });
      $scope.init($scope.users);
    };

    $scope.$on('editUpdate', function(event,user) {
      //$scope.count++;
      
      angular.forEach($scope.users, function(u, i) {
         if (u.mobile === user.mobile) {
           $scope.users[i]=user;
         }
       });
     $scope.init($scope.users);
    });   
     $scope.$on('createUpdate', function(event,user) {
           $scope.users.push(user);
           $scope.init($scope.users);
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
    $scope.updateOrder = function(order,status){
      order.status = status;
      $http.put('/api/orders/'+order._id, {order:order }).success(function(){
        socket.syncUpdates('order', $scope.awesomeOrders);
        $scope.initOrder($scope.awesomeOrders);
      });
    };
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('order');
    });

    $scope.init = function(users) {
      var locations;
      var admins;
      $scope.objectCollection = locationSer.mapMarkerHtml(users);
      locations = $scope.objectCollection.workers;
      if ($scope.isSuperAdmin) {
      admins = $scope.objectCollection.admins;
      var adminmap = new google.maps.Map(document.getElementById('adminmap'), mapOptions);

      var marker;
      for ( i = 0; i < admins.length; i++) {  
        var icon = admins[i][4]==='active'?'green-dot':'red-dot';
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(admins[i][1], admins[i][2]),
          map: adminmap,
          title: admins[i][3],
          icon: new google.maps.MarkerImage('http://maps.google.com/mapfiles/ms/icons/' + icon + '.png')
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            var infowindow = new google.maps.InfoWindow({content:admins[i][0]});
            //infowindow.setContent();
            // $timeout(function(){infowindow.close();});
            
            infowindow.open(adminmap, marker);
          };
        })(marker, i));
      }
      };
      var workermap = new google.maps.Map(document.getElementById('workermap'),mapOptions);

      var marker;

      for (var i = 0; i < locations.length; i++) {  
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

    $scope.initOrder = function(orders) {
      var locations = [];
      locations = locationSer.mapMarkerHtmlForOrders(orders);
      var workermap = new google.maps.Map(document.getElementById('ordermap'), mapOptions);

      var marker;

      for ( var i = 0; i < locations.length; i++) {  
        var icon = locations[i][4]==='pending'?'red-dot':'green-dot';
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
          animation: true,
          templateUrl: '/components/modal/modal.html',
          controller: 'ModalInstanceCtrl',
          size: 'lr',/*'sm'*/
          resolve: {
            title: function(){
              return "User creation";
            },
            dataObject: function () {
              return null;
            },
            type: function(){
              return {name:"user"};
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          //$scope.selected = selectedItem;
        }, function () {
          //$log.info('Modal dismissed at: ' + new Date());
        });
    };
    $scope.edit= function(user) { 
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: '/components/modal/modal.html',
          controller: 'ModalInstanceCtrl',
          size: 'lr',/*'sm'*/
          resolve: {
            title: function(){
              return user.role=="admin"?"Adimin creation":"User creation";
            },
            dataObject: function () {
              return user;
            },
            type: function(){
              return {name:"user",role:user.role};
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          //$scope.selected = selectedItem;
        }, function () {
          //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.addAdmin = function(size) {
          var modalInstance = $modal.open({
          animation: true,
          templateUrl: '/components/modal/modal.html',
          controller: 'ModalInstanceCtrl',
          size: 'lr',/*'sm'*/
          resolve: {
            title: function(){
              return "Sing up";
            },
            dataObject: function () {
              return null;
            },
            type: function(){
              return {name:"user",role:"admin"};
            }
          }
        });
    };
    $scope.$on('DOMReady', function(ev,isSuperAdmin){
      $scope.isSuperAdmin = isSuperAdmin;
  User.query({}, function(users) {
          $scope.users = users;
         $scope.init($scope.users);
    });
    $scope.awesomeOrders = [];

    $http.get('/api/orders').success(function(awesomeOrders) {
      $scope.awesomeOrders = awesomeOrders;
      socket.syncUpdates('order', $scope.awesomeOrders);
      $scope.initOrder($scope.awesomeOrders);
    });
    });

})
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })  
  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  }).run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next,prev) {

    });
  });

function edit(user){
 angular.element(event.currentTarget).scope().edit(user);
}
function del(user){
 angular.element(event.currentTarget).scope().delete(user);
}
function updateOrder(order){
  var value = event.currentTarget.value;
  angular.element(event.currentTarget).scope().updateOrder(order,value);
}