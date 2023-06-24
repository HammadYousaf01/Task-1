import debounce from './debounce';

const submitBtn = document.querySelector("#submit");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");

username.addEventListener("input", e => {
    const usernameError = document.querySelector("#username-error");

    (async () => {
        const usernameLength = await debounce(e.target.value.length);

        if (usernameLength < 4) {
            addErrorBorder(username);
            reportError(usernameError, "Username must be longer than 4 characters");
        } else if (usernameLength > 20) {
            addErrorBorder(username);
            reportError(usernameError, "Username must be shorter than 20 characters");
        } else {
            addSuccessBorder(username);
            removeError(usernameError);
        }
    })();
})

email.addEventListener("input", e => {
    const emailError = document.querySelector("#email-error");

    (async () => {
        if (validateEmail(await debounce(e.target.value))) {
            addSuccessBorder(email);
            removeError(emailError);
        } else {
            addErrorBorder(email);
            reportError(emailError, "Email is invalid")
        }
    })()
})


password.addEventListener("input", e => {
    const passwordError = document.querySelector("#password-error");

    (async () => {
        const passwordLength = await debounce(e.target.value.length);
        if (passwordLength < 8) {
            reportError(passwordError, "Password needs to be longer than 8 characters");
            addErrorBorder(password)
        } else {
            removeError(passwordError);
            addSuccessBorder(password);
        }
    })()
    
})


confirmPassword.addEventListener("input", e => {

    (async () => {
        const confirmPasswordError = document.querySelector("#confirm-password-error");

        const confirmPasswordValue = await debounce(e.target.value);
        if (confirmPasswordValue !== password.value) {
            reportError(confirmPasswordError, "Passwords need to match");
            addErrorBorder(confirmPassword);
        } else {
            removeError(confirmPasswordError);
            addSuccessBorder(confirmPassword);
        }
    })()
})

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
