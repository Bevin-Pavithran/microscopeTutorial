Template.postEdit.events({
  'submit form': function(e){
    e.preventDefault();

    var currentPostId = this._id;

    var postProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val(),
      _id: this._id
    };

    Meteor.call('postUpdate', postProperties, function(error, result){
      if(error)
        return throwError(error.reason);
      
      if(result.postExists)
        throwError('This link has already been posted');

      Router.go('postPage',{_id: result._id});
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm('Delete this post?')) {
      var currentPostId = this._id;  
      Posts.remove(currentPostId);
      Router.go('postsList');
    }
  }
});


//create Meteor.call. for postUpdate