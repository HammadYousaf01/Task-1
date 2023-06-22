const themeBtn = document.querySelector("#theme-btn");
const body = document.querySelector("body");

const THEMES = Object.freeze({
    dark: "dark",
    light: "light"
});


themeBtn.addEventListener("click", () => toggleTheme())
 

function toggleTheme() {
    if (isDarkTheme()) {
        applyLightTheme();
    } else {
        applyDarkTheme();
    }
}

function applyDarkTheme() {
    setActiveTheme(THEMES.dark);
    body.classList.add("dark-theme");
    body.classList.remove("light-theme");
}

function applyLightTheme() {
    setActiveTheme(THEMES.light);
    body.classList.add("light-theme");
    body.classList.remove("dark-theme");
}

function applyDefaultTheme() {
    const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (isDarkTheme) {
        applyDarkTheme();
    } else {
        applyLightTheme();
    }
}

function setActiveTheme(theme) {
    localStorage.setItem("theme", theme);
}

function getActiveTheme() {
    return localStorage.getItem("theme")
}

function isDarkTheme() {
    return getActiveTheme() === THEMES.dark;
}

function isLightTheme() {
    return !isDarkTheme();
}

(() => {
    if (getActiveTheme() === null) {
        applyDefaultTheme();
    } else if (isDarkTheme()) {
        applyDarkTheme();
    } else {
        applyLightTheme();
    }
})();