"use strict";
var Firework;
(function (Firework) {
    class Heart extends Firework.Particle {
        constructor(_position, _velocity) {
            super();
            this.position = new Firework.Vector(0, 0);
            this.position.x = _position.x;
            this.position.y = _position.y;
            this.velocity = _velocity;
        }
        draw(_color, _particleRadius) {
            Firework.crc2.beginPath();
            Firework.crc2.strokeStyle = _color;
            Firework.crc2.fillStyle = _color;
            Firework.crc2.moveTo(this.position.x, this.position.y);
            Firework.crc2.lineTo(this.position.x + _particleRadius * 0.5, this.position.y - _particleRadius * 0.9);
            Firework.crc2.lineTo(this.position.x + _particleRadius * 0.7, this.position.y - _particleRadius * 0.5);
            Firework.crc2.lineTo(this.position.x, this.position.y + _particleRadius * 2);
            Firework.crc2.lineTo(this.position.x - _particleRadius * 0.7, this.position.y - _particleRadius * 0.5);
            Firework.crc2.lineTo(this.position.x - _particleRadius * 0.5, this.position.y - _particleRadius * 0.9);
            Firework.crc2.stroke();
            Firework.crc2.fill();
            Firework.crc2.closePath();
            Firework.crc2.stroke();
            Firework.crc2.fill();
        }
    }
    Firework.Heart = Heart;
})(Firework || (Firework = {}));
//# sourceMappingURL=heart.js.map