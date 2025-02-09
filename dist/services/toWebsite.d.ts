/**
 * Sends data to the given server endpoint using fetch.
 * @param {string} serverUrl - The API endpoint URL.
 * @param {string} imageUrl - The Telegram image link.
 * @param {string} token - Authorization token.
 * @param {Record<string, any>} extraData - Additional data (e.g., caption, userId, etc.).
 * @returns {Promise<any | null>} - The server response or null on error.
 */
export declare function addToWebsite(imageUrl: string, aIOData?: Record<string, any>): Promise<any | null>;
export declare function updateToWebsite(shareId: number, isPoster: boolean, updateQuery: Record<string, any>): Promise<any | null>;
export declare function deleteToWebsite(shareId: number): Promise<any | null>;
