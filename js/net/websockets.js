if ('WebSocket' in window){
    /* WebSocket is supported. You can proceed with your code*/
    var connection = new WebSocket('ws://sleepermud.net:2067');
    connection.onmessage = function(e){
	var server_message = e.data;
	//	console.log('got: ' + server_message);
	var msg = document.createElement('div');

	msg.innerHTML = "&lt;annon&gt; " + server_message;
	msg.style.wordBreak = 'break-all';
	msg.style.width = '100%';

	
	var fb = document.getElementById("fillbox");
	fb.appendChild(msg);

	fb.scrollTop = fb.scrollHeight;
    }
    
    connection.onerror = function(error){
	console.log('Error detected: ' + error);
    }
    
    var pinger = function() {
    	var message = "ping";
	connection.send(message);
//	setTimeout(pinger, 1000);
	console.log('pinged server!');
    } 

    connection.onopen = function(){
	/*Send a small message to the console once the connection is established */
	console.log('Connection open!');
	pinger();

    }
    connection.onclose = function(){
	console.log('Connection closed');
    }


    
} else {
    /*WebSockets are not supported. Try a fallback method like long-polling etc*/
    alert('Websockets are not supported by your browser, you cannot procced');
}

