var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Glossario = new keystone.List('glossario',{
  label : 'Glossario',
  map: { name: 'termine' },
  track: true,
  defaultSort: '+lettera'
});

Glossario.add({
  termine:{type: Types.Text, initial:true, required:true },
  definizione:{type: Types.Textarea, initial:true, required:true},
  lettera:{type:Types.Text, watch:true, value: getLettera}
});
function getLettera() {
  return this.termine.charAt(0);
}
Glossario.register();
