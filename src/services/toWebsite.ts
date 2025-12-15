import env from "./env.js";
import logger from "../utils/logger.js";

/**
 * Sends data to the given server endpoint using fetch.
 * @param {string} serverUrl - The API endpoint URL.
 * @param {string} imageUrl - The Telegram image link.
 * @param {string} token - Authorization token.
 * @param {Record<string, any>} extraData - Additional data (e.g., caption, userId, etc.).
 * @returns {Promise<any | null>} - The server response or null on error.
 */
export async function addToWebsite(
  imageUrl: string,
  aIOData: Record<string, any> = {}
): Promise<any | null> {
  try {
    const payload = JSON.stringify({
      imageUrl,
      token: env.apiFetchToken,
      aIOData,
    });

    const response = await fetch(`${env.apiBaseUrl}/add-aio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.apiFetchToken}`,
      },
      body: payload,
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    logger.info("✅ Server Response (addToWebsite):");
    logger.info(data);
    return data;
  } catch (error) {
    logger.error("❌ Error (addToWebsite):", error);
    return null;
  }
}

export async function updateToWebsite(
  shareId: number,
  isPoster: boolean,
  updateQuery: Record<string, any>
): Promise<any | null> {
  try {
    const payload = JSON.stringify({
      isPoster,
      shareId,
      updateQuery,
    });

    const response = await fetch(`${env.apiBaseUrl}/aio`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.apiFetchToken}`,
      },
      body: payload,
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    logger.info("✅ Server Response (updateToWebsite):");
    logger.info(data);
    return data;
  } catch (error) {
    logger.error("❌ Error (updateToWebsite):", error);
    return null;
  }
}
export async function deleteToWebsite(shareId: number): Promise<any | null> {
  try {
    const response = await fetch(`${env.apiBaseUrl}/aio`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.apiFetchToken}`,
      },
      body: JSON.stringify({ shareId }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    logger.info("✅ Server Response (deleteToWebsite):");
    logger.info(data);
    return data;
  } catch (error) {
    logger.error("❌ Error (deleteToWebsite):", error);
    return null;
  }
}
