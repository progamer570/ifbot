import { User } from "telegraf/typings/core/types/typegram.js";
declare class InMemory {
    messages: Map<number, number[]>;
    users: Map<number, User>;
    constructor();
    initialize(): Promise<void>;
    saveMessages(shareId: number, messageIds: number[]): Promise<number>;
    getMessages(shareId: number): Promise<number[] | undefined>;
    saveUser(user: User): Promise<User>;
}
declare const inMemory: InMemory;
export default inMemory;
