import User from "../types/user.js";

export default function getUserLinkMessage(update: string, user: User): string {
  if (user.username) {
    const userLink = `https://t.me/${user.username}`;
    return `${update.slice(0, 30)} [${user.firstname}](${userLink})`;
  } else {
    return `${update.slice(0, 30)} [${user.firstname}](tg://user?id=${user.id})`;
  }
}
