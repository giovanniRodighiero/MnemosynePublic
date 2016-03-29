var keystone = require('keystone');
var UseCases = keystone.list('useCases');
var cloudinary = require('cloudinary');
var datetime = require('node-datetime');

cloudinary.config({
  cloud_name: 'latexebiscotti',
  api_key: '258389277326829',
  api_secret: 'FD45mYUllCbXTdVWkM4RqpB-a1U'
});

function setLink(arg) {
  var link = document.getElementById("archivio");
  link.style.visibility=arg;
}
exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    if (!req.user){// se non sono loggato mi rimanda al login
      res.redirect("keystone/signin")
    }else{
      //inizializzo locals
      console.log('id: '+req.params.id);
      
      locals.usecases = [];
      locals.pageName = "Casi d'uso";
      view.on('init', function (next) {
        UseCases.model.find().populate('attoriPrimari attoriSecondari flussoPrincipale estensioneUseCase').exec(function (err, results) {
          locals.usecases = results;
      		next(err);
  			});
      });
      view.on('get', {download: 'usecases'}, function (next) {
        var dt = datetime.create();
        var formatted = dt.format('m-d-Y_H-M-S');
        cloudinary.v2.uploader.create_archive({prefixes: '/', resource_type: 'image', target_public_id: 'usecases_'+formatted}, function(error,result) {
        });
          next();
      });
      //renderizzo la pagina
      view.render('usecases');
    }
}
