export default function getRandomId() {
    var timestamp = Date.now().toString();
    var timestampWithoutFirst5Digits = timestamp.slice(6);
    var randomDigits = Math.floor(Math.random() * 900) + 100;
    var randomId = timestampWithoutFirst5Digits + randomDigits;
    return Number(randomId);
}
