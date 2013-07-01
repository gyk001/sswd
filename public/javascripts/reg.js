(function($){
	var registerFail = function(data){
		$('#error').text(data.msg);
	};

	var registerDone = function(data){
		console.dir(data);
		if(data && data.success){
			location.href='/';
		}else{
			$('#error').text(data.msg);
		}
	};

	$(function(){
		$('#btn-reg').click(function(){

			var data = $('#frm-reg').serializeArray();
			$.ajax({
				url:'/user',
				data: data,
				type:'post'
			})
			.done(registerDone)
			.fail(registerFail);
			return false;	
		});
		
	});

})(jQuery);