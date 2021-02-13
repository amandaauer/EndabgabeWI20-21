"use strict";
var Firework;
(function (Firework) {
    window.addEventListener("load", handleLoad);
    let crc2;
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = canvas.getContext("2d");
    }
})(Firework || (Firework = {}));
//# sourceMappingURL=main.js.map