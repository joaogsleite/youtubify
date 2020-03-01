import { IBaseState, IAction } from "recost";

export interface INavigationState extends IBaseState {
  activeTab: number,
};

export const navigationInitialState = {
  activeTab: 1,
};

export const store: INavigationState = {...navigationInitialState};

export default function navigationReducer(state: INavigationState, action: IAction) {
  switch (action.type) {
    case 'SET_ACTIVE_TAB':
      store.activeTab = action.payload;
      break;
  }
  return {
    ...state,
    ...store,
  };
};