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
				name = f.publish({
					type: 'getUser',
					data: ''
				});

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
			socket.emit('message', data.name, data.message);
		}
	}
});

app.core.define('user', function(f){
	var $number,
		user;

	return {
		init: function(){
			var temp;
			$number = f.$('number');

			f.subscribe({
				'setCount': this.setCount,
				'setUser': this.setUser,
				'getUser': this.getUser
			});

			temp = prompt('请输入名字');
			f.publish({
				type: 'setUser',
				data: temp
			})

		},
		setCount: function(data){
			$number.innerHTML = data;
		},
		setUser: function(data){
			var animation = document.getElementsByTagName('h2')[0];
			animation.id = 'animation';
			user = data; 
		},
		getUser: function(){
			return user;
		}
	}
});


