define([
    'jquery',
    'underscore',
    'backbone',
    'jquery.bootstrap'

], function ($, _, Backbone) {

    var Definitions = Backbone.Collection.extend({


    });

    var Word = Backbone.Model.extend({

        parse: function(response){
            return {
                'word': response.word,
                'defs' : new Definitions(response.defs)
            }
        }

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
            var that = this;
            this.$el.typeahead({
                source: function(query, process) {
                    that.collection.query = query;
                    that.collection.fetch({
                        success: function(coll){
                            process(coll.pluck('word'));
                        }
                    });
                }
            })
        }
    });

    var WordListView = Backbone.View.extend({
        id: "wordlistview",
        tagName : 'ul',
        className : 'media-list',
        initialize : function() {
            _.bindAll(this, 'renderChild');
            this.listenTo(this.collection, 'sync', function(){
                this.$el.empty();
                this.render();
            });

        },

        render : function() {
            _(this.collection.models).each(this.renderChild, this);
           return this
        },

        renderChild: function(model){
            var wv = new WordView({model: model});
            this.$el.append(wv.render().el)
        }


    });

    var WordView = Backbone.View.extend({
        tagName: 'li',
        className : 'media',
        template: _.template('<div class="media-body"><h3 class="media-heading"><%=word%></h3></div>'),

        render : function(){
            this.$el.append(this.template({word: this.model.get('word')}));
            var $container = this.$('.media-body');
            _(this.model.get('defs').models).each(function(model){
                var dv = new DefView({model:model});
                $container.append(dv.render().el);
            }, this);
            return this
        }

    });

    var DefView = Backbone.View.extend({
        template: _.template('<div><p class="lead"><%=dic%></p><%=def%></div><hr>'),
        render: function() {
            this.$el.html(this.template(this.model.attributes));
            return this
        }

    });

    return Backbone.View.extend({
        el: "#dic_view",
        initialize: function(){
            this.wordsearch = new WordSearch;
            this.searchbox = new SearchBox({collection: this.wordsearch});
            this.wordlistview = new WordListView({collection: this.wordsearch});
        },
        render : function(){
            this.$el.html(this.wordlistview.render().el);
            return this
        }



    });
});
