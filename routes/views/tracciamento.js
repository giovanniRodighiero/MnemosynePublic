var keystone = require('keystone');
var Requisiti = keystone.list('requisiti');
var Fonti = keystone.list('fonti');
var Casi = keystone.list('useCases');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    if (!req.user){// se non sono loggato mi rimanda al login
      res.redirect("keystone/signin")
    }else{
      function Create2DArray(rows) {
      var arr = [];

      for (var i=0;i<rows;i++) {
         arr[i] = {};
      }
      for (var i=0;i<rows;i++) {
         arr[i].requisito = [];
      }
      return arr;
    }
      //inizializzo locals
      locals.requisiti;
      locals.fonti = [];
      locals.casi = [];

      locals.tracciamentoDoc;
      locals.tracciamentoCasi;

      locals.pageName = 'Tracciamento';

      function filtraDoc(target, lista) {
        for (var i = 0; i < lista.length; i++) {
          if(target == lista[i].nome)
            return true;
        }
        return false;
      }
      function filtraCasi(target, lista) {
        for (var i = 0; i < lista.length; i++) {
          if(target == lista[i].codice)
            return true;
        }
        return false;
      }
      function addToListDoc(fonti, requisiti, container) {// aggiungo a un array tutti i requisiti in cui compare una certa fonte
        for (var i = 0; i < fonti.length; i++) {//scorro le fonti
          container[i].fonte= fonti[i];
          for (var j = 0; j < requisiti.length; j++) {//scorro i le fonti dei requisiti
            if(filtraDoc(fonti[i].nome,requisiti[j].fonti.altro)){// se in una
              container[i].requisito.push(requisiti[j]);
            }
          }
        }
      }
      function addToListCasi(fonti, requisiti, container) {// aggiungo a un array tutti i requisiti in cui compare una certa fonte
        for (var i = 0; i < fonti.length; i++) {//scorro le fonti
          container[i].fonte= fonti[i];
          for (var j = 0; j < requisiti.length; j++) {//scorro i le fonti dei requisiti
            if(filtraCasi(fonti[i].codice,requisiti[j].fonti.usecases)){// se in una
              container[i].requisito.push(requisiti[j]);
            }
          }
        }
      }

      view.on('init', function (next) {
        Requisiti.model.find().populate('fonti.usecases fonti.altro').sort('+tipologia +numero').exec(function (err, results) {
          locals.requisiti = results;
      		next(err);
  			});
      });
      view.on('init', function (next) {
        Casi.model.find().sort('+codice').exec(function (err, results) {
          locals.casi = results;
          locals.tracciamentoCasi = Create2DArray(locals.casi.length);
          addToListCasi(results,locals.requisiti, locals.tracciamentoCasi);
          next(err);
        });
      });
      view.on('init', function (next) {
        Fonti.model.find().sort('+nome').exec(function (err, results) {
          locals.fonti = results;
          locals.tracciamentoDoc = Create2DArray(locals.fonti.length);
          addToListDoc(results,locals.requisiti, locals.tracciamentoDoc);
      		next(err);
  			});
      });
      //renderizzo la pagina
      view.render('tracciamento');
    }
}
