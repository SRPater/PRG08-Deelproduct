/// <reference path="GameObject.ts" />

/** Author: JeroenV
 *  TextObject used to draw text on the canvas.
 */
class TextObject extends Core.GameObject
{
    protected _text: string;
    public get text(): string  { return this._text; }
    public set text(text: string) { this._text = text; }

    protected _size: number;
    public get size(): number  { return this._size; }
    public set size(size: number) { this._size = size; }
    
    protected _color: Core.Visual.Color;
    public get color(): Core.Visual.Color  { return this._color; }
    public set color(color: Core.Visual.Color) { this._color = color; }
    
    constructor(position: Vector2, width: number, height: number, text: string, size: number, color: Core.Visual.Color)
    {
        super(position, width, height, false, false);
        this.text = text;
        this.size = size;
        this.color = color;
    }
    
    public update()
    {
        
    }
    
    public draw(ctx:CanvasRenderingContext2D)
    {
        ctx.fillStyle = this.color.colorString;
        ctx.font = this.size + "px Arial";
        ctx.fillText(this.text, this.position.x, this.position.y, this.width);
    }
}