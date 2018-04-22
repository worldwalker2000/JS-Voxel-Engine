function Mesh(gl, vaoext, verts, texcords, indexs)
{
	this.gl = gl;
	this.vaoext = vaoext;
	this.verts = verts;
	this.texcords = texcords;
	this.indexs = indexs;
	
	this.vertexBuffer = null;
	this.textureCordsBuffer = null;
	this.indexBuffer = null;
	
	this.vao = null;
	
	this.create = function(shaderProgram)
	{
		this.vao = this.vaoext.createVertexArrayOES();
		this.vaoext.bindVertexArrayOES(this.vao);
		if(!this.vaoext.isVertexArrayOES(this.vao)) alert("Error making vao");

		this.vertexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER,
				new Float32Array(this.verts),
				this.gl.STATIC_DRAW);
		this.gl.enableVertexAttribArray(shaderProgram.attributeLocations.get("aVertexPosition"));
		this.gl.vertexAttribPointer(shaderProgram.attributeLocations.get("aVertexPosition"), 3, this.gl.FLOAT, false, 0, 0);

		this.textureCordsBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureCordsBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER,
				new Float32Array(this.texcords),
				this.gl.STATIC_DRAW);
		this.gl.enableVertexAttribArray(shaderProgram.attributeLocations.get("aTextureCorrds"));
		this.gl.vertexAttribPointer(shaderProgram.attributeLocations.get("aTextureCorrds"), 2, this.gl.FLOAT, false, 0, 0);

		this.indexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Float32Array(this.indexs), this.gl.STATIC_DRAW);
	}
}