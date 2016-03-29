var keystone = require('keystone');
var TestSistema = keystone.list('testSistema');
exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;




    if (!req.user){// se non sono loggato mi rimanda al login
      res.redirect("keystone/signin")
    }else{
      //inizializzo locals
      locals.trSistReq = [];
      locals.trSistTest = [];

      locals.testSistema = [];
      locals.pageName = 'Test';

      function tracciamento(tests) {
        var indice = 0;
        for (var i = 0; i < tests.length; i++) {
          for (var j = 0; j < tests[i].requisiti.length; j++) {
            locals.trSistReq[indice] = tests[i].requisiti[j].codice;
            locals.trSistTest[indice] = tests[i].codice;
            indice++;
          }
        }
      }

      view.on('init', function (next) {
        TestSistema.model.find().populate('requisiti').exec(function (err, results) {
          locals.testSistema = results;
        tracciamento(results);
      		next(err);
  			});
      });
      /*
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
      }); */

      //renderizzo la pagina
      view.render('test');
    }
}
