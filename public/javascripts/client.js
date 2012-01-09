var socket = io.connect();
socket.on('connect',function(){
	socket.on('a', function(data){
		console.log("setsuzoku");
		$('#count').text(data);
	});
	socket.on('msg', function(msg){
		$('#chat').append('<p>' + escape(msg.name) + ':' + escape(msg.text) + '</p><hr />');
		$('#chat').children('p:last').hide().fadeIn(5000);
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


