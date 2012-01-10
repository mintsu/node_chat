var socket = io.connect();
socket.on('connect',function(){
	socket.on('count', function(data){
		$('#count').text(data);
	});
	socket.on('msg', function(msg){
		$('#chat').prepend('<p>' + escape(msg.name) + ':' + escape(msg.text) + '</p><hr />');
		$('#chat').children('p:first').hide().fadeIn(5000);
	});
});

function send()
{
	var name = $('#name').val();
	var text = $('#text').val();
	if(text && name){
		socket.emit('msg', {name: name, text: text});
		$('#text').val('');
	}
}

function escape(str){
	return $('<div></div>').text(str).html();
}


