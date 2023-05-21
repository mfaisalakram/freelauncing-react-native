// State
export interface IPayload {
  color: string;
}

// Actions
export interface IThemeAction {
  type: string;
  payload: IPayload;
}

const SET_THEME = 'SET_THEME';
export const ThemeActions = {
  SET_THEME,
};
