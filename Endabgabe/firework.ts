namespace Firework {
    
    
    window.addEventListener("click", handleClick);
    window.addEventListener("load", handleLoad);
    export let crc2: CanvasRenderingContext2D;
      // const queryString: string = "http://localhost:5001";
    const queryString: string = "https://eiawi2021server.herokuapp.com/"
    let formData: FormData;
    let rockets: HTMLDivElement;
    // let fireworks: Feuerwerk [] = [];
    // tslint:disable-next-line:no-any
    let response: any[];
    //let form: HTMLFormElement;
    //let quantity: number;
    let color: string;
    let lifetime: number;
    let type: string;
    let intensity: number;
    let moveables: MoveableObject[] = [];
    let result: Rocket;
    
    
    
 
    async function handleLoad(_event: Event):Promise<void> {
        // canvas = <HTMLCanvasElement>document.querySelector("canvas");
        // if (!canvas)
        //     return;
        // crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        // imgData = crc2.getImageData(0, 0, canvas.width, canvas.height);

        // crc2.fillStyle = "Himmel.jpg";
        //crc2.fillRect(0, 0, canvas.width, canvas.height);
       // crc2.fill
       let response: Response = await fetch(queryString + "?" + "command=getTitels");
       let listOfTitels: string = await response.text();
       let titelList: Rocket[] = JSON.parse(listOfTitels);
       generateContent(titelList);

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
    //      let tempPosition: Vector = new Vector(_event.offsetX, _event.offsetY);
    //   createObjects();  
                                                    //für das Feuerwerk wird eine Temporäre Position gegeben

      }

      function createObjects(_event: MouseEvent): void {


        let mousePositionX: number = _event.clientX; //- crc2.canvas.offsetLeft;
        let mousepositionY: number = _event.clientY; //- crc2.canvas.offsetTop;
        let formData: FormData = new FormData(document.forms[0]);
    
    
        for (let entry of formData) {
    
          intensity = Number(formData.get("intensity"));
          lifetime = Number(formData.get("lifetime"));
          color = String(formData.get("color"));
          switch (entry[1]) {
            case "heart":
              type = "heart";
              break;
            case "circle":
              type = "circle";
              break;
            case "rectangle":
              type = "rectangle";
              break;
        
          }
        }
        createParticle (intensity, mousePositionX, mousepositionY, color, lifetime, type);
  }

  export async function getDataFromServer(_event: Event): Promise<void> {
    console.log("Datein wurden geladen");
    let target: HTMLInputElement = <HTMLInputElement>_event.target;
    let userValue: string;
    userValue = target.value;
    let response: Response = await fetch(formData + "?" + "command=getAllDatas");
    let responseContent: string = await response.text();
    let allDatas: Rocket[] = JSON.parse(responseContent);
    result = <Rocket>allDatas.find(item => item.name === userValue);
    console.log(result);
    createUserRocket(result);

  }
    
  
  function createUserRocket(_result: Rocket): void {

    let color: string = _result.color;
    let intensity: number = _result.intensity;
    let type: string = _result.type;
    let lifetime: number = _result.lifetime;
    console.log("Das ist deine Rakete=>", "Type=", type, "Color=", color, "Intensity=", intensity, "Lifetime=", lifetime);
    // erzeugt neuer Particle mit diesen Werten und pusht ihn in moveable Array
    // eine Funktion die z.B. auf MouseUp hört, erzeugt eine Explosion mit diesen Werten

  }

  
  function createParticle(_lifetime: number, _mousePositionX: number, _mousePositionY: number, _color: string, _intensity: number, _type: string): void {

    let origin: Vector = new Vector(_mousePositionX, _mousePositionY);
    let color: string = _color;

    for (let i: number = 0; i < _lifetime; i++) {
      let radian: number = (Math.PI * 2) / _lifetime;
      let px: number = Math.cos(radian * i) * 110 * Math.random() * 2; //(2)power
      let py: number = Math.sin(radian * i) * 110 * Math.random() * 2; //(2)power
      let velocity: Vector = new Vector(px, py);
      let particle: MoveableObject = new Particle(origin, velocity, color, lifetime, type);
      moveables.push(particle);

    }
  }



  function update(): void {

    crc2.fillStyle = "rgba(0,0,0,0.2)";
   crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

    for (let moveable of moveables) {
     moveable.move(1 / 50);
   moveable.draw();
    }
    DeleteRocket();

  }

}