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
		//this.model.set({
		
		
  }

});
