import { AppState } from '../../store/rootReducer';

export const getThemeColor = (state: AppState) => state.themeColor.color;
