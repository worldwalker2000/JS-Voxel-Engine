function Render(gl, vaoext)
{
	this.gl = gl;
	this.vaoext = vaoext;
	
	this.shaderProgram = new ShaderProgram(this.gl, vsSource, fsSource);
	
	this.mesh = new Mesh(this.gl, this.vaoext);
	this.chunk = new Chunk(0, 0);

	this.mesh2 = new Mesh(this.gl, this.vaoext);
	this.chunk2 = new Chunk(1, 0);

	this.player = new Player([0, 0, -10], [0, 0, 0]);

	this.tickCount = 0;

	this.init = function()
	{
		this.shaderProgram.create();
		this.shaderProgram.addAttribute("aVertexPosition");
		this.shaderProgram.addAttribute("aTextureCorrds");
		
		this.shaderProgram.addUniform("uProjectionMatrix");
		this.shaderProgram.addUniform("uModelMatrix");
		this.shaderProgram.addUniform("uViewMatrix");
		
		this.chunk.init();
		this.mesh.add(...this.chunk.buildMesh());
		this.mesh.create(this.shaderProgram);

		this.chunk2.init();
		this.mesh2.add(...this.chunk2.buildMesh());
		this.mesh2.create(this.shaderProgram);
	}

	this.rotX = 0;
	this.rotY = 0;
	this.rotZ = 0;
	this.rot = false;
	
	this.draw = function()
	{
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		
		this.gl.useProgram(this.shaderProgram.shaderProgram);
		
		let fieldOfView = 90 * Math.PI / 180;
		let aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
		let zNear = 0.1;
		let zFar = 100.0;
		let projectionMatrix = glMatrix.mat4.create();

		glMatrix.mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

		let modelMatrix = glMatrix.mat4.create();

		glMatrix.mat4.translate(modelMatrix, modelMatrix, [0.0, 0.0, 0.0]);

		glMatrix.mat4.rotate(modelMatrix, modelMatrix, this.rotX * Math.PI / 180, [1.0, 0.0, 0.0]);
		glMatrix.mat4.rotate(modelMatrix, modelMatrix, this.rotY * Math.PI / 180, [0.0, 1.0, 0.0]);
		glMatrix.mat4.rotate(modelMatrix, modelMatrix, this.rotZ * Math.PI / 180, [0.0, 0.0, 1.0]);
		
		this.gl.uniformMatrix4fv(this.shaderProgram.uniformLocations.get("uProjectionMatrix"), false, projectionMatrix);
		this.gl.uniformMatrix4fv(this.shaderProgram.uniformLocations.get("uViewMatrix"), false, this.player.getViewMatrix());
		this.gl.uniformMatrix4fv(this.shaderProgram.uniformLocations.get("uModelMatrix"), false, modelMatrix);
		
		this.gl.enableVertexAttribArray(this.shaderProgram.attributeLocations.get("aVertexPosition"));
		this.gl.enableVertexAttribArray(this.shaderProgram.attributeLocations.get("aTextureCorrds"));
		
		this.vaoext.bindVertexArrayOES(this.mesh.vao);
		this.gl.drawElements(this.gl.TRIANGLES, this.mesh.indexs.length, this.gl.UNSIGNED_SHORT, 0);

		this.vaoext.bindVertexArrayOES(this.mesh2.vao);
		this.gl.drawElements(this.gl.TRIANGLES, this.mesh2.indexs.length, this.gl.UNSIGNED_SHORT, 0);
	}
	
	this.tick = function()
	{
		this.tickCount++;

		this.player.tick();

		if(this.rot)
		{
			this.rotX += 1;
			this.rotY += 1;
			this.rotZ += 1;
		}
	}
}

