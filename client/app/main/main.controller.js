'use strict';

angular.module('workerManagementSystemApp')
  .controller('MainCtrl', function ($scope, $http, socket,$window,$timeout,$location) {
    $scope.awesomeThings = [];
    $scope.navbarCollapsed = true;
    $scope.locations = [
      {id: 'Vizianagaram', name: 'Vizianagaram'},
      {id: 'Vishakapatnam', name: 'Vishakapatnam'},
      {id: 'Srikakulam', name: 'Srikakulam'}
    ];
    $scope.serviceTypes=[
      {id: 'Industrial', name: 'Industrial Services '},
      {id: 'Domestic', name: 'Domestic Services '}
    ];
    $scope.submitOrderWithOutLogin = function(orderForm){
      $location.path('/order');
    };
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });
    $scope.addActive = function($event,tab){
      $scope.activeTab = tab;
      $scope.navbarCollapsed = true;
      angular.element($window).off('scroll resize', $scope.scrollEventCallBack);
      angular.element('html, body').stop().animate({
          scrollTop: angular.element(angular.element($event.currentTarget).attr("href")).offset().top+45//20
      }, 1500, 'swing',function(){
        console.log("animation completed.. and binding scroll event");
        angular.element($window).on('scroll resize', $scope.scrollEventCallBack);
      });
      $event.preventDefault();
    }
    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };
    $scope.sendMail = function(mailer){
      $scope.spinDisplay = true;
      mailer.subject = "Require man power";
      $http.post('/api/mailer', { mailer: mailer }).success(function(obj){
        $scope.mailer={};
        $scope.successDisplay =true;
        $scope.spinDisplay = false;
        $timeout(function(){
          $scope.successDisplay =false;
        },10000);
      }).error(function(obj){
        $scope.errDisplay = true;
        $scope.spinDisplay = false;
        $timeout(function(){
          $scope.errDisplay =false;
        },10000);
      });
    }
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
      image: "assets/images/maintenance.jpg",
      text:"Maintenance"
    },{
      image:"assets/images/local-electrician-huntington-beach-area.jpg",
      text:"Electrician"
    },{
      image:"assets/images/home.jpg",
      text:"House keeping"
    },{
      image:"assets/images/Overhauling.jpg",
      text:"Overhauling"
    },{
      image:"assets/images/Alignment.jpg",
      text:"Alignment"
    },{
      image:"assets/images/Fabrication.jpg",
      text:"Fabrication"
    },{
      image:"assets/images/Painting.jpg",
      text:"Painting"
    }];
    $scope.containers = ["services","about","team","contact"];//"portfolio",
    var salt=0;
    $scope.scrollEventCallBack = function(){
      if($location.path()=='/'){
        var topOfPage = angular.element($window).scrollTop();
        var padding = 2*angular.element("#services").css("padding").split(" ")[0].split("px")[0];
        for (var i = $scope.containers.length - 1; i >= 0; i--) {
          var $ele = angular.element("#"+$scope.containers[i]);
          var top  = $ele.offset().top-salt;
          var height = $ele.height()+padding;
          if(top < topOfPage&&(top+height)>topOfPage){
            $scope.activeTab = $scope.containers[i];
            break;
          }
        }
        if(i<0){
          $scope.activeTab = "none";
        }
        $scope.$apply();
      }
    }
    angular.element($window).on('scroll resize', $scope.scrollEventCallBack);

  });