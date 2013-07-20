requirejs.config({
    paths: {
        "jquery": "../static/js/jquery-2.0.3.min.js",
        "underscore": "../static/js/underscore-min.js",
        "backbone": "../static/js/backbone-min.js",
        "bootstrap": "../static/js/bootstrap.min.js"
    },

    shim: {
        "underscore": {
            exports: "_"
        },
        "backbone": {
            "deps": ["underscore", "jquery"],
            "exports": "Backbone"
        },
        "bootstrap": {
            "deps": ["jquery"],
            "exports": "$.fn.popover"
        },
    }
});

require(['app'], function(App){
    new App()
});