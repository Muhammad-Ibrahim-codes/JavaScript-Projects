const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


const dropdownSelects = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const message = document.querySelector(".msg");

for(let select of dropdownSelects) {  
    for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "from" && currCode === "USD") {
        newOption.selected = "selected";
    }else if(select.name === "to" && currCode === "PKR") {
        newOption.selected = "selected";
    }
    select.append(newOption);
 }
     select.addEventListener("change", (Event) => {
        updateFlag(Event.target);
 });
}

const updateFlag = (element) => {
 let currCode = element.value;
 let countryCode = countryList[currCode];
 let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
 let img = element.parentElement.querySelector("img");
 img.src = newSrc;
}

updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if(amountValue === "" || amountValue < 1) {
        amountValue = 1;
    }
    
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmount = amountValue * rate;
    message.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

button.addEventListener("click", (Event) => {
      Event.preventDefault();
      updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
})

