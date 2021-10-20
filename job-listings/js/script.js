"use strict";

const content = document.querySelector(".content");
const buttons = document.querySelectorAll(".btn");
const selects = document.querySelectorAll("select");
const clear = document.querySelector(".clear");

const job = document.querySelector("#job");
const level = document.querySelector("#level");
const language = document.querySelector("#language");
const tool = document.querySelector("#tool");

const dataJson = "../js/data.json"

for (let x = 0; x < buttons.length; x++) {
    let button = buttons[x];
    button.addEventListener("click", (e) => {
        selects[x].selectedIndex = 0;
    });
};

clear.addEventListener("click", (e) => {
    selects.forEach(select => {
        select.selectedIndex = 0;
    });
});

async function getData() {
    const res = await fetch(dataJson);
    const data = await res.json();

    for (let x = 0; x < data.length; x++) {
        let section = document.createElement("section");
        let element = data[x];
        section.innerHTML = `
    <img src=${element.logo} alt="Company Logo">
    <div class="job">
                <div>
                    <h4 class="name">${element.company}</h4>
                    <span class="new">${element.new}</span>
                    <span class="featured">${element.featured}</span>
                </div>
                <div>
                    <span class="title">${element.position}</span>
                </div>
                <div class="details">
                    <span class="days">${element.postedAt}</span> <span class="dot"></span>
                    <span class="part">${element.contract}</span> <span class="dot"></span>
                    <span class="location">${element.location}</span>
                </div>
            </div> 
             `;
        const lang = document.createElement("div");
        lang.className = "lang";
        lang.innerHTML = `<span class="name role">${element.role}</span>`;
        lang.innerHTML += `<span class="name level">${element.level}</span>`;
        element.languages.forEach(el => {
            lang.innerHTML += `<span class="name">${el}</span>`;
        });
        element.tools.forEach(el => {
            lang.innerHTML += `<span class="name">${el}</span>`
        });
        section.appendChild(lang);
        content.appendChild(section);
        let newEl = section.querySelector(".new");
        if (element.new) {
            newEl.innerHTML = "New!";
        } else {
            newEl.style.display = "none";
        }
        let featuredEl = section.querySelector(".featured");
        if (element.featured) {
            featuredEl.innerHTML = "Featured";
        } else {
            featuredEl.style.display = "none";
        }
    };
};

getData();

selects.forEach(select => {
    select.addEventListener("change", () => {
        console.log(select.name + " - " + select.value);
        let section = document.querySelectorAll("section");
        section.forEach(el => {
            let langStr = el.querySelector(".lang").innerText;

            if (langStr.includes(job.value)) {
                el.style.display = "flex";
            } else if (langStr.includes(language.value)) {
                el.style.display = "flex";
            } else if (langStr.includes(tool.value)) {
                el.style.display = "flex";
            } else if (level.value === el.querySelector(".level").innerText) {
                el.style.display = "flex";
            } else {
                el.style.display = "none";
            }
        });
    });
});

clear.addEventListener("click", (e) => {
    let section = document.querySelectorAll("section");
    section.forEach(el => {
        el.style.display = "none";
    });
});