export function trunc(text) {
    return text.length > 10 ? `${text.substr(0, 10)}...` : text;
}

export function truncAddr(text) {
    if (text.length > 11) {
        let start = text.substring(0, 4);
        let end = text.substring(text.length - 4, text.length);
        while (start.length + end.length < 11) {
            start = start + '.';
        }
        return start + end;
    }
    return text;
}

export function truncAddr2(text) {
    if (text.length > 11) {
        let start = text.substring(0, 4);
        let end = text.substring(text.length - 4, text.length);
        while (start.length + end.length < 11) {
            start = start + '.';
        }
        return start + end;
    }
    return text;
}

export function getDarkMode() {
    if (localStorage.getItem("darkMode") === undefined) {
        localStorage.setItem("darkMode", true);
        return true;
    } else {
        return localStorage.getItem("darkMode") === "true" ? true : false;
    }
}

export function setDarkMode(darkMode, setMode) {
    setMode(darkMode);
    window.location.reload();
    localStorage.setItem("darkMode", darkMode);
}

export const truncate = (str, count) => {
    if (str.length > count) {
        str = str.substring(0, count) + "...";
    }
    return str;
};

export const showStr = (str) => {
    let cwh = window.innerHeight
    if(cwh >= 900){
        return str;
    }else if(cwh <992 && cwh > 593){
        return truncate(str,25);
    }else if(cwh <= 593 && cwh >= 460){
        return truncate(str,10);
    }else{
        return truncate(str,15);
    }
}