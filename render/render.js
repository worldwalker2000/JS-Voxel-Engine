function Render(gl, vaoext)
{
	this.gl = gl;
	this.vaoext = vaoext;
	
	this.shaderProgram = new ShaderProgram(this.gl, vsSource, fsSource);
	
	this.testMesh = new Mesh(this.gl, this.vaoext, [0.0, 0.5, 0.0, 0.5, -0.5, 0.0, -0.5, -0.5, 0.0,], [0, 0, 0, 0, 0, 0,], [0, 1, 2]);
	
	this.tickCount = 0;

	this.init = function()
	{
		this.shaderProgram.create();
		this.shaderProgram.addAttribute("aVertexPosition");
		this.shaderProgram.addAttribute("aTextureCorrds");
		
		this.shaderProgram.addUniform("uProjectionMatrix");
		this.shaderProgram.addUniform("uModelViewMatrix");
		
		this.testMesh.create(this.shaderProgram);
	}
	
	this.draw = function()
	{
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		
		this.gl.useProgram(this.shaderProgram.shaderProgram);
		
		this.vaoext.bindVertexArrayOES(this.testMesh.vao);
		
		var fieldOfView = 90 * Math.PI / 180;
		var aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
		var zNear = 0.1;
		var zFar = 100.0;
		var projectionMatrix = mat4.create();


		mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

		var modelViewMatrix = mat4.create();

		mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -5.0]);
		
		this.gl.uniformMatrix4fv(this.shaderProgram.uniformLocations.get("uProjectionMatrix"), false, projectionMatrix);
		this.gl.uniformMatrix4fv(this.shaderProgram.uniformLocations.get("uModelViewMatrix"), false, modelViewMatrix);
		
		this.gl.enableVertexAttribArray(this.shaderProgram.attributeLocations.get("aVertexPosition"));
		this.gl.enableVertexAttribArray(this.shaderProgram.attributeLocations.get("aTextureCorrds"));
		
		this.gl.drawElements(this.gl.TRIANGLES, this.testMesh.indexs.length, this.gl.UNSIGNED_SHORT, 0);
	}
	
	this.tick = function()
	{
		this.tickCount++;
	}
}

