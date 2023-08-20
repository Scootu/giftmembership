const mainSection = document.querySelector(".gift_memberships");
const orderNowBtn = document.querySelector(".order_btn");
const giftPricesInputs = document.querySelectorAll('input[name="price"]');
const themeToggleButton = document.querySelector(".theme_btn");

const paymentsSection = document.querySelector(".payments");
const paymentMethodsInput = document.querySelectorAll(
  'input[name="payment_method"]'
);
const paymentForms = document.querySelectorAll("form[data-form]");
const confirmPaymentBtns = document.querySelectorAll(".confirm_payment_btn");
const returnToGiftsBtns = document.querySelectorAll(".return_btn");

const successPopup = document.querySelector(".success_popup");

const timeOutValues = [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000];
let selectedGiftName = undefined;
let selectedGiftPrice = undefined;
let selectedPaymentMethod = "visa";

const goToMainSection = () => {
  mainSection.style.transform = "translateX(0)";
  paymentsSection.style.transform = "translateX(100vw)";
};

const goToPayment = () => {
  mainSection.style.transform = "translateX(-100vw)";
  paymentsSection.style.transform = "translateX(0)";
  paymentsSection.querySelector(
    ".payment_info span:nth-of-type(1)"
  ).textContent = selectedGiftName;
  paymentsSection.querySelector(
    ".payment_info span:nth-of-type(2)"
  ).textContent = selectedGiftPrice;
};

const showSuccess = () => {
  paymentsSection.style.transform = "translateX(-100vw)";
  successPopup.style.transform = "translateX(0)";
  setTimeout(() => {
    successPopup.innerHTML = `
        <svg width="175px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="1.8">
            <path d="M9 10L12.2581 12.4436C12.6766 12.7574 13.2662 12.6957 13.6107 12.3021L20 5" stroke="#00ff00" stroke-linecap="round"></path>
            <path d="M21 12C21 13.8805 20.411 15.7137 19.3156 17.2423C18.2203 18.7709 16.6736 19.9179 14.893 20.5224C13.1123 21.1268 11.187 21.1583 9.38744 20.6125C7.58792 20.0666 6.00459 18.9707 4.85982 17.4789C3.71505 15.987 3.06635 14.174 3.00482 12.2945C2.94329 10.415 3.47203 8.56344 4.51677 6.99987C5.56152 5.4363 7.06979 4.23925 8.82975 3.57685C10.5897 2.91444 12.513 2.81996 14.3294 3.30667" stroke="#00ff00" stroke-linecap="round"></path>
        </svg>
        <p>Done!</p>
        `;
  }, timeOutValues[Math.floor(Math.random() * timeOutValues.length)]);
};

const validateForVisa = () => {
  let errors = 0;

  const visaCardNum = document.querySelector("#visa_num");
  const visaCVV = document.querySelector("#visa_cvv");
  const visaHolder = document.querySelector("#visa_holder");

  if (visaCardNum.value.length != 16) {
    displayError(visaCardNum, "Card number must contain exactly 16 digits");
    errors++;
  } else {
    hideError(visaCardNum);
  }

  if (visaCVV.value.length != 3) {
    displayError(visaCVV, "CC must contain exactly 3 characters");
    errors++;
  } else {
    hideError(visaCVV);
  }

  if (visaHolder.value.length < 4) {
    displayError(
      visaHolder,
      "Card holder name must be at least 4 characters long"
    );
    errors++;
  } else {
    hideError(visaHolder);
  }

  if (errors === 0) {
    showSuccess();
  }
};

const validateForPaypal = () => {
  let errors = 0;

  const paypalEmail = document.querySelector("#paypal_email");
  const paypalDescription = document.querySelector("#paypal_description");

  if (
    !/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/gi.test(paypalEmail.value) ||
    paypalEmail.value.toLowerCase() !== paypalEmail.value
  ) {
    displayError(paypalEmail, "Please enter a valid email address");
    errors++;
  } else {
    hideError(paypalEmail);
  }

  if (paypalDescription.value === "") {
    displayError(paypalDescription, "This field cannot be empty");
    errors++;
  } else {
    hideError(paypalDescription);
  }

  if (errors === 0) {
    showSuccess();
  }
};

