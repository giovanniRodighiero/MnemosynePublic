var keystone = require('keystone');
var Requisiti = keystone.list('requisiti');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    if (!req.user){// se non sono loggato mi rimanda al login
      res.redirect("keystone/signin")
    }else{
      //inizializzo locals
      locals.requisitoId = req.params.id;
      locals.pageName = 'Dettagli Requisito';
      view.on('init', function (next) {
        Requisiti.model.findOne({ _id : locals.requisitoId }).populate('fonti.usecases fonti.altro').exec(function (err, results) {
          locals.details = results;
      		next(err);
  			});
      });
      //renderizzo la pagina
      view.render('requisitiDetails');
    }
}
