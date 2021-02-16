namespace Firework {
    
    // window.addEventListener("click", handleClick);
    window.addEventListener("load", handleLoad);
    //   const queryString: string = "http://localhost:5001";
    const queryString: string = "https://eiawi2021server.herokuapp.com/"
    export let imgData: ImageData;
    export let crc2: CanvasRenderingContext2D;
    let formData: FormData;
    let rockets: HTMLDivElement;
    let response: any[];
    let fireworks: Firework[] = [];
    let fps: number = 10;
    
    
    
 
    async function handleLoad(_event: Event):Promise<void> {

    
        GetAllRockets();
        let form: HTMLElement | null = document.getElementById("formDesc");
        form?.addEventListener("change", handleDesc);
        let submitButton: HTMLElement | null = document.getElementById("SubmitButton");
        submitButton?.addEventListener("click", Add);
        let resetButton: HTMLElement | null = document.getElementById("ResetButton");
        resetButton?.addEventListener("click", Reset);
        rockets = <HTMLDivElement>document.getElementById("rockets");
        let canvas: HTMLElement | null = document.getElementById("canvas");
        canvas?.addEventListener("click", handleClick);

      

       window.setInterval(update, 100 / fps);


        
    }
 

    function handleDesc(_event: Event): void {
         formData = new FormData(document.forms[0]);
         let results: HTMLDivElement = <HTMLDivElement>document.getElementById("firework");
         results.innerHTML = "";
         for (let entry of formData) {
            results.innerHTML += entry[0] + ": " + entry[1] + "<br>";
        }
    }
          function Reset(_event: Event): void {
           console.log("click");
    }
    async function Add(_event: Event): Promise<void> {
        // console.log(formData)
          let query: URLSearchParams = new URLSearchParams(<any>formData);
          console.log(query)
          await fetch(queryString + "?" + query, {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            referrerPolicy: "no-referrer"
          });
          GetAllRockets();
    }
    async function GetAllRockets(): Promise<void> {
        try {
            // tslint:disable-next-line:typedef
            const r: Response = await fetch(queryString, {
                method: "GET",
                mode: "cors",
                credentials: "same-origin",
                referrerPolicy: "no-referrer"
            });
            response = await r.json();
            console.log(response);
            rockets.innerHTML = "";
            for (let entry of response) {
                rockets.innerHTML += "Name" + ": " + entry.rocketName + "<br>";
                
        }
        } catch (e) {
            console.log(e);
            
        }
    }
    async function DeleteRocket(): Promise<void> {
          const rocket: any = response[0];
         let query: URLSearchParams = new URLSearchParams(<any>rocket);
         await fetch(queryString + "?" + query, {
             method: "DELETE",
            mode: "cors",
             credentials: "same-origin",
            referrerPolicy: "no-referrer"
      });
          GetAllRockets();
          
     }

    //Teil 2: Canvas

   function handleClick(_event: MouseEvent): void {                                  
        let tempPosition: Vector = new Vector(_event.offsetX, _event.offsetY);
        createFirework(tempPosition);  
                                            

    }

        
    
    function createFirework(tempPosition: Vector) {    
                                     
      
        if(response.length > 0){
            console.log("create firework"); 
        let rocket: any=response[0];
        
        let explosionValue = Number(rocket.ExploSize);
        console.log(explosionValue);

        let lifetimeValue = Number(rocket.Lifetime);
    
        let colorValue: string = rocket.Color;

        let amountValue = Number(rocket.Amount);

        let particleTypeValue = Number(rocket.ParticleType);
        console.log(particleTypeValue);
      
        let particleSizeValue = Number(rocket.ParticleSize);

        let firework: Firework = new Firework(tempPosition, particleTypeValue, colorValue, amountValue, explosionValue,particleSizeValue, lifetimeValue * fps / 2);
        fireworks.push(firework);
        

        DeleteRocket();
        }
    }

    function update() {
        
        let canvas: HTMLCanvasElement | null; 

        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        if (!canvas)
            return;

        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        imgData = crc2.getImageData(0, 0, canvas.width, canvas.height);
// drawCanvas();
        

        for (let i: number = fireworks.length - 1; i >= 0; i--) {         
            
            fireworks[i].draw();
            fireworks[i].update();
            if (!fireworks[i].isAlive()) {

                fireworks.splice(i, 1);
                
            }
        }


    }
}