/**
 * BoxCollider
 */

namespace Core.Collision
{
    export class BoxCollider implements Collision.Collider {
        
        position: Vector2;
        size : any = {width: 0, height: 0};
        public type: E_COLLIDER_TYPES;
        public offset: Vector2;

        constructor(pos: Vector2, width: number, height: number, type:E_COLLIDER_TYPES, offset:Vector2 = Vector2.zero) 
        {
            this.position = pos;
            this.size = {width: width, height: height};
            this.type = type;
            this.offset = offset;
        }

        public hitsOtherCollider(rec: Collision.Collider): Collision.ColliderReturnObject 
        {
            let rtn = {collided:false, direction:ColliderDirection.NONE};

            let w = 0.5 * (this.size.width + rec.size.height);
            let h = 0.5 * (this.size.height + rec.size.height);

            let dx = ((this.position.x + (this.size.width / 2)) - (rec.position.x + (rec.size.width / 2)));
            let dy = ((this.position.y + (this.size.height / 2)) - (rec.position.y + (rec.size.height / 2)));

            if(Math.abs(dx) <= w && Math.abs(dy) <= h)
            {
                let wy = w * dy;
                let hx = h * dx;

                if(wy > hx)
                {
                    if(wy > -hx)
                        rtn = {collided:true, direction:ColliderDirection.TOP};
                    else
                        rtn = {collided:true, direction:ColliderDirection.RIGHT}; 
                }
                else
                {
                    if(wy > -hx)
                        rtn = {collided:true, direction:ColliderDirection.LEFT};
                    else
                        rtn = {collided:true, direction:ColliderDirection.BOTTOM};
                }
            }

            return rtn;
        }
        
        public updatePosition(pos:Vector2): void
        {
            this.position = new Vector2(pos.x + this.offset.x, pos.y + this.offset.y);
        }
    }
}