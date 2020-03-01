import { getKey } from '../utils/json';
import { isMobile } from '../utils/responsive';

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

export function searchVideos(text: string) {
  const query = text.split(' ').join('+');
  const url = `https://youtube.com/results?search_query=${query}&sp=EgIQAQ%3D%3D`;
  return scraper(url).then((obj) => {
    return getKey(obj, ['videoId', 'title']).map((video: any) => {
      const title = video.title.simpleText || getKey(video.title, 'text')[0].text
      const thumbnailObj = getKey(video, ['height', 'url'])[0]
      const thumbnail = thumbnailObj && thumbnailObj.url
      return {
        id: video.videoId,
        title,
        thumbnail,
      }
    })
  });
}