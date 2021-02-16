"use strict";
var Firework;
(function (Firework) {
    // window.addEventListener("click", handleClick);
    window.addEventListener("load", handleLoad);
    //   const queryString: string = "http://localhost:5001";
    const queryString = "https://eiawi2021server.herokuapp.com/";
    let formData;
    let rockets;
    let response;
    let fireworks = [];
    let fps = 10;
    async function handleLoad(_event) {
        GetAllRockets();
        let form = document.getElementById("formDesc");
        form?.addEventListener("change", handleDesc);
        let submitButton = document.getElementById("SubmitButton");
        submitButton?.addEventListener("click", Add);
        let resetButton = document.getElementById("ResetButton");
        resetButton?.addEventListener("click", Reset);
        rockets = document.getElementById("rockets");
        let canvas = document.getElementById("canvas");
        canvas?.addEventListener("click", handleClick);
        window.setInterval(update, 100 / fps);
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
                rockets.innerHTML += "Name" + ": " + entry.rocketName + "<br>";
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
    //Teil 2: Canvas
    function handleClick(_event) {
        let tempPosition = new Firework.Vector(_event.offsetX, _event.offsetY);
        createFirework(tempPosition);
    }
    function createFirework(tempPosition) {
        if (response.length > 0) {
            console.log("create firework");
            let rocket = response[0];
            let explosionValue = Number(rocket.ExploSize);
            console.log(explosionValue);
            let lifetimeValue = Number(rocket.Lifetime);
            let colorValue = rocket.Color;
            let amountValue = Number(rocket.Amount);
            let particleTypeValue = Number(rocket.ParticleType);
            console.log(particleTypeValue);
            let particleSizeValue = Number(rocket.ParticleSize);
            let firework = new Firework.Firework(tempPosition, particleTypeValue, colorValue, amountValue, explosionValue, particleSizeValue, lifetimeValue * fps / 2);
            fireworks.push(firework);
            DeleteRocket();
        }
    }
    function update() {
        let canvas;
        canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Firework.crc2 = canvas.getContext("2d");
        Firework.imgData = Firework.crc2.getImageData(0, 0, canvas.width, canvas.height);
        // drawCanvas();
        for (let i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].draw();
            fireworks[i].update();
            if (!fireworks[i].isAlive()) {
                fireworks.splice(i, 1);
            }
        }
    }
})(Firework || (Firework = {}));
//# sourceMappingURL=firework.js.map