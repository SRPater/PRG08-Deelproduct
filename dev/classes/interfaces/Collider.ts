interface Collider {
    position: Vector2;
    type: E_COLLIDER_TYPES;
    size: any;

    hitsOtherCollider(rec: Collider): ColliderReturnObject;
    updatePosition(pos:Vector2): void;
}