/*
var gp = {};

gp.init = function(){
  $('form.login-form').on('submit', function(e){
    alert('submitting');
    e.preventDefault();
    var credentials = {
      user:     $(this).find("input[name='username']").val(),
      password: $(this).find("input[name='password']").val()
    };
    $.ajax({
      type: 'post',
      data: credentials,
      url: '/login',
      success: function(o){ alert("logged in!");        },
      error:   function(o){ alert("unable to log in!"); }
    });
  });
  this.bindNav();
}


gp.bindNav = function(){
  $('a[href="faq"]'    ).on('click', function(e){ e.preventDefault(); $('#main').load('faq');     return false; });
  $('a[href="contact"]').on('click', function(e){ e.preventDefault(); $('#main').load('contact'); return false; });
}

$(function(){ gp.init(); });
*/
