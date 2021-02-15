"use strict";
var Firework;
(function (Firework_1) {
    console.log("firework");
    class Firework {
        constructor(_position, _particleTypeValue, _color, _amount, _explosion, _particleRadius, _lifetime) {
            this.particleArray = []; //im Particle Array, werden die gewählten Partikel gelistet
            this.position = _position;
            this.color = _color;
            this.amount = _amount;
            this.particleRadius = _particleRadius;
            this.lifeTime = _lifetime;
            switch (_particleTypeValue) {
                case 0:
                    for (let i = 0; i < this.amount; i++) { //i wird gleich 0 gesetzt, solange i kliener als die Anzahl ist wird in das particle Array ein neues Rectangel gepusht 
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
                        this.particleArray.push(new Firework_1.Line(this.position, Firework_1.Vector.getuberVector(_explosion, Firework_1.Vector.getRandom(-1, 1))));
                        console.log("Line");
                    }
                    break;
                default:
                    console.log("wrong type");
                    return;
                // wenn keiner der gennanten Typen ausgewählt wurde, wird "wrong type" ausgegeben.                    
            }
        }
        draw() {
            for (let i = 0; i < this.particleArray.length; i++) { //for Schleife: erster Ausdruck wird ausgeführt, bevor Schleife beginnt.Der zweite ist die Bedingung für die Ausführung der Schleife.Der 3. wird nach der Ausführung jeden Codeblocks ausgeführt.
                this.particleArray[i].draw(this.color, this.particleRadius);
            }
        }
        update() {
            console.log(this.lifeTime);
            this.lifeTime--; //verringer lifeTime wenn i kleiner als die Länge des particle Arrays ist,dann führe die move Funktion von Particle aus, anschließend erhöhe  i um 1
            for (let i = 0; i < this.particleArray.length; i++) {
                this.particleArray[i].move();
            }
        }
        isAlive() {
            if (this.lifeTime == 0) { //wenn die beiden Operatoren gleich sind, wird false zurückgegeben, ansonsten true
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