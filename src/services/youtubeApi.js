const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const fetchLiveChatId = async (videoId, apiKey) => {
  try {
    const response = await fetch(
      `${BASE_URL}/videos?key=${apiKey}&id=${videoId}&part=liveStreamingDetails`
    );
    const data = await response.json();

    if (!data.items?.[0]?.liveStreamingDetails?.activeLiveChatId) {
      throw new Error('No active live chat found for this video');
    }

    return data.items[0].liveStreamingDetails.activeLiveChatId;
  } catch (error) {
    throw new Error('Failed to fetch live chat ID: ' + error.message);
  }
};

export const fetchLiveChatMessages = async (
  liveChatId,
  apiKey,
  pageToken = ''
) => {
  try {
    const url = new URL(`${BASE_URL}/liveChat/messages`);
    url.searchParams.append('key', apiKey);
    url.searchParams.append('liveChatId', liveChatId);
    url.searchParams.append('part', 'snippet,authorDetails');
    if (pageToken) {
      url.searchParams.append('pageToken', pageToken);
    }

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to fetch messages');
    }

    return {
      messages: data.items.map((item) => ({
        id: item.id,
        textDisplay: item.snippet.textMessageDetails?.messageText || '',
        authorDisplayName: item.authorDetails.displayName,
        authorProfileImageUrl: item.authorDetails.profileImageUrl,
        publishedAt: item.snippet.publishedAt,
      })),
      nextPageToken: data.nextPageToken,
      pollingIntervalMs: data.pollingIntervalMillis,
    };
  } catch (error) {
    console.error('Error fetching live chat messages:', error);
    throw new Error('Failed to fetch live chat messages: ' + error.message);
  }
};