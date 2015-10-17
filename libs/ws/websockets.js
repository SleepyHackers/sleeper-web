if ('WebSocket' in window){
    /* WebSocket is supported. You can proceed with your code*/
    var connection = new WebSocket('ws://sleepermud.net:80/ws/');
    connection.onmessage = function(e){
	var server_message = e.data;
	console.log(server_message);
    }


} else {
    /*WebSockets are not supported. Try a fallback method like long-polling etc*/
    alert('Websockets are not supported by your browser, you cannot procced');
}
