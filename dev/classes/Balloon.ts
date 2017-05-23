/// <reference path="SpriteObject.ts" />

class Balloon extends SpriteObject
{
    constructor(pos: Vector2, speed)
    {
        super(pos, 58, 75, "balloon", false, true, false, true, E_COLLIDER_TYPES.PROP);
        this.speed = 0.5;
        this.direction.y = -1;
    }      
} 