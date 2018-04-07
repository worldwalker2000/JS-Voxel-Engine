function Render(gl)
{
	this.gl = gl;
	
	this.draw = function()
	{
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	}
	
	this.tick = function()
	{
	}
}

