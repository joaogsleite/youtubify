import ytdl, { videoFormat } from 'ytdl-core';
import { getKey } from '../utils/json';

const originalFetch = window.fetch
window.fetch = function(url: RequestInfo, init?: RequestInit | undefined) {
  if(typeof url === 'string' && (url.includes('youtube.com') || url.includes('googlevideo.com'))) {
    url = 'https://cors-anywhere.herokuapp.com/' + url
    init = {
      ...(init || {}),
      headers: {
        ...((init && init.headers) || {}),
        'Origin': '*'
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

function scraper(url: string) {
  return fetch(url).then((response) => {
    return response.text();
  }).then((content) => {
    if (typeof window.orientation !== "undefined") {
      content = content.split('<div id="initial-data"><!-- {')[1].split('} --></div>')[0];
    } else {
      content = content.split('window["ytInitialData"] = {')[1].split('};')[0];
    }
    return JSON.parse('{'+content+'}');
  })
}

export function getPlaylists(userId: string) {
  return scraper(`https://youtube.com/user/${userId}/playlists`).catch(() => {
    return scraper(`https://youtube.com/channel/${userId}/playlists`)
  }).then((obj) => {
    return getKey(obj, 'playlistId');
  });
}

export function getPlaylist(playlistId: string) {
  const url = `https://youtube.com/playlist?list=${playlistId}`
  return scraper(url).then((obj) => {
    return getKey(obj, 'videoId')
  })
}