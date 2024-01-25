const form = document.querySelector("form");

const input = {
    day: document.querySelector("#day"),
    month: document.querySelector("#month"),
    year: document.querySelector("#year"),
};

const result = {
    day: {
        unit: document.querySelector(".day-unit"),
        num: document.querySelector(".day-num"),
    },
    month: {
        unit: document.querySelector(".month-unit"),
        num: document.querySelector(".month-num"),
    },
    year: {
        unit: document.querySelector(".year-unit"),
        num: document.querySelector(".year-num"),
    },
};

const label = {
    day: document.querySelector(".day-label"),
    month: document.querySelector(".month-label"),
    year: document.querySelector(".year-label"),
};

const error = {
    day: document.querySelector(".day-error"),
    month: document.querySelector(".month-error"),
    year: document.querySelector(".year-error"),
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const isDay = isValidDay(input.day.value);
    const isMonth = isValidMonth(input.month.value);
    const isYear = isValidYear(input.year.value);
    const isDate = isValidDate(
        input.day.value,
        input.month.value,
        input.year.value
    );
    if (isDay && isMonth && isYear && isDate) {
        console.log("Valid date");
        calculateAge(input.day.value, input.month.value, input.year.value);
    }
});

const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
};

function showError(labelElement, errElement, message) {
    errElement.textContent = message;
    labelElement.classList.add("error");
    clearResult();
    // setTimeout(() => {
    //     element.textContent = "";
    // }, 5000);
}

function clearError() {
    error.day.textContent = "";
    error.month.textContent = "";
    error.year.textContent = "";
    label.day.classList.remove("error");
    label.month.classList.remove("error");
    label.year.classList.remove("error");
    clearResult();
}

function clearResult() {
    result.day.num.textContent = "- -";
    result.month.num.textContent = "- -";
    result.year.num.textContent = "- -";
    result.day.unit.textContent = "days";
    result.month.unit.textContent = "months";
    result.year.unit.textContent = "years";
}

function calculateAge(birthDay, birthMonth, birthYear) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    // Calculate years
    let years = currentYear - birthYear;
    if (
        currentMonth < birthMonth ||
        (currentMonth === birthMonth && currentDay < birthDay)
    ) {
        years--;
    }

    // Calculate months
    let months = currentMonth - birthMonth;
    if (currentDay < birthDay) {
        months--;
    }
    if (months < 0) {
        months += 12;
    }

    // Calculate days
    let days = currentDay - birthDay;
    if (days < 0) {
        days += daysInMonth(
            currentMonth - 1 === 0 ? 12 : currentMonth - 1,
            currentYear
        );
    }
    setNumber(result.day.num, days);
    setNumber(result.month.num, months);
    setNumber(result.year.num, years);
    result.day.unit.textContent = days === 1 ? "day" : "days";
    result.month.unit.textContent = months === 1 ? "month" : "months";
    result.year.unit.textContent = years === 1 ? "year" : "years";
}

function setNumber(element, number) {
    let i = 0;
    element.textContent = i;
    const interval = setInterval(() => {
        if (i > number) {
            clearInterval(interval);
            return;
        }
        element.textContent = i++;
    }, 2000/number);
}

function isValidDay(day) {
    if (!day) {
        showError(label.day, error.day, "This field is required");
        return false;
    }
    if (day < 1 || day > 31) {
        showError(label.day, error.day, "Must be a valid Day");
        return false;
    }
    return true;
}

function isValidMonth(month) {
    if (!month) {
        showError(label.month, error.month, "This field is required");
        return false;
    }
    if (month < 1 || month > 12) {
        showError(label.month, error.month, "Must be a valid Month");
        return false;
    }
    return true;
}

function isValidYear(year) {
    if (!year) {
        showError(label.year, error.year, "This field is required");
        return false;
    }
    if (year < 1) {
        showError(label.year, error.year, "Must be a valid Year");
        return false;
    }
    if (year > new Date().getFullYear()) {
        showError(label.year, error.year, "Must be in the past");
        return false;
    }
    return true;
}

function isValidDate(day, month, year) {
    if (daysInMonth(month, year) < day && day <= 31) {
        showError(label.day, error.day, "Must be a valid date");
        showError(label.month, error.month, "");
        showError(label.year, error.year, "");
        return false;
    }
    if (
        (year == new Date().getFullYear() &&
            month > new Date().getMonth() + 1) ||
        (year == new Date().getFullYear() &&
            month == new Date().getMonth() + 1 &&
            day > new Date().getDate())
    ) {
        showError(label.day, error.day, "Must be a date in the past");
        showError(label.month, error.month, "");
        showError(label.year, error.year, "");
        return false;
    }
    return true;
}

input.day.addEventListener("input", () => {
    input.day.value = input.day.value.replace(/[^0-9]/g, "");
    if (input.day.value.length > 2) {
        input.day.value = input.day.value.slice(0, 2);
    }
    clearError();
});

input.month.addEventListener("input", () => {
    input.month.value = input.month.value.replace(/[^0-9]/g, "");
    if (input.month.value.length > 2) {
        input.month.value = input.month.value.slice(0, 2);
    }
    clearError();
});

input.year.addEventListener("input", () => {
    input.year.value = input.year.value.replace(/[^0-9]/g, "");
    if (input.year.value.length > 4) {
        input.year.value = input.year.value.slice(0, 4);
    }
    clearError();
});

input.day.addEventListener("change", () => {
    input.day.value = input.day.value.padStart(2, "0");
});

input.month.addEventListener("change", () => {
    input.month.value = input.month.value.padStart(2, "0");
});

input.year.addEventListener("change", () => {
    input.year.value = input.year.value.padStart(4, "0");
});
