import ytdl, { videoFormat } from 'ytdl-core';

const originalFetch = window.fetch
window.fetch = function(url: RequestInfo, init?: RequestInit | undefined) {
  if(typeof url === 'string' && (url.includes('youtube.com') || url.includes('googlevideo.com'))) {
    url = 'https://cors-anywhere.herokuapp.com/' + url
    init = {
      ...(init || {}),
      headers: {
        ...((init && init.headers) || {}),
        'Origin': '*',
      }
    }
  }
  return originalFetch(url, init)
}

export async function getDownloadUrl(videoId: string) {
  const filter = (format: videoFormat) => {
    return format.mimeType
      ? format.mimeType.includes('audio/mp4')
      : false;
  };
  const info = await ytdl.getInfo(videoId, { filter });
  const format: any = info.player_response.streamingData.adaptiveFormats.filter((format) => {
    return (format as any).mimeType.includes('audio/mp4')
  });
  return format[0].url;
}