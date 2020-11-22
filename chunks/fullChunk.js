function FullChunk(x, z, gl, vaoext)
{
    this.chunk = new Chunk(x, z);
    this.mesh = new Mesh(gl, vaoext);

    this.gl = gl;
    this.vaoext = vaoext;

    this.create = (shaderProgram) =>
    {
        this.chunk.init();
        this.mesh.add(...this.chunk.buildMesh());
        this.mesh.create(shaderProgram);
    }

    this.render = () =>
    {
        this.vaoext.bindVertexArrayOES(this.mesh.vao);
        this.gl.drawElements(this.gl.TRIANGLES, this.mesh.indexs.length, this.gl.UNSIGNED_SHORT, 0);
    }
}