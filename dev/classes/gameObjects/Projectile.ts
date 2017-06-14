class Projectile extends SpriteObject
{
    constructor(pos: Vector2)
    {
        super(pos, 15, 15, "projectile", false, true, false, true);
        this.speed = 15;
        this.direction.y = -1;
    }

    public collided(co: Core.Collision.CollidedReturnObject)
    {
        switch(co.object.colliderType())
        {
            case E_COLLIDER_TYPES.PROP:
                Core.Audio.AudioManager.instance().sound("balloon_pop").play();
                ScoreManager.instance().gameScore += 5
                this.dirty = true; // if this were false (or not set) we could shoot multiple Balloons with one Projectile (could be what you want).
                co.object.dirty = true;
            break;
        }
        super.collided(co);
    }

    public update()
    {
        if(this.position.y + this.height < 0)
            this.dirty = true; // remove on cleanup after the projectile goes out of screen.
            
        super.update();
    }        
} 