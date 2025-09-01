import logger from "./logger.js";

export async function shortenUrl(
  baseUrl: string,
  apiToken: string,
  url: string
): Promise<string | null> {
  const apiUrl = `${baseUrl}?api=${apiToken}&url=${encodeURIComponent(url)}`;
  logger.debug("Shortening URL - Base URL, API Token, API URL:", baseUrl, apiToken, apiUrl);

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to shorten URL: ${response.statusText} (Status: ${response.status})`);
    }

    const responseData = await response.json();
    logger.info("Shortening URL response:", responseData);

    if (!responseData.shortenedUrl) {
      throw new Error("Shortened URL not found in response");
    }

    return responseData.shortenedUrl;
  } catch (error) {
    logger.error("Error while shortening URL:", error);
    return null;
  }
}
