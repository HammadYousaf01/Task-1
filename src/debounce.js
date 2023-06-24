
function debounce(delay=1000) {
    let timeout;

    return (...args) => {
        return new Promise((resolve, reject) => {
            clearTimeout(timeout);

            timeout = setTimeout(() => {
                resolve(...args);
            }, delay);
        })
    }
}

const wrapper = debounce(500);

export default wrapper;