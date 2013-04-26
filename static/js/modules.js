app.core.define('#messages-box', function(f){
	var $messagesBox,
		$message,
		$name,
		$text;

	return {
		init: function(){
			$messagesBox = f.$('messages-box');
			f.subscribe({
				'renderMessage': this.renderMessage
			})

		},
		destroy: function(){

		},
		renderMessage: function(data){
			//I can add more core dom helpers;
			$message = document.createElement('div');
			$name = document.createElement('span');
			
			$text = document.createTextNode(data.message);
			$name.innerHTML = data.name + ': ';

			$message.appendChild($name);
			$message.appendChild($text);
			$message.className = 'message left blue';

			$messagesBox.appendChild($message);
		}
	}
});

app.core.define('#send-box', function(f){
	var $sendBox,
		message,
		name;

	return {
		init: function(){
			$sendBox = f.$('send-box');
			f.bind($sendBox, 'keyup', this.sendMessage);
			f.subscribe({
				clearSendBox : this.clearSendBox
			})
		},
		destroy: function(){

		},
		sendMessage: function(e){
			if(e.ctrlKey === true && e.keyCode === 13){
				name = 'ttt';
				message = $sendBox.value;
				f.publish({
					type: 'sendMessage',
					data:{
						name: name,
						message: message
					}
				});
				f.publish({
					type : 'clearSendBox',
					data : ''
				})
			}
		},
		clearSendBox: function(){
			$sendBox.value = '';
		}
	}
});

app.core.define('socket', function(f){
	var socket;

	return {
		init: function(){
			socket = io.connect('http://localhost');

			socket.on('render message', this.renderMessage);
			socket.on('user connect', this.setCount); 
			socket.on('user.disconnect', this.setCount);

			f.subscribe({
				sendMessage: this.sendMessage
			});
		},
		renderMessage: function(data){
			console.log('render message data is', data);
			f.publish({
				type: 'renderMessage', 
				data: data
			});
		},
		setCount: function(data){
			f.publish({
				type: 'setCount', 
				data: data
			});
		},
		sendMessage: function(data){
			console.log('sendMessage data is', data);
			socket.emit('message', data.name, data.message);
		}
	}
});

app.core.define('user', function(f){
	var $number;

	return {
		init: function(){
			$number = f.$('number')

			f.subscribe({
				'setCount': this.setCount
			});
		},
		setCount: function(data){
			$number.innerHTML = data;
		}
	}
});

app.core.startAll();	