(function($){
	/*$("#rooms").delegate("button","click",function(){
		alert();
	});
*/
	var joinRoom = function(data, textStatus, jqXHR){
		consol.dir(data);
	};
	
	var createRoom = function(data, textStatus, jqXHR){
		if(data /*&& data.success===true*/){
			//console.dir(data.room);
			$('#rooms').prepend(data);
			//
		}
	};

	$(function(){
		$('#rooms').on('click',"button",function(event){
			var btn = event.target;
			var room = $(btn).data('room');
			alert(room);
			$.ajax({
				url:'/room/join/'+room
			}).done(joinRoom).fail(function(){
				alert('加入房间失败！');
			});
		});
		$('#btn-new-room').click(function(){
			var room = $('#ipt-new-room').val();
			$.ajax({
				url:'/room/new/'+room,
				type:'put'
			}).done(createRoom).fail(function(){
				alert('创建房间失败！');
			});	
		});
		var socket = io.connect();
	});

})(jQuery);