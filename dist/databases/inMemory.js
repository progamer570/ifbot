class InMemory {
    messages;
    users;
    constructor() {
        this.messages = new Map();
        this.users = new Map();
    }
    async initialize() { }
    async saveMessages(shareId, messageIds) {
        this.messages.set(shareId, messageIds);
        return shareId;
    }
    async getMessages(shareId) {
        return this.messages.get(shareId);
    }
    async saveUser(user) {
        this.users.set(user.id, user);
        return user;
    }
}
const inMemory = new InMemory();
export default inMemory;
