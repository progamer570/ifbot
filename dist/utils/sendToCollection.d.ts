export declare function sendToCOllection(chat: any, aIOPosterID: string | undefined, link: string, caption: string): Promise<void>;
export declare function sendToCOllectionOng(chat: any, link: string, caption: string): Promise<void>;
export declare function sendToCollectionOng2(chat: any, aIOPoster: string | undefined, links: {
    caption: string;
    messageId: string | number;
}[], shareId?: string): Promise<void>;
export declare function sendToLogGroup(chat: any, caption: string): Promise<void>;
