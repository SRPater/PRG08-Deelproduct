/** Author: JeroenV
 *  AudioManager class.
 */

class AudioManager 
{
    private static _instance: AudioManager;

    private audioSrcs: IHashTable<Howl> = {};

    constructor() 
    {
        if(AudioManager._instance)
            throw new Error("Cannot (re)instantiate class: Game is a singleton!");

        AudioManager._instance = this;
    }

    public init(): void
    {
        // Add all the required sounds here.

        this.audioSrcs["balloon_pop"] = new Howl({
            src: ['audio/pop.mp3']
        });
    }

    public sound(tag: string): Howl
    {
        return this.audioSrcs[tag];
    }

    public static instance()
    {
        if(!AudioManager._instance)
            new AudioManager();
            
        return AudioManager._instance;
    }
}