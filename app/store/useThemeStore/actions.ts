import { IThemeAction, ThemeActions } from './types';

export const changeTheme = (color: string): IThemeAction => {
  return {
    type: ThemeActions.SET_THEME,
    payload: { color },
  };
};

export const themeAc = {
  changeTheme,
};
