let canvas;
let gl;

let refreshRate = 30;

let render;

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
	
	let oes_vao_ext = gl.getExtension('OES_vertex_array_object');
	//let vao = oes_vao_ext.createVertexArrayOES();
	//oes_vao_ext.bindVertexArrayOES(vao);
	
	gl.clearColor(100/255, 149/255, 237/255, 1.0);
	gl.clearDepth(1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	gl.enable(gl.CULL_FACE);
	gl.cullFace(gl.BACK);

	render = new Render(gl, oes_vao_ext);
	render.init();
	
	setInterval(tick, 1000/refreshRate);
	setInterval(draw, 1000/refreshRate);
}

