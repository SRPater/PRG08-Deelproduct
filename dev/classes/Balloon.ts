/// <reference path="SpriteObject.ts" />

class Balloon extends SpriteObject
{
    constructor(pos: Vector2, speed)
    {
        super(pos, 58, 75, "balloon", false, true, false, true, E_COLLIDER_TYPES.PROP);
        this.speed = 0.5;
        this.direction.y = -1;
    }

    public update()
    {
        if(this.position.y + this.height < 0)
        {
            console.log("Game over");
            this.dirty = true;
        }
            
        super.update();
    }        
} 