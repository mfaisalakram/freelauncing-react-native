import { ThemeActions, IThemeAction } from './types';

const initialState = {
  color: '',
};

export const themeReducer = (state = initialState, action: IThemeAction) => {
  switch (action.type) {
    case ThemeActions.SET_THEME:
      return {
        ...state,
        color: action.payload.color,
      };
    default:
      return state;
  }
};
