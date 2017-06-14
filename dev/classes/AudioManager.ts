/** Author: JeroenV
 *  AudioManager class.
 */

namespace Core.Audio
{
    export class AudioManager 
    {
        private static _instance: AudioManager;

        private audioSrcs: HashTable<Howl> = {};

        constructor() 
        {
            if(AudioManager._instance)
                throw new Error("Cannot (re)instantiate class: AudioManager is a singleton!");

            AudioManager._instance = this;
        }

        public load(): void
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
}