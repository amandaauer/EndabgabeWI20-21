"use strict";
var silvester;
(function (silvester) {
    class Particle {
        constructor() {
        }
        draw(_color, _particleRadius) {
        }
        move() {
            this.velocity = Vector.getSum(this.velocity, new Vector(0, 0.01)); //Gravitation
            this.position = Vector.getSum(this.position, this.velocity);
        }
    }
    silvester.Particle = Particle;
})(silvester || (silvester = {}));
//# sourceMappingURL=particle.js.map