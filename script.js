//test 1: retrieving data via get request
const fetchURL = "https://625af6e7-264e-4529-809d-af73d591ac9b-00-23lml8244ntak.janeway.replit.dev/api";
function confirmPostToBackEnd() {
    fetch(fetchURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            let titleDiv = document.createElement("div");
            titleDiv.classList.add("titleDivydiv");
            let logo = document.createElement("div");
            logo.classList.add("tailwindUse");
            let h1 = document.createElement("h1");
            //h1.classList.add("tailwindUse");
            h1.innerHTML = data.messageType;
            titleDiv.append(h1);
            titleDiv.append(logo);
            document.querySelector(".ms").insertBefore(titleDiv, document.querySelector(".themeButton"));
            
        })
}
confirmPostToBackEnd();
//test 2: sending data via post request
//use inputs to modify variables of this user class.
//check if posts div is overflowed
let posts = document.querySelector('.posts');
async function updateOverflowY() {
    if (posts.scrollHeight > 500) {
        posts.style.overflowY = 'scroll';
        console.log("function WROISJDROLFSDFSDFSDF")
    } else {
        posts.style.overflowY = 'none';
    }
}
posts.addEventListener('resize', updateOverflowY);
export { updateOverflowY };

class Comment {
    constructor(uName, uMsg, postId, postDate) {
        this.name = uName;
        this.message = uMsg;
        this.postId = postId;
        this.postDate = postDate;
    }
}
function generatePostId(length) {
    // Create an array of possible characters for the password
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    // Loop through the specified length and randomly select a character from the array
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}
//creating the post date function and sending in one of the comment paremeter 
function rawTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`
}
function convert24To12(time) {
    // Split the time string into hours and minutes
    const [hours, minutes] = time.split(":");
    // Convert the hours to a 12-hour format
    let hours12 = parseInt(hours, 10);
    let ampm = "AM";
    if (hours12 > 12) {
        hours12 -= 12;
        ampm = "PM";
    } else if (hours12 === 12) {
        ampm = "PM";
    } else if (hours12 === 0) {
        hours12 = 12;
    }
    // Return the time in a 12-hour AM/PM format
    return `${hours12}:${minutes} ${ampm}`;
}
function getCurrentTime() {
    //composite functions applied
    return convert24To12(rawTime());
}
function getDate() {
    return new Date().toLocaleDateString();
}
function postDate() {
    return `${getDate()} ${getCurrentTime()}`;
}
let timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit'
});
/* both paths rely on a sent response on whether the get or post request was successful 
which is why we are logging messages on both tests*/
async function sendData(username, message) {
    return new Promise((resolve, reject) => {
        fetch("https://625af6e7-264e-4529-809d-af73d591ac9b-00-23lml8244ntak.janeway.replit.dev/api",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'applications/json'
                },
                body: JSON.stringify(new Comment(username, message, generatePostId(25), postDate()))
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                resolve("refresh");
            }).catch(err => {
                console.log(err);
                reject(err);
            });
    });
}
//use input to send data to nodejs application
let userIn = document.getElementById("userInput");
let messageIn = document.getElementById("msgInput");
let userValue = "";
let messageValue = "";
userIn.addEventListener('change', function() {
    userValue = userIn.value;
});
messageIn.addEventListener('change', function() {
    messageValue = messageIn.value;
});

//get response endopint for /api/history
//runs when first loaded / refreshed
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function showData() {
    return new Promise(function(resolve, reject) {
        //this endpoint returns the entire comments array onload/when refreshed for obvious reasons
        fetch("https://625af6e7-264e-4529-809d-af73d591ac9b-00-23lml8244ntak.janeway.replit.dev/api/history")
            .then(function(response) {
                return response.json();
            }).then(function(data) {
                console.log(data);
                let posts = document.querySelector(".posts");
                for (let i = data.length - 1; i >= 0; i--) {
                    let post = document.createElement("div");
                    post.classList.add("post");
                    post.id = data[i].Id;
                    let nameText = document.createElement("h3");
                    nameText.innerHTML = data[i].name + ` <span class="postDate">${data[i].date}</span>`;
                    post.append(nameText);
                    let msgText = document.createElement("p");
                    msgText.innerHTML = data[i].message;
                    post.append(msgText);
                    posts.append(post);
                }
                updateOverflowY()
                //promise is successful
                resolve(true);
            }).catch(err => {
                console.log(err);
                //promise is !successful
                reject(false);
            })
    })
}

export const _canSelectDivs = showData().then(function(boolean) { 
    return boolean;
});
function refreshBackgroundTheme(canSelectDivs) {
    if (canSelectDivs) {
        let postDivs = document.querySelectorAll(".post");
        //value that will be stored in local storage
        let darkMode = localStorage.getItem("darkMode");
        console.log(localStorage.getItem("darkMode"));
        if (darkMode === null) {
            darkMode = false;
        } else {
            darkMode = (darkMode === "true");
        }
        //revert back to looping through postDivs if any significant bugs
        function setColorTheme(darkMode) {
            postDivs = document.querySelectorAll(".post");
            if (darkMode) {
                document.body.classList.remove("lightMode");
                document.body.classList.add("darkMode");
                for(let i = 0; i < postDivs.legnth; i++) {
                postDivs[1].classList.remove("postLightMode");
                postDivs[1].classList.add("postDarkMode");
                }
                
            } else {
                document.body.classList.remove("darkMode");
                document.body.classList.add("lightMode");
                for(let i = 0; i < postDivs.length; i++) {
                postDivs[i].classList.remove("postDarkMode");
                postDivs[i].classList.add("postLightMode");
                }
                
            }
        }
        setColorTheme(darkMode);
    } else {
        postDivs = [];
    }
}
//async handler 
//import changeBackgroundTheme from '/bgMode.js';
let charAmountMsg = 0;
let charAmountUser = 0;
//capstone variables for the char amount functionality.
let maxMsgCharacters = 2000;
let maxUserCharacters = 100;
//boolean if clicked
let clicked = false;
function updateMsgVal() {
    let charCountMsg = document.getElementById("charCountMsg");
    let charCountUser = document.getElementById("charCountPost");
    charAmountMsg = document.getElementById("msgInput").value.length;
    charAmountUser = document.getElementById("userInput").value.length;
    charCountMsg.innerHTML = charAmountMsg + "/" + maxMsgCharacters;
    charCountUser.innerHTML = charAmountUser + "/" + maxUserCharacters;
    if(charAmountMsg > maxMsgCharacters) {
        charCountMsg.style.color = "#FF4500";
    } else if (charAmountMsg === 0 && clicked) {
        charCountMsg.style.color = "orange";
    }else {
        charCountMsg.style.color = '';
    }
    if(charAmountUser > maxUserCharacters) {
        charCountUser.style.color = "#FF4500";
    } else if (charAmountUser === 0 && clicked){
        charCountUser.style.color = "orange";
    } else {
        charCountUser.style.color = '';
    }
}
setInterval(updateMsgVal, 50);
async function refreshHandler() {
    if (userValue != "" && messageValue != "" && charAmountMsg <= maxMsgCharacters && charAmountUser <= maxUserCharacters) {
        await sendData(userValue, messageValue);
        messageValue = "";
        messageIn.value = "";
        //refresh content in the div instead of refreshing page
        let refreshDiv = document.querySelector(".posts");
        while (refreshDiv.firstChild) {
            refreshDiv.removeChild(refreshDiv.firstChild);
        }
        showData().then(function(bool) {
            refreshBackgroundTheme(bool);
            updateOverflowY()
        }).catch(err => {
            console.log(err);
        })
    } else {
        clicked = true;
    }
}
let refresh = document.getElementById("refresh");
refresh.addEventListener('click', refreshHandler);

function refreshDiv() {
    //refresh content in the div instead of refreshing page
    let refreshDiv = document.querySelector(".posts");
    while (refreshDiv.firstChild) {
        refreshDiv.removeChild(refreshDiv.firstChild);
    }
    showData();
}
//temp
/*
function refreshDiv2() {
    //refresh content in the div instead of refreshing page
    let refreshDiv = document.querySelector(".posts");
    let ghostDiv = document.createElement("div");
    let postStyle = getComputedStyle(refreshDiv.firstChild);
    let h3Style = getComputedStyle(refreshDiv.firstChild.children[0]);
    let pStyle = getComputedStyle(refreshDiv.firstChild.children[1]);
    let ghostHeight = postStyle.height;
    //may or may not use this value;
    let ghostMargin = {
        top: h3Style.marginTop,
        bottom: pStyle.marginBottom
    };
    console.log(ghostHeight);
    // Copy the style properties of the first child element of refreshDiv
    // to the ghostDiv element
    Object.assign(ghostDiv.style, refreshDiv.firstChild.style);
    // Replace the first child element with the ghostDiv element 
    ghostDiv.style.height = ghostHeight;
    ghostDiv.style.marginTop = ghostMargin.top;
    ghostDiv.style.marginBottom = ghostMargin.bottom;
    refreshDiv.replaceChild(ghostDiv, refreshDiv.firstChild);

    setTimeout(function() {
        refreshDiv.removeChild(ghostDiv);
    }, 1)

    showData2();
}
function showData2() {
    fetch("https://625af6e7-264e-4529-809d-af73d591ac9b-00-23lml8244ntak.janeway.replit.dev/api/history")
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data);
            let posts = document.querySelector(".posts");
            let post = document.createElement("div");
            post.classList.add("post");
            let nameText = document.createElement("h3");
            nameText.innerHTML = data[data.length - 1].name;
            post.append(nameText);
            let msgText = document.createElement("p");
            msgText.innerHTML = data[data.length - 1].message;
            post.append(msgText);
            posts.prepend(post);

        })
}
*/

//brute force mode functionality
function refreshDiv3() {
    let refreshDiv = document.querySelector(".posts");
    let firstChild = refreshDiv.firstChild;
    showData3().then(data => {
        if (data.Id != 0) {
            if (firstChild.id != data.Id && firstChild.children[1] != data.message) {
                //if message is different then append the last comment second to the firstChild
                const _posts = document.querySelector(".posts");
                let newPost = document.createElement("div");
                newPost.classList.add("post");
                newPost.id = firstChild.id;
                let new_h3 = document.createElement('h3');
                new_h3.innerHTML = firstChild.children[0].innerHTML + ` <span class="postDate"> ${firstChild.children[0].children[0].innerHTML} </span>`;
                newPost.append(new_h3);
                let new_p = document.createElement('p');
                new_p.innerHTML = firstChild.children[1].innerHTML;
                newPost.append(new_p);
                _posts.insertBefore(newPost, _posts.firstChild.nextSibling);

                //change firstChild div
                firstChild.children[0].innerHTML = data.name + ` <span class="postDate">${data.date}</span>`;
                firstChild.children[1].innerHTML = data.message;
                firstChild.id = data.Id;
                updateOverflowY()
                refreshBackgroundTheme(true);
            } else {
                //onsole.log("up to date");
            }
        }
    });
}
function showData3() {
    return new Promise((resolve, reject) => {
        //this endpiont returns an array of the last 2 element of the comment object array aka the 2 most recent posts.
        fetch("https://625af6e7-264e-4529-809d-af73d591ac9b-00-23lml8244ntak.janeway.replit.dev/api/history/last")
            .then(function(response) {
                return response.json();
            }).then(function(data) {
                //console.log(data);
                if (data.length > 0) {
                    resolve({ name: data[data.length - 1].name, message: data[data.length - 1].message, Id: data[data.length - 1].Id, date: data[data.length - 1].date });
                } else {
                    resolve({ name: 0, message: 0, Id: 0, date: 0 })
                }
            }).catch(err => {
                reject(err);
            })
    })
}
//brute force toggle
const toggle = document.getElementById('toggler');
document.getElementById('toggler').checked = true;

let timer = setInterval(refreshDiv3, 300);
/*
if (localStorage.getItem("checked") === "true") {
    toggle.checked = true;
    timer = setInterval(refreshDiv3, 300);
} else {
    //toggle.checked = false;
    //clearInterval(timer);
}

toggle.addEventListener('change', function() {
    if (toggle.checked) {
        timer = setInterval(refreshDiv3, 300);
    } else {
        //clearInterval(timer);
    }
    localStorage.setItem("checked", toggle.checked);
});
*/
