(function($){
	var loginFail = function(data){
		$('#error').text(data.msg);
	};

	var loginDone = function(data){
		console.dir(data);
		if(data && data.success){
			location.href='/';
		}else{
			$('#error').text(data.msg);
		}
	};

	$(function(){
		$('#btn-login').click(function(){

			var data = $('#frm-login').serializeArray();
			$.ajax({
				url:'/login',
				data: data,
				type:'post'
			})
			.done(loginDone)
			.fail(loginFail);
			return false;	
		});
		
	});

})(jQuery);