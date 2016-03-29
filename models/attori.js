var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Attori = new keystone.List('actor',{
  label : 'Actor',
  autokey: { path: 'slug', from: 'nome', unique: true },
  map: { name: 'nome' },
  track: true
});

Attori.add({
    nome: {type: Types.Text, initial:true, required:true},
    descrizione: {type: Types.Textarea, initial:true},
    generalizza: {type: Types.Relationship, ref: 'actor', many: true, initial: true}
});
Attori.relationship({ path: 'nome', ref: 'useCases', refPath: 'attoriPrimari' });
Attori.relationship({ path: 'nome', ref: 'useCases', refPath: 'attoriSecondari' });
Attori.relationship({ path: 'nome', ref: 'actors', refPath: 'generalizza' });
Attori.register();
