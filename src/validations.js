import debounce from './debounce';

const form = document.querySelector("form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");


form.addEventListener("submit", async e => {

    const isUsernameValid = applyUsernameValidations(username.value.length);
    const isEmailValid = applyEmailValidations(email.value);
    const isPasswordValid = applyPasswordValidations(password.value);
    const isConfirmPasswordValid = applyConfirmPasswordlidations(confirmPassword.value);

    if (!(isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid)) {
        e.preventDefault();
    } 

})

username.addEventListener("input", async () => {
    const usernameLength = await debounce(username.value.length);
    applyUsernameValidations(usernameLength);
});

email.addEventListener("input", async () => {
    const emailValue = await debounce(email.value);
    applyEmailValidations(emailValue);
});

password.addEventListener("input", async () => {
    if (confirmPassword.value) {
        applyConfirmPasswordlidations(confirmPassword.value);
    }

    const passwordLength = await debounce(password.value.length);
    applyPasswordValidations(passwordLength);
});

confirmPassword.addEventListener("input", async () => {
    const confirmPasswordValue = await debounce(confirmPassword.value);
    applyConfirmPasswordlidations(confirmPasswordValue);
})


function applyUsernameValidations(usernameLength) {
    const usernameError = document.querySelector("#username-error");

    if (usernameLength < 4) {
        addErrorBorder(username);
        reportError(usernameError, "Username must be longer than 4 characters");
        return false;
    } else if (usernameLength > 20) {
        addErrorBorder(username);
        reportError(usernameError, "Username must be shorter than 20 characters");
        return false;
    } 

    addSuccessBorder(username);
    removeError(usernameError);
    return true;
}

function applyEmailValidations(emailValue) {
    const emailError = document.querySelector("#email-error");

    if (validateEmail(emailValue)) {
        addSuccessBorder(email);
        removeError(emailError);
        return true;
    } 

    addErrorBorder(email);
    reportError(emailError, "Email is invalid");
    return false;
}

function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

function applyPasswordValidations(passwordLength) {
    const passwordError = document.querySelector("#password-error");

    if (passwordLength < 8) {
        reportError(passwordError, "Password needs to be longer than 8 characters");
        addErrorBorder(password)
        return false;
    } 

    removeError(passwordError);
    addSuccessBorder(password);
    return true;
}

function applyConfirmPasswordlidations(value) {
    const confirmPasswordError = document.querySelector("#confirm-password-error");

    if (value !== password.value) {
        reportError(confirmPasswordError, "Passwords don't match");
        addErrorBorder(confirmPassword);
        return false;
    } 

    removeError(confirmPasswordError);
    addSuccessBorder(confirmPassword);
    return true;
}

function reportError(element, message) {
    element.textContent = message;
    removeClass(element, "none-display");
    addClass(element, "error-message");
}

function removeError(element) {
    removeClass(element, "none-display");
    element.textContent = "";
}

function addErrorBorder(element) {
    addClass(element, "error-border");
    removeClass(element, "success-border");
}

function addSuccessBorder(element) {
    addClass(element, "success-border");
    removeClass(element, "error-border");
}

function addClass(element, className) {
    element.classList.add(className);
}

function removeClass(element, className) {
    element.classList.remove(className);
}
