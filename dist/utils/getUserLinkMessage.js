export default function getUserLinkMessage(update, user) {
    if (user.username) {
        var userLink = "https://t.me/".concat(user.username);
        return "".concat(update.slice(0, 30), " [").concat(user.firstname, "](").concat(userLink, ")");
    }
    else {
        return "".concat(update.slice(0, 30), " [").concat(user.firstname, "](tg://user?id=").concat(user.id, ")");
    }
}
