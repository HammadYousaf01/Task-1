import debounce from './debounce';

const form = document.querySelector("form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");

username.addEventListener("input", applyUsernaneValidations);
email.addEventListener("input", applyEmailValidations);
password.addEventListener("input", applyPasswordValidations);
confirmPassword.addEventListener("input", applyConfirmPasswordValidations);

form.addEventListener("submit", async e => {
    e.preventDefault();

    const usernameValidationsResponse = await applyUsernaneValidations();
    const emailValidationsResponse = await applyEmailValidations();
    const passwordValidationsResponse = await applyPasswordValidations();
    const confirmPasswordValidationsResponse = await applyConfirmPasswordValidations();
    if (usernameValidationsResponse && emailValidationsResponse && passwordValidationsResponse && confirmPasswordValidationsResponse) {
        form.submit();
    } 

})

async function applyUsernaneValidations(e) {
    const usernameError = document.querySelector("#username-error");

    const usernameLength = await debounce(username.value.length);

    if (usernameLength < 4) {
        addErrorBorder(username);
        reportError(usernameError, "Username must be longer than 4 characters");
        return false;
    } else if (usernameLength > 20) {
        addErrorBorder(username);
        reportError(usernameError, "Username must be shorter than 20 characters");
        return false;
    } else {
        addSuccessBorder(username);
        removeError(usernameError);
        return true;
    }
}

async function applyEmailValidations(e) {
    const emailError = document.querySelector("#email-error");

    if (validateEmail(await debounce(email.value))) {
        addSuccessBorder(email);
        removeError(emailError);
        return true;
    } else {
        addErrorBorder(email);
        reportError(emailError, "Email is invalid");
        return false;
    }
}

async function applyPasswordValidations(e) {
    const passwordError = document.querySelector("#password-error");

    if (confirmPassword.value) {
        await applyConfirmPasswordValidations();
    }

    const passwordLength = await debounce(password.value.length);
    if (passwordLength < 8) {
        reportError(passwordError, "Password needs to be longer than 8 characters");
        addErrorBorder(password)
        return false;
    } else {
        removeError(passwordError);
        addSuccessBorder(password);
        return true;
    }

    
}

async function applyConfirmPasswordValidations(e) {
    const confirmPasswordError = document.querySelector("#confirm-password-error");

    const confirmPasswordValue = await debounce(confirmPassword.value);
    if (confirmPasswordValue !== password.value) {
        reportError(confirmPasswordError, "Passwords don't match");
        addErrorBorder(confirmPassword);
        return false;
    } else {
        removeError(confirmPasswordError);
        addSuccessBorder(confirmPassword);
        return true;
    }
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

function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
