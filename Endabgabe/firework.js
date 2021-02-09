"use strict";
var Firework;
(function (Firework) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        document.getElementById("formDesc").addEventListener("change", handleDesc);
        // console.log (_event)
        // let Name: HTMLInputElement = <HTMLInputElement>document.querySelector("input");
        // console.log(type.Name);
        let submit = document.querySelector("button[type=submit]");
        console.log(submit);
    }
    function handleDesc(_event) {
        let formData = new FormData(document.forms[0]);
        let results = document.getElementById("firework");
        results.innerHTML = "";
        for (let entry of formData) {
            results.innerHTML += entry[0] + ": " + entry[1] + "<br>";
        }
    }
})(Firework || (Firework = {}));
//# sourceMappingURL=firework.js.map