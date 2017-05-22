class GameScene extends Scene
{
    public init() : void
    {
        super.init();
        
        this.gameObjects.push(new TextObject(new Vector2(Game.width / 2 - 200, 200), 350 , 50, "Shoot all the balloons before they reach the top!", 24, new Color(0, 100, 0)));
        this.gameObjects.push(new Player(new Vector2(Game.width / 2 - 40, Game.height - 40)));
        super.processGameObjects();
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