"use strict";
var Firework;
(function (Firework) {
    class Rectangle extends Firework.Particle {
        constructor(_position, _velocity) {
            super();
            this.position = new Firework.Vector(0, 0);
            this.position.x = _position.x;
            this.position.y = _position.y;
            this.velocity = _velocity;
        }
        draw(_color, _particleRadius) {
            Firework.crc2.beginPath();
            Firework.crc2.fillStyle = _color;
            Firework.crc2.fillRect(this.position.x, this.position.y, _particleRadius, _particleRadius);
            Firework.crc2.fill();
        }
    }
    Firework.Rectangle = Rectangle;
})(Firework || (Firework = {}));
//# sourceMappingURL=rectangle.js.map