import init from 'recost';
import playerReducer, { playerInitialState, IPlayerState } from './player';
import navigationReducer, { navigationInitialState, INavigationState } from './navigation';

export interface IState extends IPlayerState, INavigationState {};

const initialState: IState = {
  ...playerInitialState,
  ...navigationInitialState,
};

const reducers = [
  playerReducer,
  navigationReducer,
];

export const {
  Provider,
  dispatch,
  useSelector,
  withState,
} = init(initialState, reducers);