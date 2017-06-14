/// <reference path="GameObject.ts" />

/** Author: JeroenV
 *  SpriteObject used to create a GameObject with a sprite Image. Currently animations are not supported.
 */
class SpriteObject extends Core.GameObject
{
    public sprite:HTMLImageElement;
    
    constructor(position:Vector2, width:number, height:number, img:string, needsInput:Boolean = false, collider:Boolean = false, hasGravity:Boolean = false, canMove:Boolean = false, type:E_COLLIDER_TYPES = E_COLLIDER_TYPES.PROP)
    {
        super(position, width, height, needsInput, collider, hasGravity, canMove, type);
        this.sprite = new Image(this.width, this.height);
        this.sprite.src = 'images/' + img + '.png'; 
    }
    
    public update()
    {
        super.update(); 
    }
    
    public draw(ctx:CanvasRenderingContext2D)
    {
        ctx.drawImage(this.sprite, this.position.x - (this.width / 2), this.position.y - (this.height / 2), this.width, this.height);  
    }
}