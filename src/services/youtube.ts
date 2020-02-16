import ytdl, { videoFormat } from 'ytdl-core';
import { getKey } from '../utils/json';
import { isMobile } from '../utils/responsive';

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
    if (isMobile()) {
      content = content.split('<div id="initial-data"><!-- {')[1].split('} --></div>')[0];
    } else {
      content = content.split('window["ytInitialData"] = {')[1].split('};')[0];
    }
    if (!content) {
      throw new Error('no content')
    }
    return JSON.parse('{'+content+'}');
  })
}

export function getPlaylists(userId: string) {
  return scraper(`https://${isMobile() ? 'm.': ''}youtube.com/user/${userId}/playlists`).catch(() => {
    return scraper(`https://${isMobile() ? 'm.': ''}youtube.com/channel/${userId}/playlists`)
  }).then((obj) => {
    return getKey(obj, ['playlistId', 'title']).map((playlist: any) => {
      return {
        id: playlist.playlistId,
        title: getKey(playlist.title, ['text'])[0].text,
        thumbnail: getKey(playlist, ['height', 'url'])[0].url,
      };
    });
  });
}

export function getPlaylist(playlistId: string) {
  const url = `https://youtube.com/playlist?list=${playlistId}`
  return scraper(url).then((obj) => {
    return getKey(obj, ['videoId', 'title']).map((video: any) => {
      const titleKey = isMobile() ? 'text' : 'simpleText'
      return {
        id: video.videoId,
        title: getKey(video.title, titleKey)[0][titleKey],
        thumbnail: getKey(video, ['height', 'url'])[0].url,
      }
    })
  })
}