const cardData = {
    cardholderName: {
        input: document.querySelector("#card-holder-name"),
        error: document.querySelector("#card-holder-name-error"),
        display: document.querySelector(".card .card-holder-name"),
    },
    cardNumber: {
        input: document.querySelector("#card-number"),
        error: document.querySelector("#card-number-error"),
        display: document.querySelector(".card .card-number"),
        digits: document.querySelectorAll(".card .card-number .card-digit"),
    },
    expiryMonth: {
        input: document.querySelector("#card-expiry-month"),
        error: document.querySelector("#card-expiry-date-error"),
        display: document.querySelector(".card .card-expiry-month"),
    },
    expiryYear: {
        input: document.querySelector("#card-expiry-year"),
        error: document.querySelector("#card-expiry-date-error"),
        display: document.querySelector(".card .card-expiry-year"),
    },
    cvc: {
        input: document.querySelector("#card-cvc"),
        error: document.querySelector("#card-cvc-error"),
        display: document.querySelector(".card .card-cvc"),
        digits: document.querySelectorAll(".card .card-cvc>.card-cvc-digit"),
    },
};

function updateCardDisplay(input, error, display) {
    input.addEventListener("input", () => {
        matchPattern(input);
        setValues(input.value, display);
        error.textContent = "";
    });
}

function matchPattern(input) {
    switch (input.id) {
        case cardData.cardholderName.input.id:
            if (!input.value.match(/^[a-zA-Z ]{0,21}$/)) {
                input.value = input.value.slice(0, -1);
            }
            break;
        case cardData.cardNumber.input.id:
            let newInput = "";
            const valArray = Array.from(input.value);
            valArray.map((char, index) => {
                if (
                    (index + 1) % 5 === 0 &&
                    index > 0 &&
                    index < 19 &&
                    char !== " "
                ) {
                    newInput += " " + char;
                } else {
                    newInput += char;
                }
            });
            input.value = newInput;
            if (!input.value.match(/^.{0,19}$/)) {
                input.value = input.value.slice(0, -1);
            }
            break;
        case cardData.expiryMonth.input.id:
            // Regular expression to match two digit month number starting from 1 to 12
            if (!input.value.match(/^(0?[0-9]|1[0-2])$/)) {
                input.value = input.value.slice(0, -1);
            }
            break;
        case cardData.expiryYear.input.id:
            // Regular expression to match two digit year number starting from 20 to 99
            if (!input.value.match(/^[2-9]?[0-9]$/)) {
                input.value = input.value.slice(0, -1);
            }
            break;
        case cardData.cvc.input.id:
            if (!input.value.match(/^.{0,3}$/)) {
                input.value = input.value.slice(0, -1);
            }
            break;
    }
}

function setValues(value, display) {
    switch (display) {
        case cardData.cardholderName.display:
            if (!value || value.length === 0) value = "Jane Appleseed";
            display.textContent = value;
            break;
        case cardData.expiryMonth.display:
        case cardData.expiryYear.display:
            if (!value || value.length === 0) value = "00";
            display.textContent = value;
            break;
        case cardData.cardNumber.display:
            value = value.replace(/\s/g, "");
            for (let i = 0; i < cardData.cardNumber.digits.length; i++) {
                cardData.cardNumber.digits[i].textContent = value[i] ?? "0";
            }
            break;
        case cardData.cvc.display:
            for (let i = 0; i < cardData.cvc.digits.length; i++) {
                cardData.cvc.digits[i].textContent = value[i] ?? "0";
            }
            break;
    }
}

updateCardDisplay(
    cardData.cardholderName.input,
    cardData.cardholderName.error,
    cardData.cardholderName.display
);
updateCardDisplay(
    cardData.cardNumber.input,
    cardData.cardNumber.error,
    cardData.cardNumber.display
);
updateCardDisplay(
    cardData.expiryMonth.input,
    cardData.expiryMonth.error,
    cardData.expiryMonth.display
);
updateCardDisplay(
    cardData.expiryYear.input,
    cardData.expiryYear.error,
    cardData.expiryYear.display
);
updateCardDisplay(cardData.cvc.input, cardData.cvc.error, cardData.cvc.display);

cardData.expiryMonth.input.addEventListener("change", () => {
    // Convert the month to a two digit number
    cardData.expiryMonth.input.value =
        cardData.expiryMonth.input.value.padStart(2, "0");
    cardData.expiryMonth.display.textContent = cardData.expiryMonth.input.value;
});
cardData.expiryYear.input.addEventListener("change", () => {
    cardData.expiryYear.input.value = cardData.expiryYear.input.value.padStart(
        2,
        "0"
    );
    cardData.expiryYear.display.textContent = cardData.expiryYear.input.value;
});

const form = document.querySelector("form");
const main = document.querySelector("main");
const continueButton = document.querySelector("#continue");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let error = false;

    const nameError = !isValidCardholderName();
    const numberError = !isValidNumber();
    const expiryDateError = !isValidExpiryDate();
    const cvcError = !isValidCVC();
    error = nameError || numberError || expiryDateError || cvcError;

    for (let key in cardData) {
        if (!cardData[key].input.value) {
            cardData[key].error.textContent = "Can't be blank";
            error = true;
        }
    }
    if (error) return;
    submitForm();
});

function isValidCardholderName() {
    const name = cardData.cardholderName.input.value;
    if (!name.match(/^[a-zA-Z ]{0,21}$/)) {
        cardData.cardholderName.error.textContent = "Wrong format, letters and spaces only";
        return false;
    }
    return true;
}

function isValidNumber() {
    const number = cardData.cardNumber.input.value.replace(/\s/g, "");
    console.log(number);
    if (number.length !== 16) {
        cardData.cardNumber.error.textContent = "Card number must be 16 digits long";
        return false;
    }
    if (!number.match(/^\d{16}$/)) {
        cardData.cardNumber.error.textContent = "Wrong format, numbers only";
        return false;
    }
    return true;
}

function isValidExpiryDate() {
    const month = cardData.expiryMonth.input.value;
    const year = cardData.expiryYear.input.value;
    const date = new Date();
    const currentYear = date.getFullYear().toString().slice(2);
    const currentMonth = (date.getMonth() + 1).toString().padStart(2, "0");
    if (!month.match(/^(0?[0-9]|1[0-2])$/)) {
        cardData.expiryMonth.error.textContent = "Wrong format, numbers only";
        return false;
    }
    if (!year.match(/^[2-9]?[0-9]$/)) {
        cardData.expiryYear.error.textContent = "Wrong format, numbers only";
        return false;
    }
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        cardData.expiryYear.error.textContent = "Card expired";
        return false;
    }
    return true;
}
function isValidCVC() {
    const cvc = cardData.cvc.input.value;
    if (!cvc.match(/^\d{3}$/)) {
        cardData.cvc.error.textContent = "Wrong format, numbers only";
        return false;
    }
    return true;
}

function submitForm() {
    main.classList.add("submitted");
    form.reset();
}

function clearDisplay() {
    cardData.cardholderName.display.textContent = "Jane Appleseed";
    cardData.cardNumber.digits.forEach((digit) => (digit.textContent = "0"));
    cardData.expiryMonth.display.textContent = "00";
    cardData.expiryYear.display.textContent = "00";
    cardData.cvc.digits.forEach((digit) => (digit.textContent = "0"));
}

continueButton.addEventListener("click", () => {
    main.classList.remove("submitted");
    clearDisplay();
});
