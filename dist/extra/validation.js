/**
 * Validates if a string is a well-formed URL suitable for Telegram buttons.
 * @param string - The string to check.
 * @param options - Optional configuration for validation.
 * @param options.requireProtocol - Whether to require "http" or "https" (default: true).
 * @returns boolean - True if the string is a valid URL, false otherwise.
 */
const isValidUrl = (string, options = { requireProtocol: true }) => {
    try {
        const trimmedString = string.trim();
        if (!trimmedString) {
            return false;
        }
        const url = new URL(trimmedString);
        const validProtocols = ["http:", "https:"];
        if (options.requireProtocol && !validProtocols.includes(url.protocol)) {
            return false;
        }
        if (!url.hostname) {
            return false;
        }
        return true;
    }
    catch (_) {
        return false;
    }
};
export { isValidUrl };
