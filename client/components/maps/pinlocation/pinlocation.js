'use strict';

angular.module('workerManagementSystemApp')
  .directive('pinlocation',function(locationSer){
    return{
      replace:true,
      restrict:'EA',
      templateUrl:'components/maps/pinlocation/pinlocation.html',
      scope: {status:'=?',lat:'=?',lng:'=?'},
      controller: function($scope, $element, $attrs){
        $scope.map='';
        $scope.markers = {};
        $scope.current={};
        $scope.setLocationOnMap = function(){
          if($scope.lat && $scope.lng){
            locationSer.lat=$scope.markers.lat = parseFloat($scope.lat);
            locationSer.lng=$scope.markers.lng = parseFloat($scope.lng); 
            $scope.renderMap();
          }else{
            $scope.markers = {
              title: 'Vizag',
              lat: 17.6800900,
              lng: 83.2016100,
              description: 'Gonthinavanipalem, Gajuwaka, Visakhapatnam, Andhra Pradesh, India'
            };
            locationSer.lat=$scope.markers.lat;
            locationSer.lng=$scope.markers.lng; 
            $scope.renderMap();
            $scope.getLocation();
          }          
        }
        $scope.renderMap = function(){
          var mapOptions = {
              zoom: 16,
              center: new google.maps.LatLng($scope.markers.lat, $scope.markers.lng),
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              scrollwheel: false
          };
          var latlngbounds = new google.maps.LatLngBounds();
          var geocoder = geocoder = new google.maps.Geocoder();
          $scope.map = new google.maps.Map($element[0], mapOptions);            
          var data = $scope.markers;
          var myLatlng = new google.maps.LatLng(data.lat, data.lng);
          var icon = ($scope.status === 'active')?'green-dot':'red-dot';
          var marker = new google.maps.Marker({
              position: myLatlng,
              map: $scope.map,
              title: data.title,
              draggable: true,
              animation: google.maps.Animation.DROP,
              icon: new google.maps.MarkerImage('http://maps.google.com/mapfiles/ms/icons/' + icon + '.png')
          });
          (function (marker, data) {
              google.maps.event.addListener(marker, 'dragend', function () {
                  geocoder.geocode({ 'latLng': marker.getPosition() }, function (results, status) {
                      if (status === google.maps.GeocoderStatus.OK) {
                          locationSer.lat = marker.getPosition().lat();
                          locationSer.lng = marker.getPosition().lng();
                          locationSer.address = results[0].formatted_address;
                      }
                  });
              });
          })(marker, data);
          latlngbounds.extend(marker.position);
          $scope.map.setCenter(latlngbounds.getCenter());
          $scope.map.fitBounds(latlngbounds);
          google.maps.event.addListenerOnce($scope.map, 'tilesloaded', function(){
              //this part runs when the mapobject is created and rendered
              $scope.map.setZoom(7);
          });         
        }
        $scope.getLocation = function() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition($scope.showPosition);
          } else {
             alert('Geolocation is not supported by this browser.');
          }
        };
        $scope.showPosition = function(position) {
            locationSer.lat=$scope.markers.lat = position.coords.latitude;
            locationSer.lng=$scope.markers.lng = position.coords.longitude; 
            $scope.renderMap();
        } ;
          
        $scope.setLocationOnMap();

        $scope.$watch("status",function(){
            $scope.setLocationOnMap();
        });

      }
    };
  });