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

export default function playingReducer(state: IPlayerState, action: IAction) {
  let queue = [...state.queue];
  let playing = state.playing;
  switch (action.type) {
    case 'PLAY':
      playing = action.payload;
      // eslint-disable-next-line
    case 'REMOVE':
      queue = queue.filter((item) => {
        return item.id !== action.payload.id;
      })
      return {
        ...state,
        playing,
        queue,
      };
    case 'ENQUEUE':
      if (!queue.find((item => item.id === action.payload.id))) {
        queue.push(action.payload);
      }
      return {
        ...state,
        queue,
      };
    case 'UPDATE':
      const index = queue.findIndex((item => item.id === action.payload.id))
      queue[index] = action.payload;
      return {
        ...state,
        queue,
      }
    case 'DEQUEUE':
      playing = queue.shift();
      return {
        ...state,
        playing,
        queue,
      }
    default: 
      return state;
  }
};