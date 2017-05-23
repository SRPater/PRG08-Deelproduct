class GameScene extends Scene
{
    public init() : void
    {        
        this.gameObjects.push(new TextObject(new Vector2(Game.width / 2 - 200, 200), 350 , 50, "Shoot all the balloons before they reach the top!", 24, new Color(0, 100, 0)));
        this.gameObjects.push(new Player(new Vector2(Game.width / 2 - 40, Game.height - 40)));
        setInterval(() => this.spawnBalloons(), 1000);
    }
    
    public destroy() : void {};

    public shootProjectile(pos: Vector2): void
    {
        let p = new Projectile(pos);
        this.gameObjects.push(p);
    }

    public spawnBalloons(): void
    {
        let b = new Balloon(new Vector2(cMath.random(0, Game.width), Game.height + 15), Math.random() + 0.1);
        this.gameObjects.push(b);
    }

    public onKeyDown(event:KeyboardEvent):void 
    {
        super.onKeyDown(event);
    }

    public onKeyUp(event:KeyboardEvent):void 
    {
        super.onKeyUp(event);
    }

    public update() : void
    {
        super.update();
    }
    
    public draw(ctx:CanvasRenderingContext2D) : void
    {
        super.draw(ctx);
    }
}