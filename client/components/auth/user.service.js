'use strict';

angular.module('workerManagementSystemApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      updateUser:{
        method: 'PUT',
        params: {
          controller:'update'
        }
      },
      changeUserName: {
        method: 'PUT',
        params: {
          controller:'name'
        }
      },
      changeMobile: {
        method: 'PUT',
        params: {
          controller:'mobile'
        }
      },
      changeStatus: {
        method: 'PUT',
        params: {
          controller:'status'
        }
      },
      changeLocation: {
        method: 'PUT',
        params: {
          controller:'location'
        }
      },
      changeSkills: {
        method: 'PUT',
        params: {
          controller:'skills'
        }
      },
      plaeceOrder: {
        method: 'PUT',
        params: {
          controller:'orderDetails'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });