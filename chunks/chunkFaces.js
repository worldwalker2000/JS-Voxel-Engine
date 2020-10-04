// Chunk faces copied from https://github.com/Hopson97/HopsonCraft/blob/master/Source/World/Chunk/MeshBuilder.cpp and converted to JS
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