const validateForPsc = () => {
  let errors = 0;

  const pscPIN = document.querySelector("#psc_pin");
  const pscEmail = document.querySelector("#psc_email");

  if (pscPIN.value.length != 16) {
    displayError(pscPIN, "PIN number must contain exactly 16 digits");
    errors++;
  } else {
    hideError(pscPIN);
  }

  if (
    !/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/gi.test(pscEmail.value) ||
    pscEmail.value.toLowerCase() !== pscEmail.value
  ) {
    displayError(pscEmail, "Please enter a valid email address");
    errors++;
  } else {
    hideError(pscEmail);
  }

  if (errors === 0) {
    showSuccess();
  }
};

const displayError = (input, msg) => {
  const errorElement = input.parentElement.querySelector(".error");
  input.classList.add("err");
  errorElement.classList.remove("err_hidden");
  errorElement.textContent = msg;
};

const hideError = (input) => {
  const errorElement = input.parentElement.querySelector(".error");
  input.classList.remove("err");
  errorElement.classList.add("err_hidden");
  errorElement.textContent = "Error";
};

const toggleTheme = () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("bgt_theme", "dark");
  } else {
    localStorage.setItem("bgt_theme", "light");
  }
};

const loadThemeFromLS = () => {
  if (localStorage.getItem("bgt_theme") === null) {
    loadThemeViaPrefersScheme();
  }
  if (localStorage.getItem("bgt_theme") === "dark") {
    document.body.classList.add("dark");
  }
};

const loadThemeViaPrefersScheme = () => {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.classList.add("dark");
    localStorage.setItem("bgt_theme", "dark");
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("bgt_theme", "light");
  }
};

const handlePaymentMethods = (paymentInput) => {
  selectedPaymentMethod = paymentInput.value;

  paymentMethodsInput.forEach((input) => {
    input.parentElement.classList.remove("selected");
  });

  paymentInput.parentElement.classList.add("selected");
};

const showPaymentForm = (paymentName) => {
  paymentForms.forEach((form) => {
    form.classList.add("hidden");
  });

  document
    .querySelector(`form[data-form="${paymentName}"]`)
    .classList.remove("hidden");
};

themeToggleButton.addEventListener("click", toggleTheme);

paymentMethodsInput.forEach((input) => {
  input.addEventListener("click", () => {
    handlePaymentMethods(input);
    showPaymentForm(input.value);
  });
});

confirmPaymentBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (selectedPaymentMethod === "visa") {
      validateForVisa();
    }
    if (selectedPaymentMethod === "paypal") {
      validateForPaypal();
    }
    if (selectedPaymentMethod === "psc") {
      validateForPsc();
    }
  });
});

returnToGiftsBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    goToMainSection();
  });
});

orderNowBtn.addEventListener("click", () => {
  if (selectedGiftPrice) {
    setTimeout(() => {
      orderNowBtn.style.pointerEvents = "none";
      document.querySelector(".order_btn span").textContent = "Loading...";
      document.querySelector(".loading_svg").classList.remove("hidden");
    }, 250);
    setTimeout(() => {
      orderNowBtn.style.pointerEvents = "auto";
      document.querySelector(".order_btn span").textContent = "Order now";
      document.querySelector(".loading_svg").classList.add("hidden");
      goToPayment();
    }, timeOutValues[Math.floor(Math.random() * timeOutValues.length)]);
  }
});

giftPricesInputs.forEach((input) => {
  input.addEventListener("click", () => {
    selectedGiftPrice = input.value;
    selectedGiftName = input.getAttribute("data-gift-name");
    orderNowBtn.classList.remove("gift_not_selected");
  });
});

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", loadThemeViaPrefersScheme);

window.addEventListener("DOMContentLoaded", () => {
  loadThemeFromLS();
});
