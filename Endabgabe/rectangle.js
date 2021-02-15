"use strict";
var Firework;
(function (Firework) {
    console.log("Rectangle");
    class Rectangle extends Firework.particle {
        constructor(_positon, _velocity) {
            super();
            this.position = new Firework.Vector(0, 0);
            this.position.x = _positon.x;
            this.position.y = _positon.y;
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