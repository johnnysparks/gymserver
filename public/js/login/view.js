var LoginView = Backbone.View.extend({
  templates: {
    "unauthed" : "",
  },

  initialize: function(){
		this.templates.unauthed = ich.login_unauth();
    $('body').append(this.render().el);
  },

  render: function(){
    console.log(this.model.get('shown'));
    if(this.model.get("shown")){
      $(this.el).empty().html( this.templates[this.model.get("state")] ).fadeIn();
    } else {
      $(this.el).fadeOut();
    }
    return this;
  },

  toggle: function(){
    this.model.set("shown", !this.model.get("shown"));
    this.render()
  }
});
