"use strict";
var Firework;
(function (Firework) {
    class Particle extends Firework.MoveableObject {
        constructor(_position, _velocity, _color, _lifetime, _type) {
            super(_position);
            this.color = _color;
            this.velocity = _velocity.copy();
            this.lifetime = _lifetime;
            this.type = _type;
        }
        move(_timeslice) {
            super.move(_timeslice);
            this.velocity.y += Particle.gravity;
            this.lifetime -= _timeslice;
            if (this.lifetime < 0)
                this.expendable = true;
            // this.position.x += this.velocity.x;
            // this.position.y += this.velocity.y;
        }
        draw() {
            switch (this.type) {
                case "circle":
                    Firework.crc2.save();
                    Firework.crc2.beginPath();
                    Firework.crc2.translate(this.position.x, this.position.y);
                    Firework.crc2.arc(0, 0, 4, 0, 2 * Math.PI);
                    Firework.crc2.closePath();
                    Firework.crc2.fillStyle = this.color;
                    Firework.crc2.fill();
                    Firework.crc2.restore();
                    break;
                case "heart":
                    Firework.crc2.save();
                    Firework.crc2.beginPath();
                    Firework.crc2.translate(this.position.x, this.position.y);
                    Firework.crc2.scale(0.5, 0.5);
                    Firework.crc2.ellipse(0, 0, 3, 12, Math.PI / 7, 0, 2 * Math.PI);
                    Firework.crc2.closePath();
                    Firework.crc2.fillStyle = this.color;
                    Firework.crc2.fill();
                    Firework.crc2.restore();
                    break;
                case "rectangle":
                    Firework.crc2.save();
                    Firework.crc2.beginPath();
                    Firework.crc2.translate(this.position.x, this.position.y);
                    Firework.crc2.scale(0.2, 0.2);
                    Firework.crc2.moveTo(75, 30);
                    Firework.crc2.lineTo(90, 60);
                    Firework.crc2.lineTo(125, 75);
                    Firework.crc2.lineTo(95, 85);
                    Firework.crc2.lineTo(105, 130);
                    Firework.crc2.lineTo(75, 110);
                    Firework.crc2.lineTo(45, 130);
                    Firework.crc2.lineTo(55, 85);
                    Firework.crc2.lineTo(55, 85);
                    Firework.crc2.lineTo(20, 70);
                    Firework.crc2.lineTo(55, 60);
                    Firework.crc2.closePath();
                    Firework.crc2.fillStyle = this.color;
                    Firework.crc2.fill();
                    Firework.crc2.restore();
                    break;
            }
        }
    }
    Particle.gravity = 1;
    Firework.Particle = Particle;
})(Firework || (Firework = {}));
//# sourceMappingURL=Particle.js.map