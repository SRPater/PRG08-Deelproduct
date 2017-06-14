/** Author: JeroenV
 *  ScoreManager class.
 */

class ScoreManager implements Subject
{
    private static _instance: ScoreManager;

    public observers: Array<Observer> = [];

    private _gameScore: number = 0;
    public get gameScore(): number  { return this._gameScore; }
    public set gameScore(score: number) { 
        this._gameScore = score;
        for(let o of this.observers)
            o.notify(this.gameScore);
    }

    constructor() 
    {
        if(ScoreManager._instance)
            throw new Error("Cannot (re)instantiate class: ScoreManager is a singleton!");

        ScoreManager._instance = this;
    }

    public subscribe(o: Observer) {
        this.observers.push(o);
    }

    public static instance()
    {
        if(!ScoreManager._instance)
            new ScoreManager();
            
        return ScoreManager._instance;
    }
}