var keystone = require('keystone')
cons = require('consolidate'),
  nunjucks = require('nunjucks');

  var mongoDbConnectionString =    'mongodb://username:password@url:port/mnemosyn'
 || 'mongodb://localhost:27017/test';

var host = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

var port = process.env.OPENSHIFT_NODEJS_PORT  || process.env.OPENSHIFT_INTERNAL_PORT || 3000;
keystone.init({

  'name': 'Mnemosyne',

  'favicon': 'public/favicon.ico',
  'less': 'public',
  'static': ['public'],

  'views': 'templates/views',
  'view engine': 'html',
  'env':'production',
  'auto update': true,
  'mongo': mongoDbConnectionString,
      'host': host,
      'port':  port,
  'session': true,
  'auth': true,
  'user model': 'User',//dove guardare per gestione sessione e utenti che possono accedere
  'cookie secret': 'my secret cookie'

});


// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

// // Override render function to auto apply layout
cons.nunjucks.render = function(str, options, fn) {
  // Define new nunjucks env, set template location and path
  var env = nunjucks.configure('templates/views');
  // Render page
  env.renderString(str, options, fn);
};


keystone.init({
  'views': 'templates/views',
  'view engine': 'html',
  'custom engine': cons.nunjucks,
});
require('./models');


keystone.set('routes', require('./routes'));
keystone.set('nav', {
'test': ['testSistema'],
'account': 'users',
'fonti requisiti': 'fonti',
'usecases': 'useCases',
'requisiti':'requisiti',
'attori':'actor'
});
keystone.start();
