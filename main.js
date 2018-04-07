var canvas;
var gl;

var refreshRate = 30;

var render;

function tick()
{
	render.tick();
}

function draw()
{
	render.draw();
}

window.onload = function()
{
	canvas = document.getElementById("glCanvas");
	gl = canvas.getContext("webgl");
	
	if(!gl)
	{
		alert("Unable to initialize WebGL. Your browser or machine may not support it.");
		return;
	}
	
	gl.clearColor(100/255, 149/255, 237/255, 1.0);
	gl.clearDepth(1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	
	render = new Render(gl);
	
	setInterval(tick, 1000/refreshRate);
	setInterval(draw, 1000/refreshRate);
}

