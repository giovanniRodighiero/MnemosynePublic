var keystone = require('keystone');
var Requisiti = keystone.list('requisiti');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    if (!req.user){// se non sono loggato mi rimanda al login
      res.redirect("keystone/signin")
    }else{
      //inizializzo locals
      locals.requisiti = [];
      locals.pageName = 'Requisiti';

      view.on('init', function (next) {
        Requisiti.model.find({ tipologia: 'Funzionale' }).populate('fonti.usecases fonti.altro').exec(function (err, results) {
          locals.requisiti[0] = results;
      		next(err);
  			});
      });
      view.on('init', function (next) {
        Requisiti.model.find({ tipologia: 'Vincolo' }).populate('fonti.usecases fonti.altro').exec(function (err, results) {
          locals.requisiti[1] = results;
      		next(err);
  			});
      });
      view.on('init', function (next) {
        Requisiti.model.find({ tipologia: 'Qualità' }).populate('fonti.usecases fonti.altro').exec(function (err, results) {
          locals.requisiti[2] = results;
      		next(err);
  			});
      });
      view.on('init', function (next) {
        Requisiti.model.find({ tipologia: 'Prestazionale' }).populate('fonti.usecases fonti.altro').exec(function (err, results) {
          locals.requisiti[3] = results;
      		next(err);
  			});
      });

      //renderizzo la pagina
      view.render('requisiti');
    }
}
