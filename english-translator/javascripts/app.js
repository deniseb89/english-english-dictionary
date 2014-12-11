var Word = Backbone.Model.extend({});

var WordList = Backbone.Collection.extend({
  initialize: function(word) {
      this.url = "http://english-english-api.herokuapp.com/api/words/" + word;
  },
  model: Word
});

var WordView = Backbone.View.extend({
  tagName: 'ul',
  template: function(){
    return _.template($("#word-template").html())
  },
  render: function() {
    debugger;
    this.$el.html(this.template({model: this.model.toJSON()})); //the li
    return this;
  }
});

var WordListView = Backbone.View.extend({
  el: '#words',
  initialize: function() {
    this.listenTo(this.collection, "change", this.render);
  },
  render: function() {
    this.$el.empty(); // the ul
    var that = this;
    this.collection.each(function(word) {
      var view = new WordView({ model: word });
      that.$el.append(view.render().$el);
      return this;
    });
  }
});

$(function() {
  $('#form1').on('submit', function(e) {
    e.preventDefault();
    var word = $("#word").val();
    wordList = new WordList(word);
    wordList.fetch().done(function(data){
      wordListView = new WordListView({ collection: wordList });
      wordListView.render();
    });
  })
});
