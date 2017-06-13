/// <reference path="SpriteObject.ts" />

class Projectile extends SpriteObject
{
    constructor(pos: Vector2)
    {
        super(pos, 15, 15, "projectile", false, true, false, true);
        this.speed = 15;
        this.direction.y = -1;
    }

    public collided(co:CollidedReturnObject)
    {
        switch(co.object.colliderType())
        {
            case E_COLLIDER_TYPES.PROP:
                console.log("Bang");
                Game.instance().gameScore += 5;
                this.dirty = true; // if this were false (or not set) we could shoot multiple Balloons with one Projectile (could be what you want).
                co.object.dirty = true;
            break;
        }
        super.collided(co);
    }

    public update()
    {
        if(this.position.y + this.height < 0)
        {
            console.log("Kapot");
            this.dirty = true;
        }
            
        super.update();
    }        
} 