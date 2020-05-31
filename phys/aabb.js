function Aabb(x, z, y, w, d, h)
{
    this.x = x;
    this.z = z;
    this.y = y;

    this.w = w;
    this.d = d;
    this.h = h;

    this.intersects = function(other)
    {
        return (this.x + this.w > other.x || other.x + other.w > this.x) &&
        (this.z + this.d > other.z || other.z + other.d > this.z) &&
        (this.y + this.h > other.y || other.y + other.h > this.y);
    }
}