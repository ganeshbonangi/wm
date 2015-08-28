/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Order = require('../api/order/order.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

Order.find({}).remove(function() {


  Order.create({"availebleDay":["tuesday","wedesday","thursday"],
"startDate":"2015-03-21T08:46:44.316Z",
"endDate":"2015-03-21T08:46:44.316Z",
/*"typeOfShift":"dayShift",*/
"typeOfWork":"fullTime",
"status":"pending",
"mob":1234567892,
"empCount":20,
"desc":"desc",
"email":"jjhj@ggg.com",
"endTime":"2015-03-20T18:59:22.557Z",
"startTime":"2015-03-21T17:44:22.544Z",
"location":{"lat":19.044196096205965,"lng":73.10504835000006,"address":"Road Number 20, Sector AWC, Kalamboli, Panvel, Navi Mumbai, Maharashtra 410218, India"}
}
);
});

User.find({}).remove(function() {        
  User.create({
    provider: 'local',
    role: 'worker',
    name: 'testuser',
    mobile: '1234567890',
    password: 'test',
    location : {
                address : 'Unit 2, Aarey Road, Passpoli, Goregaon East, Mumbai, Maharashtra 400087, India',
                lat : 14.698848,
                lng : 79.711304
        },
    status : 'active',
    gender : 'male',
    skills : 'html'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'admin',
    mobile: '1234567891',
    password: 'admin',
    gender : 'female',
    location : {
                address : 'Unit 2, Aarey Road, Passpoli, Goregaon East, Mumbai, Maharashtra 400087, India',
                lat : 14.698848,
                lng : 79
        }
  }, {
    provider: 'local',
    role: 'superadmin',
    name: 'superadmin',
    mobile: '1234567871',
    password: 'superadmin',
    gender : 'male',
    location : {
                address : 'Unit 2, Aarey Road, Passpoli, Goregaon East, Mumbai, Maharashtra 400087, India',
                lat : 14.698848,
                lng : 79
        }
  }, {
    provider: 'local',
    role: 'employer',
    name: 'emp',
    mobile: '1234567892',
    password: 'emp',
    gender : 'male',
    location : {
                address : 'Unit 2, Aarey Road, Passpoli, Goregaon East, Mumbai, Maharashtra 400087, India',
                lat : 14.698848,
                lng : 79
        }
  }, function() {
      console.log('finished populating users');
    }
  );
}); 