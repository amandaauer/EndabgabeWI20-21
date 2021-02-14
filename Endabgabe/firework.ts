namespace Firework {
    // interface RocketData  {
    // name: string;
    // type: string;
    // intensity: string;
    // lifetime: string;
    // color: string;        
    // _id: number;
    //}
    window.addEventListener("load", handleLoad);
    export let crc2: CanvasRenderingContext2D;
      // const queryString: string = "http://localhost:5001";
    const queryString: string = "https://eiawi2021server.herokuapp.com/"
    let formData: FormData;
    let rockets: HTMLDivElement;
    let fireworks: Feuerwerk [] = [];
    // tslint:disable-next-line:no-any
    let response: any[];
    //let canvas: HTMLCanvasElement | null 
    export let imgData: ImageData; 
   // let fps: number = 10;
 
    async function handleLoad(_event: Event):Promise<void> {
        // canvas = <HTMLCanvasElement>document.querySelector("canvas");
        // if (!canvas)
        //     return;
        // crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        // imgData = crc2.getImageData(0, 0, canvas.width, canvas.height);

        // crc2.fillStyle = "Himmel.jpg";
        //crc2.fillRect(0, 0, canvas.width, canvas.height);
       // crc2.fill

        GetAllRockets();
        let form: HTMLElement | null = document.getElementById("formDesc");
        form?.addEventListener("change", handleDesc);
        let submitButton: HTMLElement | null = document.getElementById("SubmitButton");
        submitButton?.addEventListener("click", Add);
        let resetButton: HTMLElement | null = document.getElementById("ResetButton");
        resetButton?.addEventListener("click", Reset);
        rockets = <HTMLDivElement>document.getElementById("rockets");
        let canvas: HTMLElement | null = document.getElementById("canvas");
        canvas?.addEventListener("click", DeleteRocket);
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
          let query: URLSearchParams = new URLSearchParams(<any>formData);
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
                rockets.innerHTML += "Name" + ": " + entry.Name + "<br>";
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

    
      function handleClick(_event: MouseEvent): void {                                  //wenn "click" auf den Canvas gehört wird, wird offsetX & offset Y ausgelöst
          let tempPosition: Vector = new Vector(_event.offsetX, _event.offsetY);
        createFirework(tempPosition);                                                 //für das Feuerwerk wird eine Temporäre Position gegeben

     }

     function createFirework(tempPosition: Vector) {                                     //tempPosition ist eine Methode von createFirework und wird als Vector dargestellt
         console.log("createFirework");                                                  //createFirework holt sich die Input Elemente über deren ID und erstellt damit das gewünscht Feuerwerk des Nutzers

          let ExplosionTarget: HTMLInputElement = <HTMLInputElement>document.getElementById("explosion");
          let ExplosionValue: any = ExplosionTarget.value;
          let firework: any = [] ;

      fireworks.push(firework);
    }

    function update() {
        //Der Hintergrund wird geupdatet
        let canvas: HTMLCanvasElement | null;


        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        if (!canvas)
            return;

        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        imgData = crc2.getImageData(0, 0, canvas.width, canvas.height);

       // drawCanvas();


        for (let i: number = fireworks.length - 1; i >= 0; i--) {           //solange noch Daten im Firework Array sind, wird die function update ausgeführt, firework ist also noch Alive 
            //sobald i>= 0 ist, wird die Funktion beendet und das Feuerwerk ebenso
            fireworks[i].draw();
            fireworks[i].update();
            if (!fireworks[i].isAlive()) {
                fireworks.splice(i, 1);

            }
        }


    }
}
