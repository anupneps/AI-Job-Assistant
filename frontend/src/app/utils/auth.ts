// Auth utility for JWT and user info management in sessionStorage

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export function setToken(token: string) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

export function setUser(user: any) {
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser(): any | null {
  const user = sessionStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}

export function clearUser() {
  sessionStorage.removeItem(USER_KEY);
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

export function logout() {
  clearToken();
  clearUser();
} 