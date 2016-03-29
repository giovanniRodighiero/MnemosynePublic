var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Fonti = new keystone.List('fonti',{
  label : 'Fonti',
  map: { name: 'nome' },
  track: true
});

Fonti.add({
  nome: {type: Types.Text, required: true, initial:true, note: 'Nome utilizzato nel tracciamento'},
  descrizione: {type: Types.Textarea, initial:true}
});

Fonti.register();
