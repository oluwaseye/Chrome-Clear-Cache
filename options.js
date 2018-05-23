var runOnChromeStart = document.querySelector("[data-option]");
// Save the extention option (using local storage)
function saveOption() {
    var extOption = "off";
    runOnChromeStart.checked ? extOption = "on" : extOption = "off";
    localStorage["NoCacheOnDefault"] = extOption;

    console.log(extOption);
}
// Restores select box state to saved value from localStorage.
function resetOption() {
    localStorage["NoCacheOnDefault"] === "on"  ?  runOnChromeStart.checked = true : runOnChromeStart.checked = false;

    console.log(localStorage["NoCacheOnDefault"]);
}
runOnChromeStart.addEventListener("change", saveOption);
resetOption();