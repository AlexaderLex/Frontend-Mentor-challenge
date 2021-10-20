"use strict";

const navListMobile = document.getElementById("nav-list-mobile");
const showList = document.getElementById("show-list");
const warning = document.querySelector(".warning");
const inputURL = document.getElementById("input-url");
const shortenButton = document.getElementById("btn-shorten");
const linkDiv = document.querySelector(".link-div");
const errorPar = document.querySelector(".error");

// localStorage.removeItem("originURL");
// localStorage.removeItem("shortURL");

function checkItems() {
    let checkOrigin = localStorage.getItem("originURL");
    let checkShort = localStorage.getItem("shortURL");
    if (checkOrigin === null && checkShort === null) {
        localStorage.setItem("shortURL", "");
        localStorage.setItem("originURL", "");
    }
}
checkItems();

showList.addEventListener("click", (e) => {
    navListMobile.classList.toggle("show");
});

const start = "https://api.shrtco.de/v2/shorten?url=";
const linkInfo = "https://api.shrtco.de/v2/info?code=";

shortenButton.addEventListener("click", getShort);

function getShort() {
    const url = inputURL.value;
    checkInput();
    const res = fetch(start + url);
    const dataRes = res.then(res => res.json()).then(d => {
        const data = d;
        if (data.ok) {
            console.log(data);
            fillStorage(data);
            errorPar.style.display = "none";
        } else {
            // console.log(data);
            // console.log(data.error_code);
            // console.log(data.error);
            errorPar.style.display = "block"
            errorPar.innerText = data.error;
        }
    });
};

function fillStorage(data) {
    let sumShort = localStorage.getItem("shortURL");
    localStorage.setItem("shortURL", sumShort + [data.result.short_link] + ",");
    let sumOrigin = localStorage.getItem("originURL");
    localStorage.setItem("originURL", sumOrigin + [data.result.original_link] + ",");
    startToFill();
};

function startToFill() {
    let itemsCount = localStorage.getItem("originURL").split(",");
    linkDiv.innerHTML = "";
    for (let x = 0; x < itemsCount.length - 1; x++) {
        linkDiv.insertAdjacentElement("afterbegin", fillTheDiv(x));
    }
    if (itemsCount.length > 1) {
        const linkWrapper = document.getElementById("link-wrapper");
        linkWrapper.style.height = "380px";
    }
    inputURL.value = "";
    copyToClipBoard();
};

const exampleImg = "https://www.thewowstyle.com/beautiful-nature-images-free-to-download/";


function fillTheDiv(count) {
    let shortUrlArray = localStorage.getItem("shortURL");
    let shortItem = shortUrlArray.split(",");

    let originUrlArray = localStorage.getItem("originURL");
    let originItem = originUrlArray.split(",");

    let linkDivItem = document.createElement("div");
    let originalLink = document.createElement("span");
    let shortenLink = document.createElement("span");
    let copyButton = document.createElement("button");
    let borderSpan = document.createElement("span");
    let shortHref = document.createElement("a");
    linkDivItem.className = "link-div-item";
    originalLink.className = "original-link";
    shortenLink.className = "shorten-link";
    shortHref.setAttribute("target", "_blank");
    if (originItem.length > 1) {
        originalLink.innerText = originItem[count];
        shortHref.setAttribute("href", "//" + shortItem[count]);
        shortHref.innerText = shortItem[count];
        shortenLink.append(shortHref);
        copyButton.classList = "btn btn-copy";
        copyButton.innerText = "Copy";
        borderSpan.className = "border";
        linkDivItem.append(originalLink, shortenLink, copyButton, borderSpan);
    }
    return linkDivItem;
};

function getLength() {
    const array = localStorage.getItem("shortURL").split(",");
    let lengthNum = array.length;
    return lengthNum;
};
getLength();

const lengthCount = getLength();
let addElement = fillTheDiv(lengthCount);

function copyToClipBoard() {
    const copyButtons = document.querySelectorAll(".btn-copy");

    copyButtons.forEach(button => {
        button.addEventListener("click", function(e) {
            let targetText = button.parentElement.children[1].querySelector("a").getAttribute("href");
            navigator.clipboard.writeText(targetText);
            e.target.style.backgroundColor = "var(--prime-violet)";
            e.target.innerText = "Copied!";
            setTimeout(goBack, 2500);
        });
    });
};

function goBack() {
    const linkItem = document.querySelectorAll(".link-div-item");
    linkItem.forEach(link => {
        link.children[2].style.backgroundColor = "var(--prime-cyan)";
        link.children[2].innerText = "Copy";
    });
};

function checkInput() {
    if (inputURL.value === "") {
        warning.style.visibility = "visible";
    } else {
        warning.style.visibility = "hidden";
    }
};

// let origArray = localStorage.getItem("originURL").split(",");

// console.log(origArray);

window.addEventListener("onload", startToFill());


//* *** link info */

function getLinkInfo() {
    const url = inputURL.value;
    const infoRes = fetch(linkInfo + url);
    const dataInfo = infoRes.then(res => res.json()).then(dataObj => {
        const data = dataObj;
        console.log(data);
    })
};

//* ********** */
// ** Get all localStorage items to the object
function allStorage() {
    let archive = {};
    let keys = Object.keys(localStorage);
    let i = keys.length;

    for (let x = 0; x < keys.length; x++) {
        archive[keys[x]] = localStorage.getItem(keys[x]);
    }
    return { archive, keys }
}

let fullStorage = allStorage();

//* ********** */