import env from "./env.js";

class Auth {
  isAdmin(userId: number) {
    return env.adminIds.includes(userId);
  }
  isOwner(userId: number) {
    return env.ownerId === userId;
  }
}
const auth = new Auth();

export default auth;
