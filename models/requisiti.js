var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Requisiti = new keystone.List('requisiti',{
  label : 'Requisiti',
  map: { name: 'codice' },
  track: true
});

Requisiti.add({
    priorita:{ type: Types.Select, options: 'Obbligatorio, Desiderabile, Opzionale',
      label:'Priorità del requisito', initial:true, required:true
    },
    tipologia:{ type: Types.Select, options: 'Funzionale, Vincolo, Qualità, Prestazionale', label: 'Tipologia del requisito',
     initial:true, required:true },
    numero:{ type: Types.Text, unique: true, initial:true, required:true, note: 'codice numerico del requisito'},
  descrizione:{type: Types.Textarea, required:true, initial:true},
  fonti:{
    usecases:{type: Types.Relationship, ref:'useCases', many:true, initial:true,label:"Casi d'uso", note:'use cases da includere nelle fonti.'},
    altro:{type: Types.Relationship, ref:'fonti', many:true, initial:true, label:'Altre fonti'}
  },
  codice:{type: Types.Text, watch:true, value: getCodice, initial:false }
});
Requisiti.relationship({ path: 'codice', ref: 'useCases', refPath: 'fonti.usecases' });
Requisiti.relationship({ path: 'nome', ref: 'fonti', refPath: 'fonti.altro' });


function getCodice() {
  var codice;
  var prioritaNum, tipologia;
  switch(this.priorita) {
    case "Obbligatorio":
        prioritaNum="0";
        break;
    case "Desiderabile":
        prioritaNum="1";
        break;
    case "Opzionale":
        prioritaNum="2";
        break;
    }
    switch(this.tipologia) {
      case "Funzionale":
          tipologia="F";
          break;
      case "Vincolo":
          tipologia="V";
          break;
      case "Qualità":
          tipologia="Q";
          break;
      case "Prestazionale":
          tipologia="P";
          break;
      }
  codice='R'+prioritaNum+tipologia+this.numero;
  return codice;
}

Requisiti.register();
