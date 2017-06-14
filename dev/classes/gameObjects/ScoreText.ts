/// <reference path="../TextObject.ts" />

/** Author: JeroenV
 *  ScoreText used to draw the score on the screen.
 */
class ScoreText extends TextObject implements Observer
{
    constructor(position:Vector2)
    {
        super(position, 100, 50, "Score: 0", 24, new Core.Visual.Color(0, 0, 100));

        ScoreManager.instance().subscribe(this);
    }

    public notify(val: any): void {
        this.text = "Score: " + val;
    }
}