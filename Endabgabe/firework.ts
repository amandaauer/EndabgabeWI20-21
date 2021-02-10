// import axios from "axios";
 namespace Firework {
    
    window.addEventListener("load", handleLoad);

    let name: String = "" ;
    let type: String = "";
    let intensity: String = "";
    let lifetime: String = "";
    let color: String = "";
    let formData: FormData;

  
    function handleLoad(_event: Event): void {
        //   ResetButton = document.getElementById("ResetButton");
        //   ResetButton.addEventListener("click", Reset);
        let form: HTMLElement | null = document.getElementById("formDesc");
        form?.addEventListener("change", handleDesc);
        // console.log (_event)
        // let Name: HTMLInputElement = <HTMLInputElement>document.querySelector("input");
        // console.log(type.Name);
        //   let submit: HTMLButtonElement = document.querySelector("#SubmitButton");
        //   submit.addEventListener("click", Reset);
        //   console.log(submit);
        let submitButton: HTMLElement | null = document.getElementById("SubmitButton");
        submitButton?.addEventListener("click", Add);
        let resetButton: HTMLElement | null = document.getElementById("ResetButton");
        resetButton?.addEventListener("click", Reset);
    }
 

    function handleDesc(_event: Event): void {
        // console.log(_event);
         formData = new FormData(document.forms[0]);
         let results: HTMLDivElement = <HTMLDivElement>document.getElementById("firework");
        // console.log("results", results);
         results.innerHTML = "";
        // let 
        // formData = formData;
        // console.log("formdata", formData);
         for (let entry of formData) {
            // console.log(entry)
            SetVariables(entry);
            results.innerHTML += entry[0] + ": " + entry[1] + "<br>";
        }
         console.log(
            {
                   name,
     type,
     intensity,
     lifetime,
     color
            }
        );
        

    }
    function Reset(_event: Event): void {
       console.log("click");
    }
    async function Add(_event: Event): Promise<void> {
        // tslint:disable-next-line:typedef
        // const axios = require("axios");
          // tslint:disable-next-line: no-any
          let query: URLSearchParams = new URLSearchParams(<any>formData);
          let response: object =  await fetch("http://localhost:5001" + "?" + query.toString());
          console.log(response);
    }
    // tslint:disable-next-line: no-any
    function SetVariables(entry: any[]): void {
        let typeField: String = entry[0];
        switch (typeField) {
            case "Name":
                name = entry[1];
                break;
            case "Type":
                type = entry[1];
                break;
            case "Intensity":
                intensity = entry[1];
                break;
            case "Lifetime":
                lifetime = entry[1];
                break;
            default:
                color = entry[1];
                break;
        }
    }
}