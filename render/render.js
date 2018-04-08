function Render(gl)
{
	this.gl = gl;
	
	this.shaderProgram = new ShaderProgram(this.gl, vsSource, fsSource);
	
	this.init = function()
	{
		this.shaderProgram.create();
		this.shaderProgram.addAttribute("aVertexPosition");
		this.shaderProgram.addAttribute("aVertexColor");
		
		this.shaderProgram.addUniform("uProjectionMatrix");
		this.shaderProgram.addUniform("uModelViewMatrix");
		this.shaderProgram.addUniform("uModelViewMatrix");
	}
	
	this.draw = function()
	{
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	}
	
	this.tick = function()
	{
	}
}

