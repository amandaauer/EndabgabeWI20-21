"use strict";
var Firework;
(function (Firework_1) {
    console.log("firework");
    class Firework {
        constructor(_position, _particleTypeValue, _color, _amount, _explosion, _particleRadius, _lifetime) {
            this.particleArray = [];
            this.position = _position;
            this.color = _color;
            this.amount = _amount;
            this.particleRadius = _particleRadius;
            this.lifeTime = _lifetime;
            switch (_particleTypeValue) {
                case 0:
                    for (let i = 0; i < this.amount; i++) {
                        this.particleArray.push(new Firework_1.Rectangle(this.position, Firework_1.Vector.getuberVector(_explosion, Firework_1.Vector.getRandom(-1, 1))));
                        console.log("Rectangle");
                    }
                    break;
                case 1:
                    for (let i = 0; i < this.amount; i++) {
                        this.particleArray.push(new Firework_1.Dot(this.position, Firework_1.Vector.getuberVector(_explosion, Firework_1.Vector.getRandom(-1, 1))));
                        console.log("Dot");
                    }
                    break;
                case 2:
                    for (let i = 0; i < this.amount; i++) {
                        this.particleArray.push(new Firework_1.Heart(this.position, Firework_1.Vector.getuberVector(_explosion, Firework_1.Vector.getRandom(-1, 1))));
                        console.log("Heart");
                    }
                    break;
                default:
                    console.log("wrong type");
                    return;
            }
        }
        draw() {
            for (let i = 0; i < this.particleArray.length; i++) {
                this.particleArray[i].draw(this.color, this.particleRadius);
            }
        }
        update() {
            console.log(this.lifeTime);
            this.lifeTime--;
            for (let i = 0; i < this.particleArray.length; i++) {
                this.particleArray[i].move();
            }
        }
        isAlive() {
            if (this.lifeTime == 0) {
                return false;
            }
            else {
                return true;
            }
        }
    }
    Firework_1.Firework = Firework;
})(Firework || (Firework = {}));
//# sourceMappingURL=main.js.map