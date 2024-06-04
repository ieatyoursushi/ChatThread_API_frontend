//const style
let themeButton = document.querySelector(".themeButton");
//import post divs to this file 
let postDivs;
//this was a pain
import { _canSelectDivs } from './script.js';
async function getCanSelectDivs() {
    return await _canSelectDivs;
}
let canSelectDivs = await getCanSelectDivs();
console.log(canSelectDivs);
function changeBackgroundTheme(canSelectDivs) {
    if (canSelectDivs) {
        postDivs = document.querySelectorAll(".post");
        //value that will be stored in local storage
        let darkMode = localStorage.getItem("darkMode");
        console.log(localStorage);
        if (darkMode === null) {
            darkMode = true;
        } else {
            darkMode = (darkMode === "true");
        }
        setColorTheme(darkMode);
        themeButton.addEventListener('click', function() {
            darkMode = !darkMode;
            postDivs = document.querySelectorAll(".post");
            setColorTheme(darkMode);
            //store boolean value of darkMode
            localStorage.setItem("darkMode", darkMode);
            console.log(localStorage);
        })
        function setColorTheme(darkMode) {
            if (darkMode) {
                console.log("moon.png");
                themeButton.style.backgroundImage = "url(moon.png)";
                document.body.classList.remove("lightMode");
                document.body.classList.add("darkMode");
                for (let i = 0; i < postDivs.length; i++) {
                    postDivs[i].classList.remove("postLightMode");
                    postDivs[i].classList.add("postDarkMode");
                }
            } else {
                console.log("sun.png");
                themeButton.style.backgroundImage = "url(sun.png)";
                document.body.classList.remove("darkMode");
                document.body.classList.add("lightMode");
                for (let i = 0; i < postDivs.length; i++) {
                    postDivs[i].classList.remove("postDarkMode");
                    postDivs[i].classList.add("postLightMode");
                }
            }
        }
    } else {
        postDivs = [];
    }
}
changeBackgroundTheme(canSelectDivs);

export default changeBackgroundTheme;

 

