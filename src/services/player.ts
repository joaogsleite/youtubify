import * as ytdl from "./ytdl";
import { dispatch } from "../reducers";
import { store } from "../reducers/player";
import { setPageTitle } from "../utils/responsive";

export interface ITrack {
  title: string,
  thumbnail: string,
  id: string,
  audioSrc?: string,
  loading?: boolean,
  duration?: string,
}

async function fetchTrack(item: ITrack) {
  if (!item.audioSrc) {
    const audioSrc = await ytdl.getDownloadUrl(item.id);
    return { ...item, audioSrc };
  }
  return { ...item };
}

export function play(item: ITrack) {
  setPageTitle(item.title);
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
    });
  }
}

export function remove(item: Partial<ITrack>) {
  dispatch({ type: 'REMOVE', payload: item });
}
