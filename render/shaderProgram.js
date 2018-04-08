function ShaderProgram(gl, vertexShaderCode, fragmentShaderCode)
{
	this.gl = gl;
	
	this.vertexShaderCode = vertexShaderCode;
	this.fragmentShaderCode = fragmentShaderCode;
	
	this.vertexShader = null;
	this.fragmentShader = null;
	
	this.shaderProgram = null;
	
	this.attributeLocations = new Map();
	this.uniformLocations = new Map();
	
	this.create = function()
	{
		this.vertexShader = new Shader(this.gl, this.vertexShaderCode, this.gl.VERTEX_SHADER);
		this.fragmentShader = new Shader(this.gl, this.fragmentShaderCode, this.gl.FRAGMENT_SHADER);
		
		this.vertexShader.create();
		this.fragmentShader.create();
		
		this.shaderProgram = this.gl.createProgram();
		this.gl.attachShader(this.shaderProgram, this.vertexShader.shader);
		this.gl.attachShader(this.shaderProgram, this.fragmentShader.shader);
		this.gl.linkProgram(this.shaderProgram);

		if (!this.gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS))
		{
			alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
			return null;
		}
	}
	
	this.addAttribute = function(name)
	{
		this.attributeLocations.set(name, this.gl.getAttribLocation(this.shaderProgram, name));
	}
	
	this.addUniform = function(name)
	{
		this.uniformLocations.set(name, this.gl.getUniformLocation(this.shaderProgram, name));
	}
}