'use strict';

angular.module('workerManagementSystemApp')
  .factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
    var currentUser = {};
    if($cookieStore.get('token')) {
      currentUser = User.get();
    }

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function(user, callback) {
        
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/auth/local', {
          password: user.password,
          name : user.name,
          mobile : user.mobile,
          location : user.location,
          status : user.status,
          gender : user.gender
        }).
        success(function(data) {
          $cookieStore.put('token', data.token);
          currentUser = User.get(function(userdata){
              $location.path('/'+userdata.role);
          });
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function() {
        $cookieStore.remove('token');
        currentUser = {};
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function(user, callback) {
        var cb = callback || angular.noop;
        return User.save(user,
          function(data) {
            $cookieStore.put('token', data.token);
            currentUser = User.get();
            return cb(user);
          },
          function(err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },
      createUserByAdmin: function(user, callback) {
        var cb = callback || angular.noop;
        return User.save(user,
          function( ) {
           // $cookieStore.put('token', data.token);
           // currentUser = User.get();
            return cb(user);
          },
          function(err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },
      updateUser: function(user, callback) {

        var cb = callback || angular.noop;
        return User.updateUser({ id: user._id }, {
          user: user
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise; 

      },
      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      changeUserName: function(name, callback) {
        var cb = callback || angular.noop;

        return User.changeUserName({ id: currentUser._id }, {
          name: name
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;        
      },

      changeMobile: function(mobile, callback) {
        var cb = callback || angular.noop;

        return User.changeMobile({ id: currentUser._id }, {
          mobile: mobile
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;        
      },

      changeSkills:  function(skills, callback) {
        var cb = callback || angular.noop;

        return User.changeSkills({ id: currentUser._id }, {
          skills: skills
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;        
      },

      changeStatus: function(status, callback) {
        var cb = callback || angular.noop;

        return User.changeStatus({ id: currentUser._id }, {
          status: status
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;        
      },

      changeLocation: function(location, callback) {
        var cb = callback || angular.noop;

        return User.changeLocation({ id: currentUser._id }, {
          location: location
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;        
      },

      plaeceOrder: function(order, callback) {
        var cb = callback || angular.noop;

        return User.plaeceOrder({ id: currentUser._id }, {
          order: order
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;        
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function() {
        return currentUser;
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function(cb) {
        if(currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        } else if(currentUser.hasOwnProperty('role')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function() {
        return currentUser.role === 'admin';
      },
      /**
       * Check if a user is an employer
       *
       * @return {Boolean}
       */
      isEmployer: function() {
        return currentUser.role === 'employer';
      },
      isSuperAdmin: function() {
        return currentUser.role === 'superadmin';
      },

      /**
       * Get auth token
       */
      getToken: function() {
        return $cookieStore.get('token');
      }
    };
  });
