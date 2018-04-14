function Mesh(gl, verts, texcords, indexs)
{
	this.gl = gl;
	this.verts = verts;
	this.texcords = texcords;
	this.indexs = indexs;
	
	this.vertexBuffer = null;
	this.textureCordsBuffer = null;
	this.indexBuffer = null;
	
	this.create = function()
	{
		this.vertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER,
				new Float32Array(this.verts),
				gl.STATIC_DRAW);

		this.indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, colorBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Float32Array(this.indexs), gl.STATIC_DRAW);
	}
}