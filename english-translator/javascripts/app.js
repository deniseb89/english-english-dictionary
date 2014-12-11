var Word = Backbone.Model.extend({});

var WordList = Backbone.Collection.extend({
  model: Word,
  url: "http://english-english-api.herokuapp.com/api/words"
});

var WordView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($("#word-template").html()),
  render: function() {
    this.$el.html(this.template({word: this.model.toJSON()}));
    return this;
  }
});

var WordListView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, "reset", this.render);
  },
  render: function() {
    this.$el.empty();
    var that = this;
    this.collection.each(function(word) {
      var view = new WordView({model: word});
      that.$el.append(view.render().$el);
    });
  },
  events: {
    'submit': 'onSubmit'
  },
  onSubmit: function(e) {
    e.preventDefault();
    word.find({word: this.$("input[word='word']").val()
    });
  }
});

function getParams() {
  return $("#word").val()
}

$(function() {
  wordList = new WordList();
  wordListView = new WordListView({
    collection: wordList,
    el: "#words"
  });
  wordList.fetch({reset: true});
});
