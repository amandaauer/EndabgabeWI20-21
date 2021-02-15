namespace Firework {
    export class Particle extends MoveableObject {
        private static gravity: number = 1;
        public position: Vector;
        public velocity: Vector;
        private type: string;
        private lifetime: number;
        private color: string;


        constructor(_position: Vector, _velocity: Vector, _color: string, _lifetime: number, _type: string) {
            super(_position);
            this.color = _color;
            this.velocity = _velocity.copy();
            this.lifetime = _lifetime;
            this.type = _type;
        }

        public move(_timeslice: number): void {
            super.move(_timeslice);
            this.velocity.y += Particle.gravity;
            this.lifetime -= _timeslice;
            if (this.lifetime < 0)
                this.expendable = true;

            // this.position.x += this.velocity.x;
            // this.position.y += this.velocity.y;

        }


        public draw(): void {
            switch (this.type) {
                case "circle":
                    crc2.save();
                    crc2.beginPath();
                    crc2.translate(this.position.x, this.position.y);
                    crc2.arc(0, 0, 4, 0, 2 * Math.PI);
                    crc2.closePath();
                    crc2.fillStyle = this.color;
                    crc2.fill();
                    crc2.restore();
                    break;
                case "heart":
                    crc2.save();
                    crc2.beginPath();
                    crc2.translate(this.position.x, this.position.y);
                    crc2.scale(0.5, 0.5);
                    crc2.ellipse(0, 0, 3, 12, Math.PI / 7, 0, 2 * Math.PI);
                    crc2.closePath();
                    crc2.fillStyle = this.color;
                    crc2.fill();
                    crc2.restore();
                    break;
                case "rectangle":
                    crc2.save();
                    crc2.beginPath();
                    crc2.translate(this.position.x, this.position.y);
                    crc2.scale(0.2, 0.2);
                    crc2.moveTo(75, 30);
                    crc2.lineTo(90, 60);
                    crc2.lineTo(125, 75);
                    crc2.lineTo(95, 85);
                    crc2.lineTo(105, 130);
                    crc2.lineTo(75, 110);
                    crc2.lineTo(45, 130);
                    crc2.lineTo(55, 85);
                    crc2.lineTo(55, 85);
                    crc2.lineTo(20, 70);
                    crc2.lineTo(55, 60);
                    crc2.closePath();
                    crc2.fillStyle = this.color;
                    crc2.fill();
                    crc2.restore();
                    break;
            }
        }
    }
}