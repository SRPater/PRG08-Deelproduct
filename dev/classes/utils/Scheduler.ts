/** Author: JeroenV
 *  Scheduler class. I was bored; wanted to create a Scheduling class that allows you to specify a function to be executed after X amount of frames.
 */

interface ScheduleJob {
    func: Function,
    runAtFrame: number,
    params: any[]
}

class Scheduler
{
    static jobs:ScheduleJob[] = [];

    public static doAtFrame(cb: Function, offsetFrames = 0, ...params: any[]) 
    {
        let doAtFrame = Core.Game.instance().getTotalUpdates() + offsetFrames;
        this.jobs.push({func: cb, runAtFrame: doAtFrame, params: params});
    }

    public static runJobs(currentFrame: number)
    {
        let newJobs = [];
        
        for(let i:number = 0; i < this.jobs.length; i++)
        {
            let job = this.jobs[i];
            
            if(currentFrame >= job.runAtFrame)
            {
                job.func(...job.params);
                job = null;
            }
            else
                newJobs.push(job);
        }

        this.jobs = newJobs;
    }
}