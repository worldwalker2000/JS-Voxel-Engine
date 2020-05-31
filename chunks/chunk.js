const CHUNK_WIDTH = 1;
const CHUNK_DEPTH = 1;
const CHUNK_HEIGHT = 1;
const CHUNK_ARRAY_SIZE = CHUNK_WIDTH * CHUNK_DEPTH * CHUNK_HEIGHT;

function Chunk(x, z)
{
    this.x = x;
    this.z = z;
    this.blocks = [];
    this.aabbs = [];

    this.init = function()
    {
        //for(let i = 0; i < CHUNK_ARRAY_SIZE; i++)
        //    this.blocks[i] = Math.random() < 0.5;
        for(let x = 0; x < CHUNK_WIDTH; x++)
            for(let z = 0; z < CHUNK_DEPTH; z++)
                for(let y = 0; y < CHUNK_HEIGHT; y++)
                {
                    this.blocks[x + CHUNK_WIDTH * (y + CHUNK_HEIGHT * z)] = Math.random() < 0.5;
                    this.aabbs[x + CHUNK_WIDTH * (y + CHUNK_HEIGHT * z)] = new Aabb(x, z, y, 1, 1, 1);
                }

    }

    this.setBlock = function(x, y, z, value)
    {
        this.blocks[x + CHUNK_WIDTH * (y + CHUNK_HEIGHT * z)] = value;
    }

    this.getBlock = function(x, y, z)
    {
        if(x >= CHUNK_WIDTH || x < 0) return false;
        if(y >= CHUNK_HEIGHT || y < 0) return false;
        if(z >= CHUNK_DEPTH || z < 0) return false;

        return this.blocks[x + CHUNK_WIDTH * (y + CHUNK_HEIGHT * z)];
    }

    this.moveFace = function(face, pos)
    {
        let newFace = face.slice();

        for(let i = 0; i < 12; i+=3)
        {
            newFace[i + 0] = face[i + 0] + (pos[0] * BLOCK_SIZE) + (this.x * CHUNK_WIDTH * BLOCK_SIZE);
            newFace[i + 1] = face[i + 1] + pos[1] * BLOCK_SIZE;
            newFace[i + 2] = face[i + 2] + (pos[2] * BLOCK_SIZE) + (this.z * CHUNK_DEPTH * BLOCK_SIZE);
        }

        return newFace;
    }

    this.buildMesh = function()
    {
        let verts = [];
        let texcords = [];
        let indexs = [];

        let index = 0;
        for(let x = 0; x < CHUNK_WIDTH; x++)
            for(let z = 0; z < CHUNK_DEPTH; z++)
                for(let y = 0; y < CHUNK_HEIGHT; y++)
                {
                    let n = 4;
                    
                    if(!this.getBlock(x, y, z)) continue;

                    if(!this.getBlock(x, y, z+1))
                    {
                        verts = verts.concat(this.moveFace(frontFace, [x, y, z]));
                        texcords = texcords.concat([0, 0, 1, 0, 1, 1, 0, 1]);
                        indexs = indexs.concat([index + 0, index + 1, index + 2, index + 2, index + 3, index + 0]);
                        index += n;
                    }

                    if(!this.getBlock(x, y, z-1))
                    {
                        verts = verts.concat(this.moveFace(backFace, [x, y, z]));
                        texcords = texcords.concat([0, 0, 1, 0, 1, 1, 0, 1]);
                        indexs = indexs.concat([index + 0, index + 1, index + 2, index + 2, index + 3, index + 0]);
                        index += n;
                    }

                    if(!this.getBlock(x-1, y, z))
                    {
                        verts = verts.concat(this.moveFace(leftFace, [x, y, z]));
                        texcords = texcords.concat([0, 0, 1, 0, 1, 1, 0, 1]);
                        indexs = indexs.concat([index + 0, index + 1, index + 2, index + 2, index + 3, index + 0]);
                        index += n;
                    }

                    if(!this.getBlock(x+1, y, z))
                    {
                        verts = verts.concat(this.moveFace(rightFace, [x, y, z]));
                        texcords = texcords.concat([0, 0, 1, 0, 1, 1, 0, 1]);
                        indexs = indexs.concat([index + 0, index + 1, index + 2, index + 2, index + 3, index + 0]);
                        index += n;
                    }

                    if(!this.getBlock(x, y+1, z))
                    {
                        verts = verts.concat(this.moveFace(topFace, [x, y, z]));
                        texcords = texcords.concat([0, 0, 1, 0, 1, 1, 0, 1]);
                        indexs = indexs.concat([index + 0, index + 1, index + 2, index + 2, index + 3, index + 0]);
                        index += n;
                    }

                    if(!this.getBlock(x, y-1, z))
                    {
                        verts = verts.concat(this.moveFace(bottomFace, [x, y, z]));
                        texcords = texcords.concat([0, 0, 1, 0, 1, 1, 0, 1]);
                        indexs = indexs.concat([index + 0, index + 1, index + 2, index + 2, index + 3, index + 0]);
                        index += n;
                    }
                }

        console.log("Verts: " + verts.length);
        console.log("Texcords: " + texcords.length);
        console.log("Indexs: " + indexs.length);
        console.log("Faces: " + (index/4));
        return [verts, texcords, indexs];
    }
}