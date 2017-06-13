/** Author: JeroenV
 *  GameOverScene
 */

class GameOverScene extends Scene
{
    public init() : void
    {        
        this.gameObjects.push(new TextObject(new Vector2(Game.width / 2 - 200, 200), 350 , 50, "You reached a score of: " + Game.instance().gameScore, 24, new Color(0, 0, 255)));
    }
    
    public destroy() : void {};

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