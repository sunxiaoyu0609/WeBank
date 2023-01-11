$(document).ready(function(){
	$('.roww').each(function(){
		$(this).find('.progress').animate({
			width:$(this).find('.progress').attr('data-value')
		},6000).gradientify({
					gradients: eval($(this).find('.progress').attr('data-color')),
					angle:'45deg',
					fps:'300',
					transition_time:'1'
		});
		var num = $(this).find('.num').attr('data-value');
		var that = $(this);
		setTimeout(function(){setNumTimer(1,num,that)},50);
	});
});