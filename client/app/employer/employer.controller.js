'use strict';

angular.module('workerManagementSystemApp')
  .controller('EmpCtrl', function ($scope, Auth, locationSer, $http, $location) {
  
  $scope.today = function() {
    $scope.order.startDate = new Date(new Date());
    $scope.today = new Date();
    $scope.order.endDate = new Date();
  };

  $scope.clear = function () {
    $scope.order.startDate = null;

    $scope.order.endDate = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };

  $scope.open = function($event,popup) {


    $event.preventDefault();
    $event.stopPropagation();
    if(popup=='start'){
		$scope.startDateOpen = true;
    }else{
    	$scope.endDateOpen = true;
    }
    
  };

  $scope.toggleMode = function() {
    $scope.isStartMeridian = ! $scope.isStartMeridian;
    $scope.isEndMeridian = ! $scope.isEndMeridian;

  };

  $scope.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };

  $scope.clear = function() {
    $scope.mytime = null;
  };

  $scope.getManPower = function(){
    var locat={
      'lat' : locationSer.lat,
      'lng' : locationSer.lng,
      'address' : locationSer.address
    };
  $scope.placeNewOrder = function(){
    $scope.order.desc='';
    $scope.order.empCount=undefined;
    $scope.placedSuccess = false;
  };
  $scope.cancle = function(){
    $location.path('/home');
  }
    $scope.order.location = locat;


$http.post('/api/orders', {
         location : $scope.order.location,
        empCount : $scope.order.empCount,
        typeOfWork: $scope.order.typeOfWork,
        /*typeOfShift: $scope.order.typeOfShift,*/
        availebleDay: $scope.order.availebleDay,
        startDate: $scope.order.startDate ,
        endDate: $scope.order.endDate,
        startTime: $scope.order.startTime,
        endTime: $scope.order.endTime,
        desc: $scope.order.desc,
        mob : $scope.order.mob,
        email :$scope.order.email
    });

    //$scope.awesomeOrders = [];

    $http.get('/api/orders').success(function(awesomeOrders) {
  /*    $scope.awesomeOrders = awesomeOrders;
      socket.syncUpdates('order', $scope.awesomeOrders);*/
      console.log('success added');
      $scope.placedSuccess = true;
    });
/*
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
*/


    //console.log($scope.order);
  }

  
  $scope.$watch('selected', function(nowSelected){
      $scope.order.availebleDay = [];
      
      if( ! nowSelected ){
          // here we've initialized selected already
          // but sometimes that's not the case
          // then we get null or undefined
          return;
      }
      angular.forEach(nowSelected, function(val){
        console.log(val);
          $scope.order.availebleDay.push( val() );
      });
  });

  $scope.init = function(){
    alert("")
    $scope.order = {};
    $scope.order.availebleDay = [];  
    $scope.today();
    $scope.toggleMin();
    $scope.format = 'dd-MMMM-yyyy';
    $scope.mytime = new Date();
    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.options = {
      hstep: [1, 2, 3],
      mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.isStartMeridian = true;
    $scope.isEndMeridian = true;
    //$scope.order.typeOfShift = 'dayShift';
    $scope.order.typeOfWork = 'fullTime';
    $scope.user = Auth.getCurrentUser();
    $scope.order.mob = $scope.user.mobile;

  };
  $scope.init();

  });