const dropdowns = document.querySelectorAll("select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector("select[name='from']");
const toCurr = document.querySelector("select[name='to']");
const msg = document.querySelector(".message");
const amountInput = document.querySelector("input");


// Populate Dropdowns
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");

    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    }

    if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}


// Update Flag
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];

  let img = element.parentElement.querySelector("img");

  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};


// API Base URL
const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


// Fetch Exchange Rate
const updateExchangeRate = async () => {
  let amount = amountInput.value;

  if (amount === "" || amount < 1) {
    amount = 1;
    amountInput.value = "1";
  }

  const from = fromCurr.value.toLowerCase();
  const to = toCurr.value.toLowerCase();

  const URL = `${BASE_URL}/${from}.json`;

  try {
    const response = await fetch(URL);
    const data = await response.json();

    let rate = data[from][to];

    let finalAmount = amount * rate;

    msg.innerHTML = ` ${amount} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
  } 
  catch (error) {
    msg.innerText = "Something went wrong!";
    console.log(error);
  }
};


// Button Click
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});


// Page Load
window.addEventListener("load", () => {
  updateExchangeRate();
});