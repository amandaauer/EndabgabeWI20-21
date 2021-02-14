"use strict";
var Firework;
(function (Firework) {
    class Circle extends Firework.Particle {
        constructor(_position, _velocity) {
            super();
            this.position = new Firework.Vector(0, 0); //Entkopplung von der Client Position
            this.position.x = _position.x;
            this.position.y = _position.y;
            this.velocity = _velocity;
        }
        draw(_color, _particleRadius) {
            Firework.crc2.beginPath();
            Firework.crc2.fillStyle = _color;
            Firework.crc2.arc(this.position.x, this.position.y, _particleRadius, 0, 2 * Math.PI);
            Firework.crc2.fill();
        }
    }
    Firework.Circle = Circle;
})(Firework || (Firework = {}));
//# sourceMappingURL=circle.js.map