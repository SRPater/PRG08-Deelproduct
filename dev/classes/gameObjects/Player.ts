class Player extends SpriteObject
{
    constructor(pos: Vector2)
    {
        super(pos, 75, 75, "player", true, true, false, true, E_COLLIDER_TYPES.PLAYER);
        this.speed = 12;
        this.drag = 0.15;
    }

    public update()
    {
        if(this.position.x > Core.Game.width)
            this.position.x = Core.Game.width;

        if(this.position.x < 0)
            this.position.x = 0;
            
        super.update();
    }
    
    public onKeyDown(event:KeyboardEvent):void 
    {
        switch(event.keyCode)
        {
            case 32:
                // Just cuz I wantd to use my fancy Scheduler class :)
                Scheduler.doAtFrame(
                    (pos: Vector2) => (<GameScene>Core.Game.instance().getActiveScene()).shootProjectile(pos), 0, this.position
                );
            break;
            case 39: // Arrow right
                this.direction.x = 1;
                break;
            case 37: // Arrow left
                this.direction.x = -1;
                break;               
        }
    }
    
    public onKeyUp(event:KeyboardEvent):void 
    {
        switch(event.keyCode)
        {
            case 39: // Arrow right
                if(this.direction.x == 1)
                    this.direction.x = 0;
                break;
            case 37: // Arrow left
                if(this.direction.x == -1)
                    this.direction.x = 0;
                break;
        }
    }
} 