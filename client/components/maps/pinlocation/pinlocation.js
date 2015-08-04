'use strict';

angular.module('workerManagementSystemApp')
  .directive('pinlocation',function(locationSer){
    return{
      replace:true,
      restrict:'EA',
      templateUrl:'components/maps/pinlocation/pinlocation.html',
      controller: function($scope, $element, $attrs){
        $scope.map='';
        $scope.markers = [{
            title: 'Alibaug',/*
            "lat": '18.641400',
            "lng": '72.872200',*/
            description: 'Alibaug is a coastal town and a municipal council in Raigad District in the Konkan region of Maharashtra, India.'
        }];
        $scope.current={};
        $scope.getLocation = function() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition($scope.showPosition);
          } else {
             alert('Geolocation is not supported by this browser.');
          }
        };
        $scope.showPosition = function(position) {
          if($attrs.lat && $attrs.lng){
            locationSer.lat=$scope.markers.lat = parseFloat($attrs.lat);
            locationSer.lng=$scope.markers.lng = parseFloat($attrs.lng); 
          }else{
            locationSer.lat=$scope.markers.lat = position.coords.latitude;
            locationSer.lng=$scope.markers.lng = position.coords.longitude; 
          }
            var mapOptions = {
                zoom: 16,
                center: new google.maps.LatLng($scope.markers.lat, $scope.markers.lng),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var infoWindow = new google.maps.InfoWindow();
            var latlngbounds = new google.maps.LatLngBounds();
            var geocoder = geocoder = new google.maps.Geocoder();
            $scope.map = new google.maps.Map($element[0], mapOptions);
            
                var data = $scope.markers;
                var myLatlng = new google.maps.LatLng(data.lat, data.lng);
                var icon = ($attrs.status === 'active')?'green-dot':'red-dot';
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: $scope.map,
                    title: data.title,
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                    icon: new google.maps.MarkerImage('http://maps.google.com/mapfiles/ms/icons/' + icon + '.png')
                });
                (function (marker, data) {
                    google.maps.event.addListener(marker, 'click', function () {
                        infoWindow.setContent(data.description);
                        infoWindow.open($scope.map, marker);
                    });
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
            
          //  var bounds = new google.maps.LatLngBounds();
            $scope.map.setCenter(latlngbounds.getCenter());
            $scope.map.fitBounds(latlngbounds);
            google.maps.event.addListenerOnce($scope.map, 'tilesloaded', function(){
                //this part runs when the mapobject is created and rendered
                $scope.map.setZoom(7);
            });
        } ;
          
        $scope.getLocation();

        $attrs.$observe("status",function(){
            $scope.getLocation();
        });

      }/*,
      link:function(scope,element,attr){

      },*/
    };
  });