var keystone = require('keystone');
var Attori = keystone.list('actor');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    if (!req.user){// se non sono loggato mi rimanda al login
      res.redirect("keystone/signin")
    }else{
      //inizializzo locals
      locals.attori = [];
      locals.pageName = 'Attori';

      view.on('init', function (next) {
        Attori.model.find().populate('generalizza').exec(function (err, results) {
          locals.attori = results;
      		next(err);
  			});
      });
      //renderizzo la pagina
      view.render('actors');
    }
}
