var keystone = require('keystone');
var UseCases = keystone.list('useCases');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    function makeList(argument) {
      var listaConNumeri = [];
      for (var i = 0; i < argument.length; i++) {
        if((i+1) == argument.length)
          listaConNumeri[i]=i+1+". "+argument[i].azione+".";
        else
          listaConNumeri[i]=i+1+". "+argument[i].azione+"; \newline";
      }
      return listaConNumeri;
    }
    if (!req.user){// se non sono loggato mi rimanda al login
      res.redirect("keystone/signin")
    }else{
      
      //inizializzo locals
      locals.useCaseId = req.params.id;
      locals.pageName = "Dettagli Caso d'uso";

      view.on('init', function (next) {
        UseCases.model.findOne({ _id : locals.useCaseId }).populate('attoriPrimari attoriSecondari flussoPrincipale estensioneUseCase').exec(function (err, results) {
          locals.details = results;
      		next(err);
  			});
      });
      //renderizzo la pagina
      view.render('usecasesDetails');
    }
}
