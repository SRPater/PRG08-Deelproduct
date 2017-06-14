namespace Core.Collision 
{
    export interface ColliderReturnObject
    {
        collided:Boolean;
        direction:ColliderDirection;
    }

    export interface CollidedReturnObject
    {
        object:Core.GameObject;
        direction:ColliderDirection;
    }

    export interface Collider {
        position: Vector2;
        type: E_COLLIDER_TYPES;
        size: any;

        hitsOtherCollider(rec: Collider): ColliderReturnObject;
        updatePosition(pos:Vector2): void;
    }
}
