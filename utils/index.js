export function bufferToBase64(buffer) {
    let arr = new Uint8Array(buffer);
    const base64 = btoa(
        arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
    )
    return `data:image/png;base64,${base64}`;
};

export function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};