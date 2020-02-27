import init from 'recost';
import playerReducer, { playerInitialState, IPlayerState } from './player';

export interface IState extends IPlayerState {};

const initialState: IState = {
  ...playerInitialState,
};

const reducers = [
  playerReducer,
];

export const {
  Provider,
  dispatch,
  useSelector,
  withState,
} = init(initialState, reducers);