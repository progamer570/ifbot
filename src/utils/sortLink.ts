export async function shortenUrl(
  baseUrl: string,
  apiToken: string,
  url: string
): Promise<string | null> {
  const apiUrl = `${baseUrl}?api=${apiToken}&url=${encodeURIComponent(url)}`;
  console.log(baseUrl, apiToken, apiUrl);

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to shorten URL: ${response.statusText} (Status: ${response.status})`);
    }

    const responseData = await response.json();
    console.log(responseData);

    if (!responseData.shortenedUrl) {
      throw new Error("Shortened URL not found in response");
    }

    return responseData.shortenedUrl;
  } catch (error) {
    console.error("Error while shortening URL:", error);
    return null;
  }
}
