"use strict";
var Firework;
(function (Firework) {
    window.addEventListener("click", handleClick);
    window.addEventListener("load", handleLoad);
    // const queryString: string = "http://localhost:5001";
    const queryString = "https://eiawi2021server.herokuapp.com/";
    let formData;
    let rockets;
    // let fireworks: Feuerwerk [] = [];
    // tslint:disable-next-line:no-any
    let response;
    //let form: HTMLFormElement;
    //let quantity: number;
    let color;
    let lifetime;
    let type;
    let intensity;
    let moveables = [];
    let result;
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
        // console.log(formData)
        let query = new URLSearchParams(formData);
        console.log(query);
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
        update();
    }
    function handleClick(_event) {
        //      let tempPosition: Vector = new Vector(_event.offsetX, _event.offsetY);
        //   createObjects();  
        console.log(createObjects); //für das Feuerwerk wird eine Temporäre Position gegeben
    }
    function createObjects(_event) {
        let mousePositionX = _event.clientX; //- crc2.canvas.offsetLeft;
        let mousepositionY = _event.clientY; //- crc2.canvas.offsetTop;
        let formData = new FormData(document.forms[0]);
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
        createParticle(intensity, mousePositionX, mousepositionY, color, lifetime, type);
    }
    async function getDataFromServer(_event) {
        console.log("Datein wurden geladen");
        let target = _event.target;
        let userValue;
        userValue = target.value;
        let response = await fetch(formData + "?" + "command=getAllDatas");
        let responseContent = await response.text();
        let allDatas = JSON.parse(responseContent);
        result = allDatas.find(item => item.name === userValue);
        console.log(result);
        createUserRocket(result);
    }
    Firework.getDataFromServer = getDataFromServer;
    function createUserRocket(_result) {
        let color = _result.color;
        let intensity = _result.intensity;
        let type = _result.type;
        let lifetime = _result.lifetime;
        console.log("Das ist deine Rakete=>", "Type=", type, "Color=", color, "Intensity=", intensity, "Lifetime=", lifetime);
        // erzeugt neuer Particle mit diesen Werten und pusht ihn in moveable Array
        // eine Funktion die z.B. auf MouseUp hört, erzeugt eine Explosion mit diesen Werten
    }
    function createParticle(_lifetime, _mousePositionX, _mousePositionY, _color, _intensity, _type) {
        let origin = new Firework.Vector(_mousePositionX, _mousePositionY);
        let color = _color;
        for (let i = 0; i < _lifetime; i++) {
            let radian = (Math.PI * 2) / _lifetime;
            let px = Math.cos(radian * i) * 110 * Math.random() * 2; //(2)power
            let py = Math.sin(radian * i) * 110 * Math.random() * 2; //(2)power
            let velocity = new Firework.Vector(px, py);
            let particle = new Firework.Particle(origin, velocity, color, lifetime, type);
            moveables.push(particle);
        }
    }
    function update() {
        Firework.crc2.fillStyle = "rgba(0,0,0,0.2)";
        Firework.crc2.fillRect(0, 0, Firework.crc2.canvas.width, Firework.crc2.canvas.height);
        for (let moveable of moveables) {
            moveable.move(1 / 50);
            moveable.draw();
        }
        DeleteRocket();
    }
})(Firework || (Firework = {}));
//# sourceMappingURL=firework.js.map