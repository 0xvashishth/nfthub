export function trunc(text) {
    return text.length > 10 ? `${text.substr(0, 10)}...` : text;
}

export function truncAddr(text) {
    return `${text.substr(0, 6)}...`;
}