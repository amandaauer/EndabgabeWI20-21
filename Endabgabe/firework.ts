namespace Firework {
    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {
        document.getElementById("formDesc").addEventListener("change", handleDesc);
        // console.log (_event)
        // let Name: HTMLInputElement = <HTMLInputElement>document.querySelector("input");
        // console.log(type.Name);
        let submit: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button[type=submit]");
        console.log(submit);
    }
 

    function handleDesc(_event: Event): void {
        let formData: FormData = new FormData(document.forms[0]);
        let results: HTMLDivElement = <HTMLDivElement>document.getElementById("firework");
        results.innerHTML = "";

        for (let entry of formData) {
            results.innerHTML += entry[0] + ": " + entry[1] + "<br>";
        }

    }
}