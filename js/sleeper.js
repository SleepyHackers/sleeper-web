"use strict";
/*

 Midnight Graphics & Recreation Library Demos:

 This file is the old model loader demo, and will soon be superseeded.
.

 The javascript source code demos provided with M.GRL have been
 dedicated to the by way of CC0.  More information about CC0 is
 available here: https://creativecommons.org/publicdomain/zero/1.0/
.

 Art assets used are under a Creative Commons Attribution - Share
 Alike license or similar (this is explained in detail elsewhere).
 M.GRL itself is made available to you under the LGPL.  M.GRL makes
 use of the glMatrix library, which is some variety of BSD license.
.

 Have a nice day! ^_^

*/

    // keyboard control stuff
var key_tracker = {
    "enter" : null,
    "left" : null,
    "right" : null,
    "up" : null,
    "down" : null,
    "w" : null,
    "a" : null,
    "s" : null,
    "d" : null,
};

function key_handler(state, key) {
    // arrow key handler

    if (state === "cancel") {
        if (key_tracker[key] !== null) {
            please.time.remove(key_tracker[key].handler);
            key_tracker[key] = null;
        }
    }
    else if (state === "press" && key_tracker[key] == null) {



	    
        var start_time = performance.now();
	var frequency = 5;
	
	var handler = function(timestamp) {
	    var delta = timestamp - key_tracker[key].stamp;
            key_tracker[key].stamp = timestamp;

	    // 'delta' is assumed to usually be higher than the ideal
	    // frequency, so 'late' is the amount of extra time
	    // waited.
	    var late = delta - frequency;

	    // 'scale' is the amount that distances should be adjusted by.
	    var scale = delta/frequency;

	    var amount = .05;

	    if (key == "down") {
		window.player.location_y += (amount / frequency) * delta;
	    } else if (key == "up") {
		window.player.location_y -= (amount / frequency) * delta;
	    } else if (key == "left") {
		window.player.location_x += (amount / frequency) * delta;
	    } else if (key == "right") {
		window.player.location_x -= (amount / frequency) * delta;
	    } else if ( key == "w" ) {
		window.z_offset += (amount / frequency) * delta;
	    } else if ( key == "s" ) {
		window.z_offset -= (amount / frequency) * delta;
	    } else if ( key == "a" ) {
		window.x_offset += (amount / frequency) * delta;
	    } else if ( key == "d" ) {
		window.x_offset -= (amount / frequency) * delta;
	    }
	    


	    please.time.schedule(handler, frequency - late);

	};


	please.time.schedule(handler, frequency);
	

	
        key_tracker[key] = {
	    "stamp" : start_time,
	    "handler" : handler,
	};
	
    }
};
function chat_handler(state, key) {
    // arrow key handler

    if (state === "press" && key_tracker[key] == null) {
	if (key == "enter") {

            var ci = document.getElementById('chat_input');
            
            /*if( ci.contentEditable == 'inherit' )
            {
	            console.log('initial IRAN');
            }*/
            
            if( ci.contentEditable != 'true' )
            {
	            ci.contentEditable = true;
	            ci.focus();
            }
            else
            {

	            
	            //document.getElementById("chat_input").innerHTML = '';
	            /*var m = parseInt(document.getElementById("chatbox").style.marginTop);//style.marginTop);
					console.log('m : ' + m);
				if( (m / 20 - 1) >= 0 )
				{
					document.getElementById("chatbox").style.marginTop = m - 20 + 'px';
				}*/
				
		if(document.getElementById("chat_input").innerHTML.length) connection.send(document.getElementById("chat_input").innerHTML);		
		document.getElementById("chat_input").innerHTML = '';
		
				//this.blur();
		//document.getElementById("gl_canvas").focus();


            }
            
           
            
            /*
            ci.focus();
            
            ci.onkeydown = function(e){
				console.log('IRAN');
				if( e.which == 13 )
				{
					//window.tar = this;
					//document.getElementById("chatbox")
					
					var m = parseInt(document.getElementById("chatbox").style.marginTop);
					
					if( (m / 20) >= 0 )
					{
						document.getElementById("chatbox").style.marginTop = m - 20;
					}
					
					var msg = document.createElement('div');
					//msg.style.marginTop =
					
					msg.innerHTML = document.getElementById("chatbox").innerHTML;
					document.getElementById("chatbox").innerHTML = '';
					
					document.getElementById("chatbox").appendChild(msg);
					
					//this.blur();
					document.getElementById("gl_canvas").focus();
				}
			}//*/
			
            
            
        }
	
    }
};

please.keys.connect("enter", chat_handler);
var toggleChatEdit = function() {
    var ci = document.getElementById('chat_input');
    ci.contentEditable = false;
}

