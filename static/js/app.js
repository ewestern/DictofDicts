define([
    'jquery',
    'underscore',
    'backbone',
    'jquery.bootstrap'

], function ($, _, Backbone) {


    var Dictionary = Backbone.Model.extend({

    });


//    var Definitions = Backbone.Collection.extend({
//        url : '/words'
//
//    });

    var Word = Backbone.Model.extend({

    });



    var WordSearch = Backbone.Collection.extend({
        url : function(){
            return 'partial/' + (this.hasOwnProperty('query') ? this.query : '')
        },
        model : Word,
        parse : function(response){
            return response.results;
        }

    });

    var SearchBox = Backbone.View.extend({
        el :"#search",

        initialize: function(){
            this.$el.typeahead({
                source: function(query, process) {
                    this.wordsearch.query = query;
                    this.wordsearch.fetch({
                        success: function(coll, response){
                            process(coll.pluck('word'));
                        }
                    });
                }
            })
        }
    });

    var WordListView = Backbone.View.extend({
        id: "#wordlistview"



    });

    var WordView = Backbone.View.extend({


    })

    return Backbone.View.extend({
        el: "",
        initialize: function(){
            this.wordsearch = new WordSearch;
            var searchbox = new SearchBox({collection: this.wordsearch})



        }



    });
});
