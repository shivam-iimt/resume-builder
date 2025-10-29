const ACCESS_KEY = 'rb_access_token';

export const getAccessToken = () => localStorage.getItem(ACCESS_KEY);
export const setAccessToken = (t: string) => localStorage.setItem(ACCESS_KEY, t);
export const clearAccessToken = () => localStorage.removeItem(ACCESS_KEY);
