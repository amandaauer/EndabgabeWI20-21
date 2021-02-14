"use strict";
var Firework;
(function (Firework) {
    console.log("Particle");
    class Particle {
        constructor() {
        }
        draw(_color, _particleRadius) {
        }
        move() {
            this.velocity = Firework.Vector.getSum(this.velocity, new Firework.Vector(0, 0.01)); //Gravitaion
            this.position = Firework.Vector.getSum(this.position, this.velocity);
        }
    }
    Firework.Particle = Particle;
})(Firework || (Firework = {}));
//# sourceMappingURL=Particle.js.map