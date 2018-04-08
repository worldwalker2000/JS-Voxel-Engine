function Shader(gl, src, type)
{
	this.gl = gl;
	this.src = src;
	this.type = type;
	this.shader = null;
	
	this.create = function()
	{
		this.shader = this.gl.createShader(this.type);
		this.gl.shaderSource(this.shader, this.src);
		this.gl.compileShader(this.shader);
		
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
		{
			alert('An error occurred compiling the shader: ' + gl.getShaderInfoLog(shader));
			gl.deleteShader(shader);
			return null;
		}
	}
}
