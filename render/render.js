function Render(gl, vaoext)
{
	this.gl = gl;
	this.vaoext = vaoext;
	
	this.shaderProgram = new ShaderProgram(this.gl, vsSource, fsSource);
	
	this.testMesh = new Mesh(this.gl, this.vaoext);
	this.chunk = new Chunk(0, 0);

	this.tickCount = 0;

	this.init = function()
	{
		this.shaderProgram.create();
		this.shaderProgram.addAttribute("aVertexPosition");
		this.shaderProgram.addAttribute("aTextureCorrds");
		
		this.shaderProgram.addUniform("uProjectionMatrix");
		this.shaderProgram.addUniform("uModelViewMatrix");
		
		//this.testMesh.add([0.0, 0.5, 0.0, 0.5, -0.5, 0.0, -0.5, -0.5, 0.0,], [0, 0, 1, 0, 0, 1,], [0, 1, 2]);
		this.chunk.init();
		this.testMesh.add(...this.chunk.buildMesh());
		this.testMesh.create(this.shaderProgram);
	}

	this.rotX = 0;
	this.rotY = 0;
	this.rotZ = 0;
	this.rot = false;
	
	this.draw = function()
	{
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		
		this.gl.useProgram(this.shaderProgram.shaderProgram);
		
		this.vaoext.bindVertexArrayOES(this.testMesh.vao);
		
		let fieldOfView = 90 * Math.PI / 180;
		let aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
		let zNear = 0.1;
		let zFar = 100.0;
		let projectionMatrix = glMatrix.mat4.create();

		glMatrix.mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

		let modelViewMatrix = glMatrix.mat4.create();

		glMatrix.mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -10.0]);

		glMatrix.mat4.rotate(modelViewMatrix, modelViewMatrix, this.rotX * Math.PI / 180, [1.0, 0.0, 0.0]);
		glMatrix.mat4.rotate(modelViewMatrix, modelViewMatrix, this.rotY * Math.PI / 180, [0.0, 1.0, 0.0]);
		glMatrix.mat4.rotate(modelViewMatrix, modelViewMatrix, this.rotZ * Math.PI / 180, [0.0, 0.0, 1.0]);
		
		if(this.rot)
		{
			this.rotX += 1;
			this.rotY+= 1;
			this.rotZ += 1;
		}

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

