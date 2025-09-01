export function processCaption(oldCaption, join) {
    let newCaption = "";
    const stringWithoutSpecialChars = oldCaption
        .replace("@ADrama_Lovers", "")
        .replace(/\./g, " ")
        .replace(/-/g, " ")
        .replace(/(?:https?|ftp):\/\/[\n\S]+/g, "");
    newCaption = stringWithoutSpecialChars.replace(/@\w+\s?/g, "").replace(/_/g, " ");
    const indexOfSize = newCaption.indexOf("🔘 SIZE");
    if (indexOfSize !== -1) {
        newCaption = newCaption.substring(0, indexOfSize);
    }
    else {
        newCaption = newCaption;
    }
    const plotIndex = newCaption.indexOf("Plot:");
    const mkv = newCaption.indexOf("mkv");
    if (plotIndex !== -1) {
        newCaption = newCaption.substring(0, plotIndex);
    }
    if (mkv !== -1) {
        newCaption = newCaption.substring(0, mkv + 3);
    }
    if (!join) {
        return newCaption.trim();
    }
    else {
        return newCaption.trim() + `\nＪＯＩＮ : @${join}`;
    }
}
export function editAIOTitle(oldCaption, join) {
    let newCaption = "";
    newCaption = oldCaption
        .replace("@ADrama_Lovers", "")
        .replace(/\#/g, " ")
        .replace(/\👉/g, "")
        .replace(/\👈/g, "")
        .replace(/\"/g, " ")
        .replace("🍯Join Here First ⬇️", " ")
        .replace(" (We provide all dramas in English Subbed) ", " ")
        .replace("🐝Download Here ⬇️", "Click On Get This To Download")
        .replace("Tap on Join Here First to Download Episodes", "")
        .replace(/(?:https?|ftp):\/\/[\n\S]+/g, "");
    newCaption = newCaption.replace(/@\w+\s?/g, "");
    const indexOfSize = newCaption.indexOf("🔘 SIZE");
    const request = newCaption.indexOf("Request");
    const credit = newCaption.indexOf("Credit/Partner");
    const plotIndex = newCaption.indexOf("Plot:");
    const mkv = newCaption.indexOf("mkv");
    if (indexOfSize !== -1) {
        newCaption = newCaption.substring(0, indexOfSize);
    }
    if (credit !== -1) {
        newCaption = newCaption.substring(0, credit) + "Thanks to Knc Korean";
    }
    if (request !== -1) {
        newCaption = newCaption.substring(0, request);
    }
    if (mkv !== -1) {
        newCaption = newCaption.substring(0, request);
    }
    if (plotIndex !== -1) {
        newCaption = newCaption.substring(0, plotIndex);
    }
    return newCaption;
}
export function processCaptionForStore(oldCaption) {
    let newCaption = "";
    newCaption = oldCaption
        .replace("@ADrama_Lovers", "")
        .replace(/\./g, " ")
        .replace(/_/g, " ")
        .replace(/-/g, " ")
        .replace(/\[/g, " ")
        .replace(/\]/g, " ")
        .replace(/\{/g, " ")
        .replace(/\}/g, " ")
        .replace(/\(/g, " ")
        .replace(/\)/g, " ")
        .replace("[KR HD]", " ")
        .replace(/(?:https?|ftp):\/\/[\n\S]+/g, "")
        .replace(/@\w+\s?/g, "")
        .replace(/[!@#$%^&*]/g, "")
        .replace(/\s\s+/g, " ")
        .trim();
    const mkv = newCaption.indexOf("mkv");
    if (mkv !== -1) {
        newCaption = newCaption.substring(0, mkv + 3);
    }
    return newCaption.trim();
}
