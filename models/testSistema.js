var keystone = require('keystone'),
    Types = keystone.Field.Types;

var TestSistema = new keystone.List('testSistema',{
  label : 'Test Sistema',
  map: { name: 'codice' },
  track: true
});

TestSistema.add({
  priorita:{ type: Types.Select, options: 'Obbligatorio, Desiderabile, Opzionale',
    label:'Priorità del requisito', initial:true, required:true
  },
  tipologia:{ type: Types.Select, options: 'Funzionale, Vincolo, Qualità, Prestazionale', label: 'Tipologia del requisito',
   initial:true, required:true },
  numero:{ type: Types.Text, unique: true, initial:true, required:true, note: 'codice numerico del requisito'},
  codice:{type: Types.Text, watch:true, value: getCodice, initial:false },
  stato:{type: Types.Select, options: 'Passato, NonTestato , Fallito',
    label:'Esito del test', initial:true, required:true
  },
  descrizione:{type: Types.Textarea, required:true, initial:true},
  requisiti:{type: Types.Relationship, ref:'requisiti', many:true, initial:true, label:'Requisiti che vengono testati'}
});
TestSistema.relationship({ path: 'codice', ref: 'requisiti', refPath: 'requisiti' });

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
  codice='TS'+prioritaNum+tipologia+this.numero;
  return codice;
}
TestSistema.register();
