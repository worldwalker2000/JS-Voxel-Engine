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

function onKeyDown(evt) { instance.keys[evt.which] = true; console.log(evt.which); }

function onKeyUp(evt) { instance.keys[evt.which] = false; }

function Player(pos, rot)
{
    this.pos = pos;
    this.rot = rot;

    this.prev = [0, 0];

    this.keys = [];
    for(let i = 0; i < 100; i++)
        this.keys[i] = false;

    instance = this;

    document.getElementById("glCanvas").addEventListener("mousemove", onMouseMove, false);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    this.onMouseMove = function(evt)
    {
        let mousePos = getMousePos(document.getElementById("glCanvas"), evt);
        let diff = [this.prev[0] - mousePos[0], this.prev[1] - mousePos[1]];
        this.rot[1] += diff[0]/2;
        this.rot[0] += diff[1]/2;
        this.rot[0] += diff[1]/2;
        
        this.prev[0] = mousePos[0];
        this.prev[1] = mousePos[1];
    }

    this.tick = function()
    {
        let speed = 0.1;
        if(this.keys[87])
        {
            this.pos[0] += Math.sin((this.rot[1] + 90) * Math.PI / 180) * speed;
            this.pos[2] += Math.cos((this.rot[1] + 90) * Math.PI / 180) * speed;
        }
        if(this.keys[83])
        {
            this.pos[0] -= Math.sin((this.rot[1] + 90) * Math.PI / 180) * speed;
            this.pos[2] -= Math.cos((this.rot[1] + 90) * Math.PI / 180) * speed;
        }
        if(this.keys[65])
        {
            this.pos[0] -= Math.sin((this.rot[1]) * Math.PI / 180) * speed;
            this.pos[2] -= Math.cos((this.rot[1]) * Math.PI / 180) * speed;
        }
        if(this.keys[68])
        {
            this.pos[0] += Math.sin((this.rot[1]) * Math.PI / 180) * speed;
            this.pos[2] += Math.cos((this.rot[1]) * Math.PI / 180) * speed;
        }
    }

    this.getViewMatrix = function()
    {
        let viewMatrix = glMatrix.mat4.create();
		glMatrix.mat4.translate(viewMatrix, viewMatrix, pos);
		glMatrix.mat4.rotate(viewMatrix, viewMatrix, rot[0] * Math.PI / 180, [1.0, 0.0, 0.0]);
		glMatrix.mat4.rotate(viewMatrix, viewMatrix, rot[1] * Math.PI / 180, [0.0, 1.0, 0.0]);
		glMatrix.mat4.rotate(viewMatrix, viewMatrix, rot[2] * Math.PI / 180, [0.0, 0.0, 1.0]);

        return viewMatrix;
    }
}