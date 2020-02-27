import * as yt from "./youtube";
import { dispatch } from "../reducers";
import { setFavicon } from "../utils/responsive";

export interface ITrack {
  title: string,
  thumbnail: string,
  id: string,
  audioSrc?: string,
}

async function fetchTrack(item: ITrack) {
  console.log('item', item)
  if (!item.audioSrc) {
    const audioSrc = await yt.getDownloadUrl(item.id);
    return { ...item, audioSrc }
  }
  return { ...item };
}

export function play(item: ITrack) {
  fetchTrack(item).then((item) => {
    setFavicon(item.thumbnail);
    dispatch({ type: 'PLAY', payload: item });
  })
}

export function dequeue() {
  dispatch({ type: 'DEQUEUE' });
}

export function enqueue(item: ITrack) {
  dispatch({ type: 'ENQUEUE', payload: item });
  fetchTrack(item).then((item) => {
    dispatch({ type: 'UPDATE', payload: item });
  })
}

export function remove(item: Partial<ITrack>) {
  dispatch({ type: 'REMOVE', payload: item });
}
