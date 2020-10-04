function Shader(gl, src, type)
{
	this.gl = gl;
	this.src = src;
	this.type = type;
	this.shader = null;

	this.create = function ()
	{
		this.shader = this.gl.createShader(this.type);
		this.gl.shaderSource(this.shader, this.src);
		this.gl.compileShader(this.shader);

		if (!this.gl.getShaderParameter(this.shader, this.gl.COMPILE_STATUS))
		{
			alert('An error occurred compiling the shader: ' + this.gl.getShaderInfoLog(this.shader) + " : " + (this.type == this.gl.VERTEX_SHADER ? "VERTEX_SHADER" : "FRAGMENT_SHADER"));
			alert("Shader Source: " + this.src);
			this.gl.deleteShader(this.shader);
			return null;
		}
	}
}
