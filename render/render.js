function Render(gl, vaoext)
{
	this.gl = gl;
	this.vaoext = vaoext;
	
	this.shaderProgram = new ShaderProgram(this.gl, vsSource, fsSource);
	
	this.testMesh = new Mesh(this.gl, this.vaoext, [0.0, 0.5, 0.0, 0.5, -0.5, 0.0, -0.5, -0.5, 0.0,], [0, 0, 0, 0, 0, 0,], [0, 1, 2]);
	
	this.init = function()
	{
		this.shaderProgram.create();
		this.shaderProgram.addAttribute("aVertexPosition");
		this.shaderProgram.addAttribute("aTextureCorrds");
		
		this.shaderProgram.addUniform("uProjectionMatrix");
		this.shaderProgram.addUniform("uModelViewMatrix");
		this.shaderProgram.addUniform("uModelViewMatrix");
		
		this.testMesh.create(this.shaderProgram);
	}
	
	this.draw = function()
	{
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		
		this.gl.useProgram(this.shaderProgram.shaderProgram);
		
		this.vaoext.bindVertexArrayOES(this.testMesh.vao);
		
		const fieldOfView = 45 * Math.PI / 180;
		const aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
		const zNear = 0.1;
		const zFar = 100.0;
		const projectionMatrix = mat4.create();


		mat4.perspective(projectionMatrix,
						fieldOfView,
						aspect,
						zNear,
						zFar);

		const modelViewMatrix = mat4.create();

		mat4.translate(modelViewMatrix,
						modelViewMatrix,
						[-0.0, 0.0, -6.0]);
						
		gl.uniformMatrix4fv(this.shaderProgram.uniformLocations.get("uProjectionMatrix"), false, projectionMatrix);
		gl.uniformMatrix4fv(this.shaderProgram.uniformLocations.get("uModelViewMatrix"), false, modelViewMatrix);
		
		gl.drawElements(gl.TRIANGLES, this.testMesh.indexs.length, gl.UNSIGNED_SHORT, 0);
	}
	
	this.tick = function()
	{
	}
}

