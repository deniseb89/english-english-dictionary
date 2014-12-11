var Word = Backbone.Model.extend({});

var WordList = Backbone.Collection.extend({
  initialize: function(word){
      url: "http://english-english-api.herokuapp.com/api/words/" + word,
      method: 'get',
      success: function(data) {
        for(var i=0; i<data.length; i++) {
          this.add(data[i]);
        }
        console.log(data);
      }.bind(this)
    });
  },
  model: Word
});

var WordView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($("#word-template").html()),
  render: function() {
    this.$el.html(this.template(this.model)); //the li
    return this;
    console.log('rendering wordview...');
  }
});

var WordListView = Backbone.View.extend({
  className: 'words',
  initialize: function() {
    this.listenTo(this.collection, "add", this.render);
  },
  render: function() {
    this.$el.empty(); // the ul
    var that = this;
    this.collection.each(function(word) {
      var view = new WordView({model: word});
      that.$el.append(view.render().$el);
    });
    console.log('rendering wordlistview...');
  },
  // events: {
  //   'submit': 'onSubmit'
  // },
  // onSubmit: function(e) {
  //   e.preventDefault();
  //   debugger;
  //   word.find({word: this.$("#word").val()
  //   wordListView = new WordListView({
  //   collection: wordList,
  //   el: "#words"
  // });
  //   });
  // }
});

// function getParams() {
//   return $("#word").val()
// }

$(function() {
  // wordList = new WordList();
  // wordList.fetch({reset: true});
  // wordListView = new WordListView({
  //   collection: wordList,
  //   el: $('#words')
  // });
  $('#form1').on('submit', function(e) {
    e.preventDefault();
    var word = $("#word").val();
    wordList = new WordList(word);
  })
});
