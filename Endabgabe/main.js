"use strict";
var Firework;
(function (Firework) {
    function generateContent(_titelList) {
        let group = null;
        let fieldset = document.querySelector("fieldset#fireworkTitel");
        group = createSelect(_titelList);
        if (fieldset && group) //wenn das Fieldset UND (&&) die Gruppe definiert ist, dann kannst du die group als Kind anhängen
            fieldset.appendChild(group);
    }
    Firework.generateContent = generateContent;
    function createSelect(_titelList) {
        // let group: HTMLDivElement = document.createElement("div");
        let selection = document.createElement("select");
        selection.name = "LoadedTitels";
        selection.addEventListener("change", Firework.getDataFromServer);
        //selection.id = "Test";
        for (let titel of _titelList) {
            let option = document.createElement("option");
            option.setAttribute("name", titel.name);
            option.value = option.textContent = titel.name;
            selection.appendChild(option);
        }
        return selection;
    }
})(Firework || (Firework = {}));
//# sourceMappingURL=main.js.map