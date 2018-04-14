function Mesh(gl, verts, texcords, indexs)
{
	this.gl = gl;
	this.verts = verts;
	this.texcords = texcords;
	this.indexs = indexs;
	
	this.vertexBuffer = null;
	this.textureCordsBuffer = null;
	this.indexBuffer = null;
	
	this.vao = null;
	
	this.create = function(shaderProgram)
	{
		this.vao = this.gl.createVertexArray();
		this.gl.bindVertexArray(vao);
		
		this.vertexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER,
				new Float32Array(this.verts),
				this.gl.STATIC_DRAW);
		this.gl.vertexAttribPointer(shaderProgram.attributeLocations.get("aVertexPosition"), 3, this.gl.FLOAT, false, 0, 0);
		this.gl.enableVertexAttribArray(shaderProgram.attributeLocations.get("aVertexPosition"));

		this.textureCordsBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER,
				new Float32Array(this.texcords),
				this.gl.STATIC_DRAW);
		this.gl.vertexAttribPointer(shaderProgram.attributeLocations.get("aTextureCorrds"), 2, this.gl.FLOAT, false, 0, 0);
		this.gl.enableVertexAttribArray(shaderProgram.attributeLocations.get("aTextureCorrds"));

		this.indexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, colorBuffer);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Float32Array(this.indexs), this.gl.STATIC_DRAW);
	}
}