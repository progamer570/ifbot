/**
 * Sends data to the given server endpoint using fetch.
 * @param {string} serverUrl - The API endpoint URL.
 * @param {string} imageUrl - The Telegram image link.
 * @param {string} token - Authorization token.
 * @param {Record<string, any>} extraData - Additional data (e.g., caption, userId, etc.).
 * @returns {Promise<any | null>} - The server response or null on error.
 */
export async function sendToWebsite(
  serverUrl: string,
  imageUrl: string,
  token: string,
  aIOData: Record<string, any> = {}
): Promise<any | null> {
  try {
    const payload = JSON.stringify({
      imageUrl,
      token,
      aIOData,
    });

    const response = await fetch(serverUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: payload,
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Server Response:", data);
    return data;
  } catch (error) {
    console.error("❌ Error:", error);
    return null;
  }
}
