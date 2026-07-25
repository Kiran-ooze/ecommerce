const TOKEN_KEY = "token";
const USER_KEY = "user";


// Save token
export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};


// Get token
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};


// Remove token
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};


// Save user
export const saveUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};


// Get user
export const getUser = () => {

  const user = localStorage.getItem(USER_KEY);

  return user ? JSON.parse(user) : null;

};


// Remove user
export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};


// Clear all auth data
export const clearStorage = () => {
  removeToken();
  removeUser();
};