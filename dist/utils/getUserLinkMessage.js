export default function getUserLinkMessage(update, user) {
    if (user.username) {
        const userLink = `https://t.me/${user.username}`;
        return `${update.slice(0, 30)} [${user.firstname}](${userLink})`;
    }
    else {
        return `${update.slice(0, 30)} [${user.firstname}](tg://user?id=${user.id})`;
    }
}
