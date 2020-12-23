 "use strict";

 const body = document.querySelector("body");

 const paper = document.querySelector(".paper");
 const scissors = document.querySelector(".scissors");
 const rock = document.querySelector(".rock");
 const lizard = document.querySelector(".lizard");
 const spock = document.querySelector(".spock");

 const modal = document.getElementById("modal");
 const rules = document.getElementById("rules");
 const close = document.getElementById("close");

 const content = document.querySelector(".content");
 const contentDiv = document.querySelectorAll(".content .image-div");
 const game = document.getElementById("game");

 rules.addEventListener("click", () => {
     modal.style.display = "block";
 });

 close.addEventListener("click", () => {
     modal.style.display = "none";
 });

 let counter = document.getElementById("score-score");
 let score = 0;

 //* Div with images

 const gameDiv = document.querySelectorAll("#game .image-div");
 gameDiv.forEach(div => {
     //  console.log(div.classList);
 });

 let getRes = "";
 contentDiv.forEach(div => {
     div.addEventListener("click", (e) => {
         content.style.display = "none";
         game.style.display = "flex";
         getRes = div.outerHTML;
         gameDiv.forEach(div => {
             if (div.classList.contains("player")) {
                 div.innerHTML = getRes;

             }
         });
         setTimeout(houseDiv, 300);
     });

 });

 const house = document.querySelector("#house .image-div");

 function houseDiv() {
     let chooseDiv = Math.floor(Math.random() * 5);
     house.innerHTML = contentDiv[chooseDiv].outerHTML;
     compare();
 };

 const playAgain = document.getElementById("play-again");

 playAgain.addEventListener("click", () => {
     content.style.display = "flex";
     game.style.display = "none";
     message.style.display = "none";
     win.style.display = "none";
     lose.style.display = "none";
     gameDiv[1].innerHTML = "";
 });

 const message = document.getElementById("message");
 const win = message.querySelector("#win");
 const lose = message.querySelector("#lose");

 function hide() {
     win.style.display = "none";
     lose.style.display = "none";
 }

 function compare() {
     const player = document.getElementById("player");
     const house = document.getElementById("house");
     let playerData = player.children[1].children[0].dataset.beat;
     let houseData = house.children[1].children[0].dataset.beat;
     let playerClass = player.children[1].children[0].classList[1];
     let houseClass = house.children[1].children[0].classList[1];

     let playerRegEx = new RegExp(`${playerClass}`);
     let houseRegEx = new RegExp(`${houseClass}`);
     if (playerData.match(houseRegEx)) {
         message.style.display = "block";
         win.style.display = "block";
         score++;
         counter.innerText = score;
         player.children[1].children[0].classList.toggle("good");
     } else if (houseData.match(playerRegEx)) {
         message.style.display = "flex";
         lose.style.display = "block";
         score--;
         counter.innerText = score;
         house.children[1].children[0].classList.toggle("good");
     } else {
         message.style.display = "flex";
         win.style.display = "none";
         lose.style.display = "none"
     }
 };