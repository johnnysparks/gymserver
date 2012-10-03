var ContactView = Backbone.View.extend({

  //el: $('#main'),

	initialize: function(){
		this.$el = $('#main');
	},

  events: {
    "submit form.contact" : "registerContactInfo",
  },

	render: function(){},

  registerContactInfo: function(e) {
		e.preventDefault();
		alert("button clicked");
		// send request data
  }

});