addEventListener("load", function() {
    // create the rendering context
    please.gl.set_context("gl_canvas");
    
    //creating a hud object
    /*please.hud = { canvas:null, context:null };
    please.hud.canvas = document.getElementById('gl_hud');
    var hudBitmap = please.hud.context = please.hud.canvas.getContext('2d');
    
    hudBitmap.font = "Normal 40px Arial";
    hudBitmap.textAlign = 'center';
    hudBitmap.fillStyle = "rgba(245,245,245,0.75)";
    hudBitmap.fillText('Initializing...', please.hud.canvas.width / 2, please.hud.canvas.height / 2);*/

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

    // setup asset search paths
    please.set_search_path("glsl", "glsl/");
    //please.set_search_path("img", "../gl_assets/img/");
    //please.set_search_path("jta", "../gl_assets/models/");
    
    // load shader sources
    please.load("simple.vert");
    please.load("simple.frag");

    // load our model files
    //please.load("gavroche.jta");
    //please.load("floor_lamp.jta");
    
    // test model
    //please.load("graph_test.jta");

    // while not strictly necessary, the progress bar will make more
    // sense if we manually queue up textures here:
    /*please.load("uvmap.png");
    please.load("floor_lamp.png");
    please.load("mr_squeegee_feet.jta");
    please.load("anitest2.jta");*/

    show_progress();
});

function show_progress() {
    if (please.media.pending.length > 0) {
        var progress = please.media.get_progress();
        if (progress.all > -1) {
            var bar = document.getElementById("progress_bar");
            var label = document.getElementById("percent");
            bar.style.width = "" + progress.all + "%";
            label.innerHTML = "" + Math.round(progress.all) + "%";
            var files = please.get_properties(progress.files);
            var info = document.getElementById("progress_info");
            info.innerHTML = "" + files.length + " file(s)";
        }
        setTimeout(show_progress, 100);
    }
};


addEventListener("mgrl_fps", function (event) {
    document.getElementById("fps").innerHTML = event.detail;
});

addEventListener("mgrl_media_ready", function () {
    //calling the align function to bypass the overlay bug
    
    please.__align_canvas_overlay();

        // Clear loading screen, show canvas
    document.getElementById("loading_screen").style.display = "none";
    document.getElementById("demo_area").style.display = "block";

    // Create GL context, build shader pair
    var prog = please.glsl("default", "simple.vert", "simple.frag");
    prog.activate();

    // setup opengl state    
    gl.enable(gl.CULL_FACE);
    please.set_clear_color(0.0, 0.0, 0.0, 0.0);

    // enable alpha blending
    // gl.enable(gl.BLEND);
    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    
    // access model data
    /*var gav_model = please.access("gavroche.jta");
    var lamp_model = please.access("floor_lamp.jta");
    var test_model = please.access("mr_squeegee_feet.jta");
    */
    //var test_model = please.access("graph_test.jta");

    // display licensing meta_data info, where applicable
    // [gav_model, lamp_model].map(function (scene) {
    //     var target = document.getElementById("attribution_area");
    //     target.style.display = "block";
    //     var div = scene.get_license_html();
    //     if (div) {
    //         target.appendChild(div);
    //     }
    // });

    // build the scene graph
    var graph = window.graph = new please.SceneGraph();

    var player = window.player = new please.GraphNode();
    player.location = [10, 50, 4];

    var focus = window.focus = new please.GraphNode();
    
    var x_offset = window.x_offset = 0;
    var z_offset = window.z_offset = 0;
    
    focus.location = function() {
	return [window.player.location_x + window.x_offset,
	window.player.location_y-10,
	 window.player.location_z - window.z_offset];
    };

    graph.add(player);
    //graph.add(focus);
    // add a floor
    graph.add(new FloorNode());

    // add a camera
    var camera = window.camera = new please.CameraNode();
    camera.look_at = focus;

    camera.location = function () {
	return [window.player.location_x ,
		window.player.location_y ,
		window.player.location_z ];
    };



    // add the camera to the scene graph
    graph.add(camera);

    // If the camera is not explicitely activated, then the scene
    // graph will attempt to pick one to use.  In this case we have
    // only one so it doesn't matter, BUT it is generally good
    // practice to activate the camera you want to use before drawing.
    camera.activate();

    // connect keyboard handlers
    please.keys.enable();
    please.keys.connect("left", key_handler);
    please.keys.connect("right", key_handler);
    please.keys.connect("up", key_handler);
    please.keys.connect("down", key_handler);
    please.keys.connect("w", key_handler);
    please.keys.connect("a", key_handler);
    please.keys.connect("s", key_handler);
    please.keys.connect("d", key_handler);

    // set up a directional light
    var light_direction = vec3.fromValues(.25, -1.0, -.4);
    vec3.normalize(light_direction, light_direction);
    vec3.scale(light_direction, light_direction, -1);
    
    // register a render pass with the scheduler
    please.pipeline.add(1, "webworld/draw", function () {
        // -- update uniforms
        prog.vars.light_direction = light_direction;

        // -- clear the screen
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
        // -- draw geometry
        graph.draw();
    });
    please.pipeline.start();
});


var FloorNode = function () {
    console.assert(this !== window);
    please.GraphNode.call(this);

    this.__vbo = please.gl.make_quad(1000, 1000);
    this.__drawable = true;
    this.shader.mode = 1; // "floor mode"

    this.bind = function () {
        this.__vbo.bind();
    };
    this.draw = function () {
        this.__vbo.draw();
    };
};
FloorNode.prototype = please.GraphNode.prototype;
