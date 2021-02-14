namespace Firework {
    export class Rectangle extends Particle {

        constructor(_position: Vector, _velocity: Vector){
            super();
            this.position = new Vector(0,0); 
            this.position.x = _position.x;
            this.position.y = _position.y;
            this.velocity = _velocity;
            

        }
        public draw (_color: string, _particleRadius: number): void{
            crc2.beginPath();
                crc2.fillStyle = _color;
                crc2.fillRect(this.position.x, this.position.y, _particleRadius, _particleRadius);
                crc2.fill();

            
        }
        
    }
    
}