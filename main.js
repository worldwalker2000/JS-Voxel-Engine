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
	
	var oes_vao_ext = gl.getExtension('OES_vertex_array_object');
	//var vao = oes_vao_ext.createVertexArrayOES();
	//oes_vao_ext.bindVertexArrayOES(vao);
	
	gl.clearColor(100/255, 149/255, 237/255, 1.0);
	//gl.clearDepth(1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	
	render = new Render(gl, oes_vao_ext);
	render.init();
	
	setInterval(tick, 1000/refreshRate);
	setInterval(draw, 1000/refreshRate);
}

