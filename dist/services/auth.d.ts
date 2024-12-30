declare class Auth {
    isAdmin(userId: number): boolean;
    isOwner(userId: number): boolean;
}
declare const auth: Auth;
export default auth;
