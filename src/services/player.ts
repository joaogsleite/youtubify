import * as yt from "./youtube";
import { dispatch } from "../reducers";
import { store } from "../reducers/player";
//import { setFavicon, setPageTitle } from "../utils/responsive";

export interface ITrack {
  title: string,
  thumbnail: string,
  id: string,
  audioSrc?: string,
  loading?: boolean,
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
  //setFavicon(item.thumbnail);
  //setPageTitle(item.title);
  dispatch({ type: 'PLAY', payload: {...item, loading: true} });
  fetchTrack(item).then((item) => {
    dispatch({ type: 'PLAY', payload: {...item, loading: false} });
  })
}

export function dequeue() {
  dispatch({ type: 'DEQUEUE' });
}

export function enqueue(item: ITrack) {
  if(!store.playing) {
    play(item);
  } else {
    dispatch({ type: 'ENQUEUE', payload: item });
    fetchTrack(item).then((item) => {
      dispatch({ type: 'UPDATE', payload: item });
    })
  }
}

export function remove(item: Partial<ITrack>) {
  dispatch({ type: 'REMOVE', payload: item });
}
