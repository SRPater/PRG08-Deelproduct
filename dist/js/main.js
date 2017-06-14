var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Core;
(function (Core) {
    var Game = (function () {
        function Game() {
            var _this = this;
            this.elapsedTime = 0;
            this.updateLag = 0;
            this.fpsTimer = 0;
            this.renderFPS = 0;
            this.totalUpdates = 0;
            if (Game._instance)
                throw new Error("Cannot (re)instantiate class: Game is a singleton!");
            Game._instance = this;
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.width = Game.width;
            this.canvas.height = Game.height;
            this.context = this.canvas.getContext('2d');
            window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
            window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
            this.currentTime = (new Date).getTime();
            this.previousTime = this.currentTime;
            Core.Audio.AudioManager.instance().load();
            this.activateScene(E_SCENES.GAME_SCENE);
            requestAnimationFrame(function () { return _this.update(); });
        }
        Game.instance = function () {
            if (!Game._instance)
                new Game();
            return Game._instance;
        };
        Game.prototype.getFPS = function () {
            return this.renderFPS;
        };
        Game.prototype.getTotalUpdates = function () {
            return this.totalUpdates;
        };
        Game.prototype.activateScene = function (scene) {
            this.activeScene = null;
            switch (scene) {
                case E_SCENES.GAME_SCENE:
                    this.activeScene = new GameScene();
                    break;
                case E_SCENES.GAME_OVER_SCENE:
                    this.activeScene = new GameOverScene();
                    break;
            }
        };
        Game.prototype.getActiveScene = function () {
            return this.activeScene;
        };
        Game.prototype.gameOver = function () {
            console.log("Game over!");
            this.activateScene(E_SCENES.GAME_OVER_SCENE);
        };
        Game.prototype.update = function () {
            var _this = this;
            this.renderFPS++;
            this.currentTime = (new Date).getTime();
            this.elapsedTime = this.currentTime - this.previousTime;
            this.updateLag += this.elapsedTime;
            while (this.updateLag >= Game.MS_UPDATE_LAG) {
                this.totalUpdates++;
                this.activeScene.update();
                Scheduler.runJobs(this.totalUpdates);
                this.updateLag -= Game.MS_UPDATE_LAG;
            }
            this.draw();
            this.previousTime = this.currentTime;
            requestAnimationFrame(function () { return _this.update(); });
        };
        Game.prototype.draw = function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.activeScene.draw(this.context);
        };
        Game.prototype.onKeyDown = function (event) {
            this.activeScene.onKeyDown(event);
        };
        Game.prototype.onKeyUp = function (event) {
            this.activeScene.onKeyUp(event);
        };
        return Game;
    }());
    Game.width = 960;
    Game.height = 540;
    Game.gravity = 3;
    Game.MS_UPDATE_LAG = 16;
    Game.DEBUG = false;
    Core.Game = Game;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var GameObject = (function () {
        function GameObject(position, width, height, needsInput, collider, hasGravity, canMove, type) {
            if (needsInput === void 0) { needsInput = false; }
            if (collider === void 0) { collider = false; }
            if (hasGravity === void 0) { hasGravity = false; }
            if (canMove === void 0) { canMove = false; }
            if (type === void 0) { type = E_COLLIDER_TYPES.PROP; }
            this.position = position;
            this.width = width;
            this.height = height;
            this.maxHorSpeed = 15;
            this.maxVertSpeed = 7.5;
            this.drag = 0.25;
            this.speed = 0;
            this.gravity = false;
            this.grounded = false;
            this.canMove = false;
            this.name = "";
            this.dirty = false;
            this.hasGravity = hasGravity;
            this.canMove = canMove;
            this.needsInput = needsInput;
            this.hasCollider = collider;
            this.direction = new Vector2(0, 0);
            this.velocity = new Vector2(0, 0);
            this.acceleration = new Vector2(0, 0);
            this.hasCollided = false;
            if (this.hasCollider)
                this.collider = new Core.Collision.BoxCollider(position, width, height, type);
            if (this.hasGravity)
                this.gravity = true;
        }
        GameObject.prototype.isColliding = function (r) {
            return this.collider.hitsOtherCollider(r.collider);
        };
        GameObject.prototype.update = function () {
            if (this.canMove) {
                var vl = this.velocity.sqrMagnitude();
                this.velocity = Vector2.add(this.velocity, Vector2.multiply(this.direction, this.speed));
                if (vl > 0) {
                    this.velocity = Vector2.add(this.velocity, Vector2.multiply(Vector2.inverse(this.velocity), this.drag));
                }
                if ((this.hasGravity && this.gravity) && !this.grounded)
                    this.velocity.y += Core.Game.gravity;
                var nv = Vector2.add(this.position, this.velocity);
                var angle = Math.atan2(nv.x - this.position.x, nv.y - this.position.y) * cMath.rad2deg;
                if (angle < 0)
                    angle *= -1;
                if (vl > this.maxHorSpeed && angle > 75)
                    this.velocity = Vector2.clamp(this.velocity, this.maxHorSpeed);
                else if (vl > this.maxVertSpeed)
                    this.velocity = Vector2.clamp(this.velocity, this.maxVertSpeed);
                if (vl > 0 && vl < 0.1)
                    this.velocity = Vector2.zero;
                this.position = Vector2.add(this.position, this.velocity);
                if (this.hasGravity) {
                    this.grounded = false;
                    this.gravity = true;
                }
                if (this.hasCollider)
                    this.collider.updatePosition(this.position);
            }
        };
        GameObject.prototype.collided = function (co) { };
        GameObject.prototype.colliderType = function () {
            return this.collider.type;
        };
        GameObject.prototype.draw = function (ctx) { };
        GameObject.prototype.onKeyDown = function (event) { };
        GameObject.prototype.onKeyUp = function (event) { };
        return GameObject;
    }());
    Core.GameObject = GameObject;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Scene = (function () {
        function Scene() {
            this.gameObjects = [];
            this.init();
        }
        Scene.prototype.update = function () {
            var newArray = [];
            for (var i = 0; i < this.gameObjects.length; i++) {
                this.gameObjects[i].update();
                if (this.gameObjects[i].hasCollider) {
                    for (var j = 0; j < this.gameObjects.length; j++) {
                        if (i == j || !this.gameObjects[j].hasCollider)
                            continue;
                        var col = this.gameObjects[i].isColliding(this.gameObjects[j]);
                        if (col.collided)
                            this.gameObjects[i].collided({ object: this.gameObjects[j], direction: col.direction });
                    }
                }
                if (!this.gameObjects[i].dirty)
                    newArray.push(this.gameObjects[i]);
            }
            this.gameObjects = newArray;
        };
        Scene.prototype.draw = function (ctx) {
            for (var i = 0; i < this.gameObjects.length; i++) {
                this.gameObjects[i].draw(ctx);
            }
        };
        Scene.prototype.onKeyDown = function (event) {
            for (var i = 0; i < this.gameObjects.length; i++) {
                if (this.gameObjects[i].needsInput)
                    this.gameObjects[i].onKeyDown(event);
            }
        };
        Scene.prototype.onKeyUp = function (event) {
            for (var i = 0; i < this.gameObjects.length; i++) {
                if (this.gameObjects[i].needsInput)
                    this.gameObjects[i].onKeyUp(event);
            }
        };
        return Scene;
    }());
    Core.Scene = Scene;
})(Core || (Core = {}));
var Scheduler = (function () {
    function Scheduler() {
    }
    Scheduler.doAtFrame = function (cb, offsetFrames) {
        if (offsetFrames === void 0) { offsetFrames = 0; }
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        var doAtFrame = Core.Game.instance().getTotalUpdates() + offsetFrames;
        this.jobs.push({ func: cb, runAtFrame: doAtFrame, params: params });
    };
    Scheduler.runJobs = function (currentFrame) {
        var newJobs = [];
        for (var i = 0; i < this.jobs.length; i++) {
            var job = this.jobs[i];
            if (currentFrame >= job.runAtFrame) {
                job.func.apply(job, job.params);
                job = null;
            }
            else
                newJobs.push(job);
        }
        this.jobs = newJobs;
    };
    return Scheduler;
}());
Scheduler.jobs = [];
window.addEventListener("load", function () {
    Core.Game.instance();
});
var Core;
(function (Core) {
    var Audio;
    (function (Audio) {
        var AudioManager = (function () {
            function AudioManager() {
                this.audioSrcs = {};
                if (AudioManager._instance)
                    throw new Error("Cannot (re)instantiate class: AudioManager is a singleton!");
                AudioManager._instance = this;
            }
            AudioManager.prototype.load = function () {
                this.audioSrcs["balloon_pop"] = new Howl({
                    src: ['audio/pop.mp3']
                });
            };
            AudioManager.prototype.sound = function (tag) {
                return this.audioSrcs[tag];
            };
            AudioManager.instance = function () {
                if (!AudioManager._instance)
                    new AudioManager();
                return AudioManager._instance;
            };
            return AudioManager;
        }());
        Audio.AudioManager = AudioManager;
    })(Audio = Core.Audio || (Core.Audio = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Collision;
    (function (Collision) {
        var BoxCollider = (function () {
            function BoxCollider(pos, width, height, type, offset) {
                if (offset === void 0) { offset = Vector2.zero; }
                this.size = { width: 0, height: 0 };
                this.position = pos;
                this.size = { width: width, height: height };
                this.type = type;
                this.offset = offset;
            }
            BoxCollider.prototype.hitsOtherCollider = function (rec) {
                var rtn = { collided: false, direction: ColliderDirection.NONE };
                var w = 0.5 * (this.size.width + rec.size.height);
                var h = 0.5 * (this.size.height + rec.size.height);
                var dx = ((this.position.x + (this.size.width / 2)) - (rec.position.x + (rec.size.width / 2)));
                var dy = ((this.position.y + (this.size.height / 2)) - (rec.position.y + (rec.size.height / 2)));
                if (Math.abs(dx) <= w && Math.abs(dy) <= h) {
                    var wy = w * dy;
                    var hx = h * dx;
                    if (wy > hx) {
                        if (wy > -hx)
                            rtn = { collided: true, direction: ColliderDirection.TOP };
                        else
                            rtn = { collided: true, direction: ColliderDirection.RIGHT };
                    }
                    else {
                        if (wy > -hx)
                            rtn = { collided: true, direction: ColliderDirection.LEFT };
                        else
                            rtn = { collided: true, direction: ColliderDirection.BOTTOM };
                    }
                }
                return rtn;
            };
            BoxCollider.prototype.updatePosition = function (pos) {
                this.position = new Vector2(pos.x + this.offset.x, pos.y + this.offset.y);
            };
            return BoxCollider;
        }());
        Collision.BoxCollider = BoxCollider;
    })(Collision = Core.Collision || (Core.Collision = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Visual;
    (function (Visual) {
        var Color = (function () {
            function Color(r, g, b, a) {
                if (a === void 0) { a = 1; }
                this.r = r;
                this.g = g;
                this.b = b;
                this.a = a;
                this.cacheColorString();
            }
            Color.prototype.cacheColorString = function () {
                this.colorString = "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
            };
            return Color;
        }());
        Visual.Color = Color;
    })(Visual = Core.Visual || (Core.Visual = {}));
})(Core || (Core = {}));
var ScoreManager = (function () {
    function ScoreManager() {
        this.observers = [];
        this._gameScore = 0;
        if (ScoreManager._instance)
            throw new Error("Cannot (re)instantiate class: ScoreManager is a singleton!");
        ScoreManager._instance = this;
    }
    Object.defineProperty(ScoreManager.prototype, "gameScore", {
        get: function () { return this._gameScore; },
        set: function (score) {
            this._gameScore = score;
            for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
                var o = _a[_i];
                o.notify(this.gameScore);
            }
        },
        enumerable: true,
        configurable: true
    });
    ScoreManager.prototype.subscribe = function (o) {
        this.observers.push(o);
    };
    ScoreManager.instance = function () {
        if (!ScoreManager._instance)
            new ScoreManager();
        return ScoreManager._instance;
    };
    return ScoreManager;
}());
var SpriteObject = (function (_super) {
    __extends(SpriteObject, _super);
    function SpriteObject(position, width, height, img, needsInput, collider, hasGravity, canMove, type) {
        if (needsInput === void 0) { needsInput = false; }
        if (collider === void 0) { collider = false; }
        if (hasGravity === void 0) { hasGravity = false; }
        if (canMove === void 0) { canMove = false; }
        if (type === void 0) { type = E_COLLIDER_TYPES.PROP; }
        var _this = _super.call(this, position, width, height, needsInput, collider, hasGravity, canMove, type) || this;
        _this.sprite = new Image(_this.width, _this.height);
        _this.sprite.src = 'images/' + img + '.png';
        return _this;
    }
    SpriteObject.prototype.update = function () {
        _super.prototype.update.call(this);
    };
    SpriteObject.prototype.draw = function (ctx) {
        ctx.drawImage(this.sprite, this.position.x - (this.width / 2), this.position.y - (this.height / 2), this.width, this.height);
    };
    return SpriteObject;
}(Core.GameObject));
var TextObject = (function (_super) {
    __extends(TextObject, _super);
    function TextObject(position, width, height, text, size, color) {
        var _this = _super.call(this, position, width, height, false, false) || this;
        _this.text = text;
        _this.size = size;
        _this.color = color;
        return _this;
    }
    Object.defineProperty(TextObject.prototype, "text", {
        get: function () { return this._text; },
        set: function (text) { this._text = text; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextObject.prototype, "size", {
        get: function () { return this._size; },
        set: function (size) { this._size = size; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextObject.prototype, "color", {
        get: function () { return this._color; },
        set: function (color) { this._color = color; },
        enumerable: true,
        configurable: true
    });
    TextObject.prototype.update = function () {
    };
    TextObject.prototype.draw = function (ctx) {
        ctx.fillStyle = this.color.colorString;
        ctx.font = this.size + "px Arial";
        ctx.fillText(this.text, this.position.x, this.position.y, this.width);
    };
    return TextObject;
}(Core.GameObject));
var Vector2 = (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2.multiply = function (v1, scalar) {
        return new Vector2(v1.x * scalar, v1.y * scalar);
    };
    Vector2.add = function (v1, v2) {
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
    };
    Vector2.substract = function (v1, v2) {
        return new Vector2(v1.x - v2.x, v1.y - v2.y);
    };
    Vector2.prototype.magnitude = function () {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    };
    Vector2.prototype.sqrMagnitude = function () {
        return (this.x * this.x) + (this.y * this.y);
    };
    Vector2.inverse = function (v1) {
        return new Vector2(-v1.x, -v1.y);
    };
    Vector2.isZero = function (v1) {
        return ((v1.x == Vector2.zero.x && v1.y == Vector2.zero.y) ? true : false);
    };
    Vector2.clamp = function (v1, n) {
        return new Vector2(cMath.clamp(v1.x, -n, n), cMath.clamp(v1.y, -n, n));
    };
    return Vector2;
}());
Vector2.zero = new Vector2(0, 0);
var Balloon = (function (_super) {
    __extends(Balloon, _super);
    function Balloon(pos, speed) {
        var _this = _super.call(this, pos, 58, 75, "balloon", false, true, false, true, E_COLLIDER_TYPES.PROP) || this;
        _this.speed = 0.5;
        _this.direction.y = -1;
        return _this;
    }
    Balloon.prototype.update = function () {
        if (this.position.y + this.height < 0) {
            Core.Game.instance().gameOver();
            this.dirty = true;
        }
        _super.prototype.update.call(this);
    };
    return Balloon;
}(SpriteObject));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(pos) {
        var _this = _super.call(this, pos, 75, 75, "player", true, true, false, true, E_COLLIDER_TYPES.PLAYER) || this;
        _this.speed = 12;
        _this.drag = 0.15;
        return _this;
    }
    Player.prototype.update = function () {
        if (this.position.x > Core.Game.width)
            this.position.x = Core.Game.width;
        if (this.position.x < 0)
            this.position.x = 0;
        _super.prototype.update.call(this);
    };
    Player.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 32:
                Scheduler.doAtFrame(function (pos) { return Core.Game.instance().getActiveScene().shootProjectile(pos); }, 0, this.position);
                break;
            case 39:
                this.direction.x = 1;
                break;
            case 37:
                this.direction.x = -1;
                break;
        }
    };
    Player.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case 39:
                if (this.direction.x == 1)
                    this.direction.x = 0;
                break;
            case 37:
                if (this.direction.x == -1)
                    this.direction.x = 0;
                break;
        }
    };
    return Player;
}(SpriteObject));
var Projectile = (function (_super) {
    __extends(Projectile, _super);
    function Projectile(pos) {
        var _this = _super.call(this, pos, 15, 15, "projectile", false, true, false, true) || this;
        _this.speed = 15;
        _this.direction.y = -1;
        return _this;
    }
    Projectile.prototype.collided = function (co) {
        switch (co.object.colliderType()) {
            case E_COLLIDER_TYPES.PROP:
                Core.Audio.AudioManager.instance().sound("balloon_pop").play();
                ScoreManager.instance().gameScore += 5;
                this.dirty = true;
                co.object.dirty = true;
                break;
        }
        _super.prototype.collided.call(this, co);
    };
    Projectile.prototype.update = function () {
        if (this.position.y + this.height < 0)
            this.dirty = true;
        _super.prototype.update.call(this);
    };
    return Projectile;
}(SpriteObject));
var ScoreText = (function (_super) {
    __extends(ScoreText, _super);
    function ScoreText(position) {
        var _this = _super.call(this, position, 100, 50, "Score: 0", 24, new Core.Visual.Color(0, 0, 100)) || this;
        ScoreManager.instance().subscribe(_this);
        return _this;
    }
    ScoreText.prototype.notify = function (val) {
        this.text = "Score: " + val;
    };
    return ScoreText;
}(TextObject));
var GameOverScene = (function (_super) {
    __extends(GameOverScene, _super);
    function GameOverScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameOverScene.prototype.init = function () {
        this.gameObjects.push(new TextObject(new Vector2(Core.Game.width / 2 - 200, 200), 350, 50, "You reached a score of: " + ScoreManager.instance().gameScore, 24, new Core.Visual.Color(0, 0, 255)));
    };
    GameOverScene.prototype.destroy = function () { };
    ;
    GameOverScene.prototype.onKeyDown = function (event) {
        _super.prototype.onKeyDown.call(this, event);
    };
    GameOverScene.prototype.onKeyUp = function (event) {
        _super.prototype.onKeyUp.call(this, event);
    };
    GameOverScene.prototype.update = function () {
        _super.prototype.update.call(this);
    };
    GameOverScene.prototype.draw = function (ctx) {
        _super.prototype.draw.call(this, ctx);
    };
    return GameOverScene;
}(Core.Scene));
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameScene.prototype.init = function () {
        var _this = this;
        this.gameObjects.push(new TextObject(new Vector2(Core.Game.width / 2 - 200, 200), 350, 50, "Shoot all the balloons before they reach the top!", 24, new Core.Visual.Color(0, 100, 0)));
        this.gameObjects.push(new ScoreText(new Vector2(10, 35)));
        this.gameObjects.push(new Player(new Vector2(Core.Game.width / 2 - 40, Core.Game.height - 40)));
        setInterval(function () { return _this.spawnBalloons(); }, 1000);
    };
    GameScene.prototype.destroy = function () { };
    ;
    GameScene.prototype.shootProjectile = function (pos) {
        var p = new Projectile(pos);
        this.gameObjects.push(p);
    };
    GameScene.prototype.spawnBalloons = function () {
        var b = new Balloon(new Vector2(cMath.random(0, Core.Game.width), Core.Game.height + 15), Math.random() + 0.1);
        this.gameObjects.push(b);
    };
    GameScene.prototype.onKeyDown = function (event) {
        _super.prototype.onKeyDown.call(this, event);
    };
    GameScene.prototype.onKeyUp = function (event) {
        _super.prototype.onKeyUp.call(this, event);
    };
    GameScene.prototype.update = function () {
        _super.prototype.update.call(this);
    };
    GameScene.prototype.draw = function (ctx) {
        _super.prototype.draw.call(this, ctx);
    };
    return GameScene;
}(Core.Scene));
var E_SCENES;
(function (E_SCENES) {
    E_SCENES[E_SCENES["GAME_SCENE"] = 0] = "GAME_SCENE";
    E_SCENES[E_SCENES["GAME_OVER_SCENE"] = 1] = "GAME_OVER_SCENE";
})(E_SCENES || (E_SCENES = {}));
var E_COLLIDER_TYPES;
(function (E_COLLIDER_TYPES) {
    E_COLLIDER_TYPES[E_COLLIDER_TYPES["PLAYER"] = 0] = "PLAYER";
    E_COLLIDER_TYPES[E_COLLIDER_TYPES["PROP"] = 1] = "PROP";
})(E_COLLIDER_TYPES || (E_COLLIDER_TYPES = {}));
var ColliderDirection;
(function (ColliderDirection) {
    ColliderDirection[ColliderDirection["NONE"] = 0] = "NONE";
    ColliderDirection[ColliderDirection["TOP"] = 1] = "TOP";
    ColliderDirection[ColliderDirection["BOTTOM"] = 2] = "BOTTOM";
    ColliderDirection[ColliderDirection["LEFT"] = 3] = "LEFT";
    ColliderDirection[ColliderDirection["RIGHT"] = 4] = "RIGHT";
})(ColliderDirection || (ColliderDirection = {}));
var cMath = (function () {
    function cMath() {
    }
    cMath.clamp = function (n, min, max) {
        return Math.min(Math.max(n, min), max);
    };
    ;
    cMath.random = function (min, max) {
        return Math.floor(Math.random() * max) + min;
    };
    return cMath;
}());
cMath.deg2rad = Math.PI / 180;
cMath.rad2deg = 180 / Math.PI;
//# sourceMappingURL=main.js.map