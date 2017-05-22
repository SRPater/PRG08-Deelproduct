/// <reference path="SpriteObject.ts" />
/// <reference path="Projectile.ts" />

class Player extends SpriteObject
{
    private projectiles: Projectile[] = [];

    constructor(pos: Vector2)
    {
        super(pos, 75, 75, "player", true, true, false, true);
        this.speed = 15;
    }

    public update()
    {
        super.update();
        for(let i:number = 0; i < this.projectiles.length; i++)
        {
            if(this.projectiles[i].dirty)
            {
                delete this.projectiles[i];
                this.projectiles[i] = null;
            }

            this.projectiles[i].update();
        }   
    }   

    public draw(ctx:CanvasRenderingContext2D)
    {
        super.draw(ctx);
        for(let i:number = 0; i < this.projectiles.length; i++)
        {
            this.projectiles[i].draw(ctx);
        }
    } 
    
    public onKeyDown(event:KeyboardEvent):void 
    {
        switch(event.keyCode)
        {
            case 32:
                this.projectiles.push(new Projectile(this.position));
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