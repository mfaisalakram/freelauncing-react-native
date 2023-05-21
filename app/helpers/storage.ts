export const setItem = (name: string, value: any) =>
  localStorage.setItem(name, value);

export const getItem = (name: string) => localStorage.getItem(name);

export const removeItem = (name: string) => localStorage.removeItem(name);
