namespace Core
{
    export abstract class Scene
    {
        public gameObjects: Core.GameObject[] = [];
        
        constructor()
        {
            this.init();
        }
        
        abstract init() : void;
        abstract destroy() : void;
        
        public update() : void 
        {
            // In case an item has it's dirty flag set, we set it to null (remove it) and don't add it to the new array.
            let newArray = [];
            for(let i:number = 0; i < this.gameObjects.length; i++) 
            {
                this.gameObjects[i].update();

                // Handle collisions after the update so we can rewind movement if neccessary.
                if(this.gameObjects[i].hasCollider)
                {
                    for(let j:number = 0; j < this.gameObjects.length; j++)
                    {
                        if(i == j || !this.gameObjects[j].hasCollider)
                            continue;
                        
                        let col = this.gameObjects[i].isColliding(this.gameObjects[j]);   
                        if(col.collided)
                            this.gameObjects[i].collided({object:this.gameObjects[j], direction:col.direction});
                    } 
                } 

                if (!this.gameObjects[i].dirty)
                    newArray.push(this.gameObjects[i]);    
            }
            this.gameObjects = newArray;
        }
        
        public draw(ctx:CanvasRenderingContext2D): void 
        {
            for(let i:number = 0; i < this.gameObjects.length; i++)
            {
                this.gameObjects[i].draw(ctx);
            }
        }
        
        public onKeyDown(event:KeyboardEvent):void 
        {
            for(let i:number = 0; i < this.gameObjects.length; i++)
            {
                if(this.gameObjects[i].needsInput)
                    this.gameObjects[i].onKeyDown(event);
            }
        }
        
        public onKeyUp(event:KeyboardEvent):void 
        {
            for(let i:number = 0; i < this.gameObjects.length; i++)
            {
                if(this.gameObjects[i].needsInput)
                    this.gameObjects[i].onKeyUp(event);
            }
        }
    }
}