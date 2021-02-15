"use strict";
var Firework;
(function (Firework) {
    console.log("line");
    class Line extends Firework.particle {
        constructor(_position, _velocity) {
            super();
            this.position.x = _position.x;
            this.position.y = _position.y;
            this.velocity = _velocity;
        }
        draw(_color) {
            Firework.crc2.beginPath();
            Firework.crc2.fillStyle = _color;
            Firework.crc2.lineTo(this.position.x, this.position.y);
            Firework.crc2.fill();
        }
    }
    Firework.Line = Line;
})(Firework || (Firework = {}));
//# sourceMappingURL=line.js.map