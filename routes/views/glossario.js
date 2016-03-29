var keystone = require('keystone');
var Glossario = keystone.list('glossario');
exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    if (!req.user){// se non sono loggato mi rimanda al login
      res.redirect("keystone/signin")
    }else{
      //inizializzo locals

      locals.termini = [];
/*
      function getIniziale(termini) {
        var indice = 0;
        var lettera = 'A';
        for (var i = 0; i < termini.length; i++) {
          var conta = 0;
          var newLettera = termini[i].termine.charAt(0);
          if ( newLettera == lettera){
            conta++;
          }else{
            locals.iniziali[indice]=conta;
            indice++;
          }
        }
      }*/


      locals.pageName = 'Glossario';

      view.on('init', function (next) {
        Glossario.model.find().sort('termine').exec(function (err, results) {
          locals.termini = results;
      		next(err);
  			});
      });
      //renderizzo la pagina
      view.render('glossario');
    }
}
