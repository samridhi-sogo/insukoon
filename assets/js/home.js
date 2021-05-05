/**
* Author: Samridhi Jain
*/

function showTestimonialText(obj)
{
	var img = document.getElementById(obj);
	var desc = document.getElementById("testimonial-text");
	desc.innerHTML = img.alt;
}

function incrementAndShowVisitNumber() {
  var visitor = document.getElementById("visit-counter");
  var value = getCookie("visitcounter") || 0;
  var newValue = ("00000" + (Number(value) + 1)).slice(-6);
  var container = document.getElementById("counterVisitor");
  var counter=parseInt(value)+1;
  setCookie("visitcounter", counter,90);
  //visitor.innerHTML=counter;
}
incrementAndShowVisitNumber();
String.prototype.pad = function(String, len) { 
                var str = this; 
                while (str.length < len) 
                    str = String + str; 
                return str; 
            }
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

!(function($) {
  "use strict";
function counterDisplay(){
	var visitor = document.getElementById("visitor-counter");
	 $.ajax({
      type: "GET",
      url: "forms/visitCount.php",
      data: "{type: 'Visitor'}",
	  dataType: "jsonp",
      timeout: 40000
    }).done( function(data){
		visitor.innerHTML=data.responseText;
	}).fail(function(data){
		visitor.innerHTML=data.responseText;
	});
}

	function showOnlineVisitors() {
	var url = "https://api.clicky.com/api/stats/4?site_id=101302623&sitekey=1dbd02db7f88b504&type=visitors,actions&date=last-30-days&daily=1&output=json";
	var onlinevisitors=document.getElementById("online-counter");
	var total30day=document.getElementById("week-counter");
	fetch(url)
		.then(res => res.text())
		.then((responseText) => {
			var obj = JSON.parse(responseText);
			//console.log(obj);
			var visitor30day=0;
			var visitors = obj.find(function(type){return type.type=="visitors";});
			var today= new Date();
			var month=today.getMonth()+1;
			var online=visitors.dates.find(function(dates){return dates.date==(today.getFullYear()+"-"+month.toString().pad("0",2)+"-"+today.getDate());});
			// console.log(online.items[0].value);
			//onlinevisitors.innerHTML=online.items[0].value
			visitors.dates.forEach(function(value){visitor30day= visitor30day+parseInt(value.items[0].value);});
			// console.log(visitor30day);
			//total30day.innerHTML=visitor30day;
	});
}

$(document).ready(function() {
    counterDisplay();
	showOnlineVisitors() ;
	getNewCaptcha();
	getNewCollaborateCaptcha();
    console.log('init:' + rightCode);
    });

  $(".social-container-button").hover(function() {
    $(".long-text").addClass("show-long-text");
}, function () {
    $(".long-text").removeClass("show-long-text");
});

$('.collaborate-banner-close').click(function () {
  $('.collaborate-banner').addClass('out');
});

function addLeft() {
    $('#faq-modal').modal('show');
		// <!-- jQuery('#faq-input-yes').prop("disabled", true); -->
		// <!-- jQuery('#faq-input-no').prop("disabled", true); -->
		document.getElementById("size-two").innerHTML="";
		document.getElementById("option-two").innerHTML="";
		document.getElementById("voting-box").style.gridTemplateColumns=  100 + "% " + 0 + "%";
}

function addRight() {
  //  $('#faq-modal').modal('show');
		// <!-- jQuery('#faq-input-yes').prop("disabled", true); -->
		// <!-- jQuery('#faq-input-no').prop("disabled", true); -->
		document.getElementById("size-one").innerHTML="";
		document.getElementById("option-one").innerHTML="";
		document.getElementById("voting-box").style.gridTemplateColumns=  0 + "% " + 100 + "%";
}

$('.login-reg-panel input[type="radio"]').on('change', function() {
    if($('#log-login-show').is(':checked')) {
        $('.register-info-box').fadeOut(); 
        $('.login-info-box').fadeIn();
        
        $('.white-panel').addClass('right-log');
        $('.register-show').addClass('show-log-panel');
        $('.login-show').removeClass('show-log-panel');
        
    }
    else if($('#log-reg-show').is(':checked')) {
        $('.register-info-box').fadeIn();
        $('.login-info-box').fadeOut();
        
        $('.white-panel').removeClass('right-log');
        
        $('.login-show').addClass('show-log-panel');
        $('.register-show').removeClass('show-log-panel');
    }
	else {
		  document.getElementById('log-login-show').checked=false;
		  document.getElementById('log-reg-show').checked=true;
        $('.register-info-box').fadeIn();
        $('.login-info-box').fadeOut();
        
        $('.white-panel').removeClass('right-log');
        
        $('.login-show').addClass('show-log-panel');
        $('.register-show').removeClass('show-log-panel');
    }
});

$('.trigger-registration').click(function () {
  $('.register-info-box').fadeOut();
  $('.login-show').addClass('show-log-panel');
  $('.page-login-collaborate').css('clip-path', 'polygon(0 100%, 100% 100%, 100% 0%, 0 0%)');
  $("#login-form").addClass('down');
  $('.collaborate-banner').addClass('out');
  document.getElementById('log-login-show').checked=true;
  document.getElementById('log-reg-show').checked=false;
  $('.login-reg-panel input[type="radio"]').trigger('change');
  $('.page-login-collaborate').css('opacity', '1');
});

function schoolLogin() {
  var page = document.getElementById("page-login-collaborate");
  $('.login-info-box').fadeOut();
  $('.login-show').addClass('show-log-panel');
  if($('#page-login-collaborate').find('#breadcrumbs').length==0){
	page.innerHTML='<section id="breadcrumbs" class="breadcrumbs"><div class="container"><div class="d-flex justify-content-between align-items-center"><h2>School Dashboard</h2><ol><li><a href="index.html">Home</a></li><li>School Dashboard</li></ol></div></div></section>' + page.innerHTML;
  }
  $('.page-login-collaborate').css('clip-path', 'polygon(0 100%, 100% 100%, 100% 0%, 0 0%)');
  $("#login-form").removeClass('down');
  $('.collaborate-banner').addClass('out');
  document.getElementById('log-login-show').checked=false;
  document.getElementById('log-reg-show').checked=true;
  $('.login-reg-panel input[type="radio"]').trigger('change');
  if(page.style.opacity==0){
    $('.page-login-collaborate').css('opacity', '1');
  }
}

$('form.mail-list').submit(function(e) {
    e.preventDefault();
    
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // run all inputs
     
      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validate').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validate').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;

    var this_form = $(this);
    var action = $(this).attr('action');

    if( ! action ) {
      this_form.find('.loading').slideUp();
      this_form.find('.error-message').slideDown().html('The form action property is not set!');
      return false;
    }
    
    this_form.find('.sent-message').slideUp();
    this_form.find('.error-message').slideUp();
    this_form.find('.loading').slideDown();

    
    email_list_submit(this_form,action,this_form.serialize());

    
    return true;
  });

  function email_list_submit(this_form, action, data) {
    $.ajax({
      type: "POST",
      url: action,
      data: data,
      timeout: 40000
    }).done( function(msg){
      if (msg.trim() == 'OK') {
        this_form.find('.loading').slideUp();
        this_form.find('.sent-message').slideDown();
        this_form.find("input:not(input[type=submit]), textarea").val('');
      } else {
        this_form.find('.loading').slideUp();
		this_form.find('.form-group').collapse();
        if(!msg) {
          msg = 'Form submission failed and no error message returned from: ' + action + '<br>';
        }
        this_form.find('.error-message').slideDown().html(msg);
      }
	  setTimeout(function(){ $('#faq-modal').modal('hide'); }, 1000);
    }).fail( function(data){
      console.log(data);
      var error_msg = "Form submission failed!<br>";
      if(data.statusText || data.status) {
        error_msg += 'Status:';
        if(data.statusText) {
          error_msg += ' ' + data.statusText;
        }
        if(data.status) {
          error_msg += ' ' + data.status;
        }
        error_msg += '<br>';
      }
      if(data.responseText) {
        error_msg += data.responseText;
      }
      this_form.find('.loading').slideUp();
      this_form.find('.error-message').slideDown().html(error_msg);
    });
  }
  
  $('form.collaborate-form').submit(function(e) {
    e.preventDefault();
    
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // run all inputs
     
      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validate').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validate').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;

    var this_form = $(this);
    var action = $(this).attr('action');

    if( ! action ) {
      this_form.find('.loading').slideUp();
      this_form.find('.error-message').slideDown().html('The form action property is not set!');
      return false;
    }
    
    this_form.find('.sent-message').slideUp();
    this_form.find('.error-message').slideUp();
    this_form.find('.loading').slideDown();

    
    collaborate_submit(this_form,action,this_form.serialize());

    
    return true;
  });

  function collaborate_submit(this_form, action, data) {
    $.ajax({
      type: "POST",
      url: action,
      data: data,
      timeout: 40000
    }).done( function(msg){
      if (msg.trim() == 'OK') {
        this_form.find('.loading').slideUp();
        this_form.find('.sent-message').slideDown();
		this_form.find('.btn-collaborate').slideUp();
        this_form.find("input:not(input[type=submit]), textarea").val('');
      } else {
        this_form.find('.loading').slideUp();
		this_form.find('.form-group').collapse();
        if(!msg) {
          msg = 'Form submission failed and no error message returned from: ' + action + '<br>';
        }
        this_form.find('.error-message').slideDown().html(msg);
		this_form.find('.btn-collaborate').slideUp();
      }
	  setTimeout(function(){ $('#faq-modal').modal('hide'); }, 1000);
    }).fail( function(data){
      console.log(data);
      var error_msg = "Form submission failed!<br>";
      if(data.statusText || data.status) {
        error_msg += 'Status:';
        if(data.statusText) {
          error_msg += ' ' + data.statusText;
        }
        if(data.status) {
          error_msg += ' ' + data.status;
        }
        error_msg += '<br>';
      }
      if(data.responseText) {
        error_msg += data.responseText;
      }
      this_form.find('.loading').slideUp();
      this_form.find('.error-message').slideDown().html(error_msg);
	  this_form.find('.btn-collaborate').slideUp();
    });
  }
  
})(jQuery);