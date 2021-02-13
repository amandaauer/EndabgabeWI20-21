namespace Firework {
    // interface RocketData  {
    // name: string;
    // type: string;
    // intensity: string;
    // lifetime: string;
    // color: string;        
    // _id: number;
    // }
    window.addEventListener("load", handleLoad);
    const queryString: string = "http://localhost:5001";
    let formData: FormData;
    let rockets: HTMLDivElement;
    // tslint:disable-next-line:no-any
    let response: any[];
    function handleLoad(_event: Event): void {
        GetAllRockets();
        let form: HTMLElement | null = document.getElementById("formDesc");
        form?.addEventListener("change", handleDesc);
        let submitButton: HTMLElement | null = document.getElementById("SubmitButton");
        submitButton?.addEventListener("click", Add);
        let resetButton: HTMLElement | null = document.getElementById("ResetButton");
        resetButton?.addEventListener("click", Reset);
        rockets = <HTMLDivElement>document.getElementById("rockets");
        let canvas: HTMLElement | null = document.getElementById("canvas");
        if (response.length > 0) canvas?.addEventListener("click", DeleteRocket);
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
    
}