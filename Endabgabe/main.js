"use strict";
var Firework;
(function (Firework) {
    class Feuerwerk {
        constructor(_position, _particleType, _color, _speed, _amount, _particleRadius, _lifetime) {
            this.particleArray = []; //im Particle Array, werden die gewählten Partikel gelistet
            console.log(_lifetime); //ist ausschlaggebend wie lanege Rakte sichtbar ist
            this.position = _position;
            this.color = _color;
            this.amount = _amount;
            this.particleRadius = _particleRadius;
            this.lifeTime = _lifetime;
            this.particleType = _particleType;
            switch (_particleType) {
                case 0:
                    for (let i = 0; i < this.amount; i++) {
                        this.particleArray.push(new Firework.Rectangle(this.position, Firework.Vector.getuberVector(_speed, Firework.Vector.getRandom(-1, 1))));
                        console.log("Rectangle");
                    }
                    break;
                case 1:
                    for (let i = 0; i < this.amount; i++) {
                        this.particleArray.push(new Firework.Circle(this.position, Firework.Vector.getuberVector(_speed, Firework.Vector.getRandom(-1, 1))));
                        console.log("Circle");
                    }
                    break;
                case 2:
                    for (let i = 0; i < this.amount; i++) {
                        this.particleArray.push(new Firework.Heart(this.position, Firework.Vector.getuberVector(_speed, Firework.Vector.getRandom(-1, 1))));
                        console.log("Heart");
                    }
                    break;
                default: console.log("wrong type");
                // wenn keiner der gennanten Typen ausgewählt wurde, wird "wrong type" ausgegeben.                    return;
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
    Firework.Feuerwerk = Feuerwerk;
})(Firework || (Firework = {}));
//# sourceMappingURL=main.js.map