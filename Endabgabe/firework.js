"use strict";
var Firework;
(function (Firework) {
    // interface RocketData  {
    // name: string;
    // type: string;
    // intensity: string;
    // lifetime: string;
    // color: string;        
    // _id: number;
    //}
    window.addEventListener("load", handleLoad);
    // const queryString: string = "http://localhost:5001";
    const queryString = "https://eiawi2021server.herokuapp.com/";
    let formData;
    let rockets;
    let fireworks = [];
    // tslint:disable-next-line:no-any
    let response;
    // let fps: number = 10;
    async function handleLoad(_event) {
        // canvas = <HTMLCanvasElement>document.querySelector("canvas");
        // if (!canvas)
        //     return;
        // crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        // imgData = crc2.getImageData(0, 0, canvas.width, canvas.height);
        // crc2.fillStyle = "Himmel.jpg";
        //crc2.fillRect(0, 0, canvas.width, canvas.height);
        // crc2.fill
        GetAllRockets();
        let form = document.getElementById("formDesc");
        form?.addEventListener("change", handleDesc);
        let submitButton = document.getElementById("SubmitButton");
        submitButton?.addEventListener("click", Add);
        let resetButton = document.getElementById("ResetButton");
        resetButton?.addEventListener("click", Reset);
        rockets = document.getElementById("rockets");
        let canvas = document.getElementById("canvas");
        canvas?.addEventListener("click", DeleteRocket);
    }
    function handleDesc(_event) {
        formData = new FormData(document.forms[0]);
        let results = document.getElementById("firework");
        results.innerHTML = "";
        for (let entry of formData) {
            results.innerHTML += entry[0] + ": " + entry[1] + "<br>";
        }
    }
    function Reset(_event) {
        console.log("click");
    }
    async function Add(_event) {
        let query = new URLSearchParams(formData);
        await fetch(queryString + "?" + query, {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            referrerPolicy: "no-referrer"
        });
        GetAllRockets();
    }
    async function GetAllRockets() {
        try {
            // tslint:disable-next-line:typedef
            const r = await fetch(queryString, {
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
        }
        catch (e) {
            console.log(e);
        }
    }
    async function DeleteRocket() {
        const rocket = response[0];
        let query = new URLSearchParams(rocket);
        await fetch(queryString + "?" + query, {
            method: "DELETE",
            mode: "cors",
            credentials: "same-origin",
            referrerPolicy: "no-referrer"
        });
        GetAllRockets();
    }
    function handleClick(_event) {
        let tempPosition = new Firework.Vector(_event.offsetX, _event.offsetY);
        createFirework(tempPosition); //für das Feuerwerk wird eine Temporäre Position gegeben
    }
    function createFirework(tempPosition) {
        console.log("createFirework"); //createFirework holt sich die Input Elemente über deren ID und erstellt damit das gewünscht Feuerwerk des Nutzers
        let ExplosionTarget = document.getElementById("explosion");
        let ExplosionValue = ExplosionTarget.value;
        fireworks.push(firework);
    }
    function update() {
        //Der Hintergrund wird geupdatet
        let canvas;
        canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Firework.crc2 = canvas.getContext("2d");
        Firework.imgData = Firework.crc2.getImageData(0, 0, canvas.width, canvas.height);
        // drawCanvas();
        for (let i = fireworks.length - 1; i >= 0; i--) { //solange noch Daten im Firework Array sind, wird die function update ausgeführt, firework ist also noch Alive 
            //sobald i>= 0 ist, wird die Funktion beendet und das Feuerwerk ebenso
            fireworks[i].draw();
            fireworks[i].update();
            if (!fireworks[i].isAlive()) {
                fireworks.splice(i, 1);
            }
        }
    }
})(Firework || (Firework = {}));
//# sourceMappingURL=firework.js.map