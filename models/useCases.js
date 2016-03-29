var keystone = require('keystone'),
    Types = keystone.Field.Types;

    keystone.set('cloudinary config', { cloud_name: 'latexebiscotti', api_key: '258389277326829', api_secret: 'FD45mYUllCbXTdVWkM4RqpB-a1U' });

    // optional, will prefix all built-in tags with 'keystone_'
    keystone.set('cloudinary prefix', 'Mnemosyne');

    // optional, will prefix each image public_id with [{prefix}]/{list.path}/{field.path}/
    keystone.set('cloudinary folders', true);

    // optional, will force cloudinary to serve images over https
    keystone.set('cloudinary secure', true);

var UseCases = new keystone.List('useCases',{
  label : 'Use Cases',
  map: { name: 'codice' },
  track: true
});

UseCases.add({
    codice : { type: Types.Text, required: true, label: "UC", initial: true, note: 'basta il codice numerico.' },
    nome : { type: Types.Text, required: true , initial: true},
    azione: {type: Types.Text, initial:true, note: 'verrà visualizzato come spiegazione dello use case nel flusso principale e estensione.'},
    attoriPrimari: { type: Types.Relationship, ref: 'actor', many: true, initial: true},
    attoriSecondari: { type: Types.Relationship, ref: 'actor', many: true, initial: true },
    descrizione : { type: Types.Textarea, required: true, label: 'Scopo e Descrizione', initial: true},
    precondizione : { type: Types.Textarea , initial: true},
    postcondizione : { type: Types.Textarea , initial: true},
    flussoPrincipale: { type: Types.Relationship, ref: 'useCases', many: true, initial: true, note: 'Si numerano da soli, vanno messi in ordine corretto, niente ; o . alla fine sono generati da soli.'},
    estensioneUseCase: {type: Types.Relationship, ref: 'useCases', many: true, initial: true},
    estensioneTesto: {type: Types.Text, initial: true},
    diagramma: { type: Types.CloudinaryImage, autoCleanup : true, select : true, selectPrefix: 'Mnemosyne' }
});
UseCases.relationship({ path: 'codice', ref: 'useCases', refPath: 'flussoPrincipale' });
UseCases.relationship({ path: 'codice', ref: 'useCases', refPath: 'estensioneUseCase' });
UseCases.defaultColumns = 'codice|15%, nome|30%, azione|50%';

UseCases.register();
