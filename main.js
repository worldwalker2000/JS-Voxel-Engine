var canvas;
var gl;

var refreshRate = 30;

function tick()
{
}

function draw()
{
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
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
	
	setInterval(tick, 1000/refreshRate);
	setInterval(draw, 1000/refreshRate);
}

