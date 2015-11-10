
function build_chatbox() {
	var label = please.hud = please.overlay.new_element("text_label");
	//label.hide_when = function () { return demo.loading_screen.is_active; };
	label.innerHTML = "" +
	    //'<div style="height: 80px; border-bottom: 1px dashed rgb(0, 0, 0); margin-bottom: 5px;">Message box</div>' +
	    '<div id="fillbox" class="chat_display"></div><div id="chatbox" style="border-top: 1px dashed rgb(0, 0, 0); padding-top: 5px;"><div>$ <span id="chat_input" onblur="toggleChatEdit()"></span></div></div>';
	label.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
	label.style.fontSize = "12px";
	label.style.padding = "4px";
	label.style.borderRadius = "4px";
	label.style.left = "10px";
	label.style.bottom = "10px";
	label.style.height = "200px";
	label.style.width = "330px";
	//label.style.pointerEvents = "auto"; // restore mouse events
};
