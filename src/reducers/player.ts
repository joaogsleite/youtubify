import { IBaseState, IAction } from "recost";
import { ITrack } from "../services/player";

export interface IPlayerState extends IBaseState {
  playing?: ITrack,
  queue: ITrack[],
};

export const playerInitialState = {
  queue: [],
  playing: undefined,
};

export const store: IPlayerState = {...playerInitialState};

export default function playingReducer(state: IPlayerState, action: IAction) {
  store.queue = [...state.queue];
  store.playing = state.playing && { ...state.playing};
  switch (action.type) {
    case 'PLAY':
      store.playing = action.payload;
      // eslint-disable-next-line
    case 'REMOVE':
      store.queue = store.queue.filter((item) => {
        return item.id !== action.payload.id;
      })
      return {
        ...state,
        ...store,
      };
    case 'ENQUEUE':
      if (!store.queue.find((item => item.id === action.payload.id))) {
        store.queue.push(action.payload);
      }
      return {
        ...state,
        ...store,
      };
    case 'UPDATE':
      const index = store.queue.findIndex((item => item.id === action.payload.id))
      store.queue[index] = action.payload;
      return {
        ...state,
        ...store,
      }
    case 'DEQUEUE':
      store.playing = store.queue.shift();
      return {
        ...state,
        ...store,
      }
    default: 
      return state;
  }
};