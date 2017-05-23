class GameObject
{
    public direction:Vector2;
    public velocity:Vector2;
    public acceleration:Vector2;
    public maxHorSpeed:number = 15;
    public maxVertSpeed:number = 7.5;
    public drag:number = 0.25;
    public needsInput:Boolean;
    public hasCollider:Boolean;

    protected speed:number = 0;
    protected collider: Collider;
    protected hasCollided:Boolean;
    protected hasGravity:Boolean;
    protected gravity:Boolean = false;
    protected grounded:Boolean = false;
    protected canMove:Boolean = false;
    protected name:string = "";

    public dirty:Boolean = false; // if true, will be cleaned up.
    
    constructor(public position:Vector2, public width:number, public height:number, needsInput:Boolean = false, collider:Boolean = false, hasGravity:Boolean = false, canMove:Boolean = false, type:E_COLLIDER_TYPES = E_COLLIDER_TYPES.PROP)
    {
        this.hasGravity = hasGravity;
        this.canMove = canMove;
        
        this.needsInput = needsInput;
        this.hasCollider = collider;
        this.direction = new Vector2(0, 0);
        this.velocity = new Vector2(0, 0);
        this.acceleration = new Vector2(0, 0);
        this.hasCollided = false;
        
        if(this.hasCollider)
            this.collider = new BoxCollider(position, width, height, type);

        if(this.hasGravity)
            this.gravity = true;
    }
    
    public isColliding(r: GameObject) : ColliderReturnObject
    {
        return this.collider.hitsOtherCollider(r.collider);
    }

    public update()
    {
        // Physics bruh.
        if(this.canMove)
        {
            let vl = this.velocity.sqrMagnitude();
            
            this.velocity = Vector2.add(this.velocity, Vector2.multiply(this.direction, this.speed));

            // Drag physics.
            if(vl > 0)
            {
                // So we are basically adding the inverse of the velocity vector multiplied by the drag value. 
                // A drag value of 1 means it will do nothing (rigid movement) lower, like 0.25 will make objects 'slide' more
                this.velocity = Vector2.add(this.velocity, Vector2.multiply(Vector2.inverse(this.velocity), this.drag));
            }

            // Gravity.
            if((this.hasGravity && this.gravity) && !this.grounded)
                this.velocity.y += Game.gravity;

            // Angle of movement and clamping of movement (speed limit).
            let nv = Vector2.add(this.position, this.velocity); // new vector
            let angle = Math.atan2(nv.x - this.position.x, nv.y - this.position.y) * cMath.rad2deg; // get the angle of movement.

            if(angle < 0)
                angle *= -1;

            // Only clamp the horizontal movement if the player is moving sideways.
            // This prevents the player from moving sideways too fast, and also does not clamp jumping and gravity.
            if(vl > this.maxHorSpeed && angle > 75)
                this.velocity = Vector2.clamp(this.velocity, this.maxHorSpeed);  
            else if(vl > this.maxVertSpeed)
                this.velocity = Vector2.clamp(this.velocity, this.maxVertSpeed);   

            // Makes slowing down look and feel smoother.
            if(vl > 0 && vl < 0.1)
                this.velocity = Vector2.zero;

            // Add the calculated velocity to the position.
            this.position = Vector2.add(this.position, this.velocity);

            // Reset for next run, they are set on collision check (after update).
            if(this.hasGravity)
            {
                this.grounded = false;
                this.gravity = true;
            }

            // Update the collider position in case the GameObject moved.
            if(this.hasCollider)
                this.collider.updatePosition(this.position);
        }
    }
    
    public collided(co:CollidedReturnObject) {}

    public colliderType() : E_COLLIDER_TYPES
    {
        return this.collider.type;
    }
    
    // Virtual functions that are overridden in extending classes.
    public draw(ctx:CanvasRenderingContext2D) {}

    public onKeyDown(event:KeyboardEvent):void {}
    
    public onKeyUp(event:KeyboardEvent):void {}
}