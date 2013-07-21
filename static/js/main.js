requirejs.config({
    paths: {
        "jquery": "jquery-2.0.3.min",
        "underscore": "underscore-min",
        "backbone": "backbone",
        "jquery.bootstrap": "bootstrap.min"
    },

    shim: {
        "underscore": {
            exports: "_"
        },
        "backbone": {
            "deps": ["underscore", "jquery"],
            "exports": "Backbone"
        },
        "jquery.bootstrap": {
            "deps": ["jquery"]
        }
    }
});

require(['app'], function(App){
    var app = new App();
    app.render()
});