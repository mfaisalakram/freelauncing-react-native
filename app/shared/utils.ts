import { local_env } from './baseUrl';

export const local_console = (message: any) => {
  if (local_env) {
    return;
  }
};
