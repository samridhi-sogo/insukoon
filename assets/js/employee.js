$('.responsive-tabs i.fa').click(function() {
  $(this).parent().toggleClass('open');
});

$('.responsive-tabs > li a').click(function() {
  $('.responsive-tabs > li').removeClass('active');
  $(this).parent().addClass('active');
  $('.responsive-tabs').toggleClass('open');
});

$(document).ready(function() {
	if($(document).width()<768){
		$('.responsive-tabs > li').get(0).classList.add('active');
	}
});