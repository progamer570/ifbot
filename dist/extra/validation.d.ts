/**
 * Validates if a string is a well-formed URL suitable for Telegram buttons.
 * @param string - The string to check.
 * @param options - Optional configuration for validation.
 * @param options.requireProtocol - Whether to require "http" or "https" (default: true).
 * @returns boolean - True if the string is a valid URL, false otherwise.
 */
declare const isValidUrl: (string: string, options?: {
    requireProtocol?: boolean;
}) => boolean;
export { isValidUrl };
