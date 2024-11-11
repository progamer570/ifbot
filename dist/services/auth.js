import env from "./env.js";
var Auth = /** @class */ (function () {
    function Auth() {
    }
    Auth.prototype.isAdmin = function (userId) {
        return env.adminIds.includes(userId);
    };
    return Auth;
}());
var auth = new Auth();
export default auth;
