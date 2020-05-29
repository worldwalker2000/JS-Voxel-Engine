const CHUNK_WIDTH = 3;
const CHUNK_DEPTH = 3;
const CHUNK_HEIGHT = 3;
const CHUNK_ARRAY_SIZE = CHUNK_WIDTH * CHUNK_DEPTH * CHUNK_HEIGHT;
const BLOCK_SIZE = 1;

const frontFace = 
[
    0,          0,          BLOCK_SIZE,
    BLOCK_SIZE, 0,          BLOCK_SIZE,
    BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE,
    0,          BLOCK_SIZE, BLOCK_SIZE
];

const backFace = 
[
    BLOCK_SIZE, 0,          0,
    0,          0,          0,
    0,          BLOCK_SIZE, 0,
    BLOCK_SIZE, BLOCK_SIZE, 0
];

const leftFace = 
[
    0, 0,           0,
    0, 0,           BLOCK_SIZE,
    0, BLOCK_SIZE,  BLOCK_SIZE,
    0, BLOCK_SIZE,  0
];

const rightFace = 
[
    BLOCK_SIZE, 0,          BLOCK_SIZE,
    BLOCK_SIZE, 0,          0,
    BLOCK_SIZE, BLOCK_SIZE, 0,
    BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE
];

const topFace = 
[
    0,          BLOCK_SIZE, BLOCK_SIZE,
    BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE,
    BLOCK_SIZE, BLOCK_SIZE, 0,
    0,          BLOCK_SIZE, 0
];

const bottomFace = 
[
    0,          0, 0,
    BLOCK_SIZE, 0, 0,
    BLOCK_SIZE, 0, BLOCK_SIZE,
    0,          0, BLOCK_SIZE
];

function Chunk(x, y)
{
    this.x = x;
    this.y = y;
    this.blocks = [CHUNK_ARRAY_SIZE];

    this.init = function()
    {
        for(let i = 0; i < CHUNK_ARRAY_SIZE; i++)
            this.blocks[i] = false;

        this.mesh = new Mesh();
    }

    this.setBlock = function(x, y, z, value)
    {
        this.blocks[x + CHUNK_WIDTH * (y + CHUNK_DEPTH * z)] = value;
    }

    this.getBlock = function(x, y, z)
    {
        if(x >= CHUNK_WIDTH || x < 0) return false;
        if(y >= CHUNK_DEPTH || y < 0) return false;
        if(z >= CHUNK_HEIGHT || z < 0) return false;

        return this.blocks[x + CHUNK_WIDTH * (y + CHUNK_DEPTH * z)];
    }

    this.moveFace = function(face, pos)
    {
        let newFace = face.slice();

        for(let i = 0; i < 4; i++)
        {
            newFace[i + 0] = face[i + 0] + pos[0];
            newFace[i + 1] = face[i + 1] + pos[1];
            newFace[i + 2] = face[i + 2] + pos[2];
        }

        return newFace;
    }

    this.buildMesh = function()
    {
        let verts = [];
        let texcords = [];
        let indexs = [];

        for(let x = 0; x < CHUNK_WIDTH; x++)
            for(let y = 0; y< CHUNK_DEPTH; y++)
                for(let z = 0; z < CHUNK_HEIGHT; z++)
                {
                    let index = x + CHUNK_WIDTH * (y + CHUNK_DEPTH * z);
                    verts = verts.concat(this.moveFace(frontFace, [x, y, z]));
                    texcords = texcords.concat([0, 0, 1, 0, 1, 1, 0, 1]);
                    indexs = indexs.concat([index + 0, index + 1, index + 2, index + 2, index + 3, index + 0]);

                    verts = verts.concat(this.moveFace(backFace, [x, y, z]));
                    texcords = texcords.concat([0, 0, 1, 0, 1, 1, 0, 1]);
                    indexs = indexs.concat([index + 0, index + 1, index + 2, index + 2, index + 3, index + 0]);

                    verts = verts.concat(this.moveFace(leftFace, [x, y, z]));
                    texcords = texcords.concat([0, 0, 1, 0, 1, 1, 0, 1]);
                    indexs = indexs.concat([index + 0, index + 1, index + 2, index + 2, index + 3, index + 0]);

                    verts = verts.concat(this.moveFace(rightFace, [x, y, z]));
                    texcords = texcords.concat([0, 0, 1, 0, 1, 1, 0, 1]);
                    indexs = indexs.concat([index + 0, index + 1, index + 2, index + 2, index + 3, index + 0]);

                    verts = verts.concat(this.moveFace(topFace, [x, y, z]));
                    texcords = texcords.concat([0, 0, 1, 0, 1, 1, 0, 1]);
                    indexs = indexs.concat([index + 0, index + 1, index + 2, index + 2, index + 3, index + 0]);

                    verts = verts.concat(this.moveFace(bottomFace, [x, y, z]));
                    texcords = texcords.concat([0, 0, 1, 0, 1, 1, 0, 1]);
                    indexs = indexs.concat([index + 0, index + 1, index + 2, index + 2, index + 3, index + 0]);
                }

        return [verts, texcords, indexs];
    }
}