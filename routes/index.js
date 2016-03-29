var keystone = require('keystone'),
    middleware = require('./middleware'),
    importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);
// Handle 404 errors
keystone.set('404', function(req, res, next) {
    res.notfound();
});

// Handle other errors
keystone.set('500', function(err, req, res, next) {
    var title, message;
    if (err instanceof Error) {
        message = err.message;
        err = err.stack;
    }
    res.err(err, title, message);
});

// Load Routes
var routes = {
    views: importRoutes('./views')
};

// Bind Routes
exports = module.exports = function(app) {

    app.get('/', routes.views.index);
    app.get('/actors', routes.views.actors);
    app.get('/glossario', routes.views.glossario);
    app.get('/usecases', routes.views.usecases);
    app.get('/usecases/:id', routes.views.usecasesDetails);
    app.get('/requisiti', routes.views.requisiti);
    app.get('/requisiti/:id', routes.views.requisitiDetails);
    app.get('/tracciamento', routes.views.tracciamento);
    app.get('/test', routes.views.test);

 };
