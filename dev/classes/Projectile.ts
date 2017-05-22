/// <reference path="SpriteObject.ts" />

class Projectile extends SpriteObject
{
    constructor(pos: Vector2)
    {
        super(pos, 15, 15, "projectile", false, true, false, true);
        this.speed = 15;
        this.direction.y = -1;
    }    
} 