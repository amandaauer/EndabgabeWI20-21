namespace Firework {
    export class Heart extends particle {

        constructor (_position: Vector, _velocity: Vector){
            super();
            this.position = new Vector(0,0);
            this.position.x = _position.x;
            this.position.y = _position.y;
            this.velocity = _velocity;
        }
        public draw (_color: string, _particleRadius: number): void {
            
            crc2.beginPath();
            crc2.strokeStyle = _color;
            crc2.fillStyle = _color;

            crc2.moveTo(this.position.x, this.position.y);
            crc2.lineTo(this.position.x + _particleRadius*0.5, this.position.y-_particleRadius*0.9);
            crc2.lineTo(this.position.x + _particleRadius*0.7, this.position.y - _particleRadius*0.5);
            crc2.lineTo(this.position.x, this.position.y + _particleRadius*2);
            crc2.lineTo(this.position.x - _particleRadius*0.7, this.position.y - _particleRadius*0.5);
            crc2.lineTo(this.position.x - _particleRadius * 0.5, this.position.y -_particleRadius*0.9);
            crc2.stroke();
            crc2.fill();
            crc2.closePath();
            
            crc2.stroke();
            crc2.fill();
        }
       
    }
}