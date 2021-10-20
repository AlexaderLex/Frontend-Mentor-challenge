 "use strict";

 const questions = document.querySelectorAll(".question");
 const answers = document.querySelectorAll(".answer");
 const textDiv = document.querySelectorAll(".text-div-part");
 const arrow = document.querySelector(".arrow");


 questions.forEach(el => {
     el.addEventListener("click", (e) => {
         textDiv.forEach(el => {
             if (el.children[1].classList.contains("active")) {
                 el.children[1].classList.remove("active");
                 el.children[0].style.color = "var(--grey)";
                 el.children[2].style.transform = "rotate(45deg)";
             }
         });
         e.target.style.color = "var(--dark)"
         el.parentNode.children[2].style.transform = "rotate(-135deg)";

     });
 });



 textDiv.forEach(el => {
     el.children[0].addEventListener("click", e => {
         el.children[1].classList.add("active");
     })
 });

 //  textDiv.forEach(el => {
 //      if (el.children[1].classList.contains("active")) {
 //          el.children[1].classList.remove("active");
 //      }

 //  });

 console.log(arrow)