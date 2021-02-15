"use strict";
var Firework;
(function (Firework) {
    console.log("dot");
    class Dot extends Firework.particle {
        constructor(_position, _velocity) {
            super();
            this.position = new Firework.Vector(0, 0); //Entkopplung von der Client Posiiton
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
    Firework.Dot = Dot;
})(Firework || (Firework = {}));
//# sourceMappingURL=dots.js.map