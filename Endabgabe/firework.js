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
    // }
    window.addEventListener("load", handleLoad);
    const queryString = "http://localhost:5001";
    let formData;
    let rockets;
    // tslint:disable-next-line:no-any
    let response;
    function handleLoad(_event) {
        GetAllRockets();
        let form = document.getElementById("formDesc");
        form?.addEventListener("change", handleDesc);
        let submitButton = document.getElementById("SubmitButton");
        submitButton?.addEventListener("click", Add);
        let resetButton = document.getElementById("ResetButton");
        resetButton?.addEventListener("click", Reset);
        rockets = document.getElementById("rockets");
        let canvas = document.getElementById("canvas");
        if (response.length > 0)
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
})(Firework || (Firework = {}));
//# sourceMappingURL=firework.js.map