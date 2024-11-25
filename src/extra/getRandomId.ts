export default function getRandomId() {
  const timestamp = Date.now().toString();
  const timestampWithoutFirst5Digits = timestamp.slice(6);

  const randomDigits = Math.floor(Math.random() * 900) + 100;

  const randomId = timestampWithoutFirst5Digits + randomDigits;

  return Number(randomId);
}
