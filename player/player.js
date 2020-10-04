let instance;

function getMousePos(canvas, evt)
{
    let rect = canvas.getBoundingClientRect();
    return [
        evt.clientX - rect.left,
        evt.clientY - rect.top
    ];
}

function onMouseMove(evt) { instance.onMouseMove(evt); }
function onMouseDown(evt) { instance.onMouseDown(evt); }
function onMouseUp(evt) { instance.onMouseUp(evt); }

function onKeyDown(evt) { instance.keys[evt.which] = true; }
function onKeyUp(evt) { instance.keys[evt.which] = false; }

function Player(pos, rot)
{
    this.pos = pos;
    this.rot = rot;

    this.aabb = new Aabb(0, 0, 0, 1, 1, 1);

    this.prev = [0, 0];

    this.keys = [];
    for (let i = 0; i < 100; i++)
        this.keys[i] = false;

    this.isMouseDown = false;

    instance = this;

    document.getElementById("glCanvas").addEventListener("mousemove", onMouseMove, false);
    document.getElementById("glCanvas").addEventListener("mousedown", onMouseDown, false);
    document.getElementById("glCanvas").addEventListener("mouseup", onMouseUp, false);

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    this.onMouseMove = function (evt)
    {
        let mousePos = getMousePos(document.getElementById("glCanvas"), evt);

        if (this.isMouseDown)
        {
            let diff = [this.prev[0] - mousePos[0], this.prev[1] - mousePos[1]];
            this.rot[1] -= diff[0] / 2;
            this.rot[0] -= diff[1] / 2;
        }

        this.prev[0] = mousePos[0];
        this.prev[1] = mousePos[1];
    }

    this.onMouseDown = function (evt)
    {
        this.isMouseDown = true;
    }

    this.onMouseUp = function (evt)
    {
        this.isMouseDown = false;
    }

    this.tick = function ()
    {
        let speed = 0.2;
        if (this.keys[87])
        {
            this.pos[0] += Math.sin(-this.rot[1] * Math.PI / 180) * speed;
            this.pos[2] += Math.cos(-this.rot[1] * Math.PI / 180) * speed;
        }
        if (this.keys[83])
        {
            this.pos[0] -= Math.sin(-this.rot[1] * Math.PI / 180) * speed;
            this.pos[2] -= Math.cos(-this.rot[1] * Math.PI / 180) * speed;
        }
        if (this.keys[65])
        {
            this.pos[0] += Math.sin((-this.rot[1] + 90) * Math.PI / 180) * speed;
            this.pos[2] += Math.cos((-this.rot[1] + 90) * Math.PI / 180) * speed;
        }
        if (this.keys[68])
        {
            this.pos[0] -= Math.sin((-this.rot[1] + 90) * Math.PI / 180) * speed;
            this.pos[2] -= Math.cos((-this.rot[1] + 90) * Math.PI / 180) * speed;
        }

        if (this.keys[32]) this.pos[1] -= speed;
        if (this.keys[16]) this.pos[1] += speed;

        this.aabb.x = this.pos[0];
        this.aabb.z = this.pos[2];
        this.aabb.y = this.pos[1];
    }

    this.moveToAabb = function ()
    {
        this.pos[0] = this.aabb.x;
        this.pos[1] = this.aabb.y;
        this.pos[2] = this.aabb.z;
    }

    this.getViewMatrix = function ()
    {
        let viewMatrix = glMatrix.mat4.create();
        glMatrix.mat4.rotate(viewMatrix, viewMatrix, rot[0] * Math.PI / 180, [1.0, 0.0, 0.0]);
        glMatrix.mat4.rotate(viewMatrix, viewMatrix, rot[1] * Math.PI / 180, [0.0, 1.0, 0.0]);
        glMatrix.mat4.rotate(viewMatrix, viewMatrix, rot[2] * Math.PI / 180, [0.0, 0.0, 1.0]);

        glMatrix.mat4.translate(viewMatrix, viewMatrix, pos);

        return viewMatrix;
    }
}