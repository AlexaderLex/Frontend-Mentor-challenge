 "use strict";

 const api = "country-api.json";
 const restAPI = "https://restcountries.eu/rest/v2/all";

 // TODOs:
 //todo API call
 //todo Theme toggle
 //todo Search
 //todo Filter
 //todo Modal
 //

 const countriesEl = document.getElementById("countries");
 const toggleBtn = document.getElementById("toggle");
 const filterBtn = document.getElementById("filter");
 const regionFilter = filterBtn.querySelectorAll("li");
 const searchEl = document.getElementById("search");
 const modal = document.getElementById("modal");
 const closeBtn = document.getElementById("close");

 getCountries();

 async function getCountries() {
     const res = await fetch(api);
     const countries = await res.json();
     displayCountries(countries);
 };


 function displayCountries(countries) {
     countriesEl.innerHTML = "";
     countries.forEach(country => {
         const countryEl = document.createElement("div");
         countryEl.className = "card";

         countryEl.innerHTML = `
                <div class="country-header">
                    <img src=${country.flag} alt=${country.name}>
                </div>
                <div class="card-body">
                    <h2 class="name" data-cioc="${country.cioc}">${country.name}</h2>
                    <p class="population"><strong>Population: </strong>${country.population.toLocaleString()}</p>
                    <p class="region"><strong>Region: </strong>${country.region}</p>
                    <p class="capital"><strong>Capital: </strong>${country.capital}</p>
                </div>
     `;  
         
         countriesEl.appendChild(countryEl);
         countryEl.addEventListener("click", () => {

             if (window.innerWidth >= 900) {
                 modal.style.display = "grid";
             } else {
                 modal.style.display = "block";
             }

             fillModal(country, countries);
         });
     });
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        const capital = card.querySelector(".capital");
        if (capital.innerText.includes("undefined")) {
            capital.innerHTML = `<strong>Capital: </strong>none`;
        }
    })

 };

 //* Toggle theme - dark & light

 toggleBtn.addEventListener("click", () => {
     document.body.classList.toggle("dark")
 });

 //*  Open list of Regions

 filterBtn.addEventListener("click", () => {
     filterBtn.classList.toggle("open");

 });

 //* Close Modal Window

 closeBtn.addEventListener("click", () => {
     modal.style.display = "none";
 });

 //*  Search countries by names
 searchEl.addEventListener("input", (e) => {
     const val = e.target.value;
     let names = document.querySelectorAll(".name");
     names.forEach(name => {
         if (name.innerText.toLowerCase().includes(val.toLowerCase())) {
             name.parentElement.parentElement.style.display = "block"
         } else {
             name.parentElement.parentElement.style.display = "none"
         }

     });
 });

 //* Add a filter on the li elements (regions)

 regionFilter.forEach(filter => {
     const value = filter.innerText;
     filter.addEventListener("click", () => {
         const regions = document.querySelectorAll(".region");
         regions.forEach(region => {

             if (region.innerText.includes(value) || value === "All") {
                 region.parentElement.parentElement.style.display = "block";
                 modal.style.display = "none";
             } else {
                 region.parentElement.parentElement.style.display = "none"
             }
         });
     });
 });

 var countryBorders = [];

 function fillModal(country, countries) {
     let num = 249;
     modal.querySelector("img").setAttribute("src", country.flag);
     modal.querySelector(".country-name").innerHTML = country.name;
     //  modal.querySelector(".name").setAttribute("dataCioc", country.cioc);
     modal.querySelector(".native-name").innerHTML = `<strong>Native Name: </strong><span>${country.nativeName}</span>`;
     modal.querySelector(".population").innerHTML = `<strong>Population: </strong><span>${country.population.toLocaleString()}</span>`;
     modal.querySelector(".region").innerHTML = `<strong>Region: </strong><span>${country.region}</span>`;
     modal.querySelector(".sub-region").innerHTML = `<strong>Sub Region: </strong><span>${country.subregion}</span>`;

     if (country.name === "Antarctica") {
         modal.querySelector(".capital").innerHTML = `<strong>Capital: </strong><span>none</span>`;
     } else {
        modal.querySelector(".capital").innerHTML = `<strong>Capital: </strong><span>${country.capital}</span>`;
     }

     modal.querySelector(".domain").innerHTML = `<strong>Top Level Domain: </strong><span style="font-weight: 600;"><blue>${country.topLevelDomain[0]}</blue></span>`;

     if (country.name === "Antarctica") {
         modal.querySelector(".currency").innerHTML = `<strong>Currencies: </strong> <span>none</span>`;
     } else {
          if (country.currencies.length == "1") {
         modal.querySelector(".currency").innerHTML = `<strong>Currencies: </strong> <span> Name: <blue style="">${country.currencies[0].name}</blue></span> Code: <blue style="">${country.currencies[0].code}</blue><span> Simbol: <blue style="">${country.currencies[0].symbol}</blue></span>`;
     } else {
         modal.querySelector(".currency").innerHTML = `<strong>Currencies: </strong><span>${country.currencies.map(currency => currency.name).join(", ")}</span>`;
     }
     if (country.languages.length == "1") {
         modal.querySelector(".language").innerHTML = `<strong>Languages: </strong><span>${country.languages[0].name}</span>`;
     } else {
         modal.querySelector(".language").innerHTML = `<strong>Languages: </strong><span>${country.languages.map(language => language.name).join(", ")}</span>`;
     }

     if (country.borders !== undefined) {
         if (country.borders.length == "1") {
            modal.querySelector(".border").innerHTML = `<strong>Borders: </strong><p id="cioc" style="display: inline-block;"></p>`;
            getBorder(country);
        } else if (country.borders.length == "0") {
            modal.querySelector(".border").innerHTML = `<strong>Borders: </strong><span>None</span>`;
        } else {
            modal.querySelector(".border").innerHTML = `<strong>Borders: </strong><p id="cioc" style="display: inline-block;"></p>`;
            getBorder(country);
        }
     } else if (country.borders == undefined) {
          modal.querySelector(".border").innerHTML = `<strong>Borders: </strong><span>none</span>`;
     }
};

     function getBorder(country) {
         country.borders.forEach(border => {
             countries.forEach(coun => {
                 if (coun.alpha3Code == border) {
                     let cioc = document.getElementById("cioc");
                     cioc.innerHTML += `<span>${coun.name}</span>`;
                 }
             })
         })
     };
 };

//  window.addEventListener("unload", function(e) {
//      localStorage.removeItem("countriesObject");
//  });

const cObj = JSON.parse(localStorage.getItem("countriesObject"));

cObj.forEach(country => {
    
});

