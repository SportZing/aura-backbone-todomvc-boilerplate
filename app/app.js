require(['bower_components/aura/lib/aura'], function(Aura) {
  Aura()
    .use('extensions/aura-awesome-extension')
    .use('extensions/aura-backbone')
    .use('extensions/aura-localstorage')
    .use('extensions/aura-handlebars')
    .use(function(app) {
      window.Todos = app.sandboxes.create();
    })
    .start({ components: 'body' }).then(function() {
      console.warn('SportZing started...');
    });
});
