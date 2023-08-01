import { ConfigValue } from '@/configs';
import Cookie from 'js-cookie';


export const AUTH_TOKEN_KEY = ConfigValue.AUTH_TOKEN_KEY;

export const getAuthToken = () => {
  if (typeof window === undefined) {
    return null;
  }
  return Cookie.get(AUTH_TOKEN_KEY);

};

export function setAuthToken(token: string, permission: string[]) {  
  Cookie.set(AUTH_TOKEN_KEY,  JSON.stringify({ token, permission }));
}

export function removeAuthToken() {
  Cookie.remove(AUTH_TOKEN_KEY);
}
export function checkHasAuthToken() {
  const token = Cookie.get(AUTH_TOKEN_KEY);
  if (!token) return false;
  return true;
}

