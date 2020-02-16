
export function getCurrentUser() {
  return localStorage.getItem('userId') || '';
}

export function setCurrentUser(userId: string) {
  localStorage.setItem('userId', userId);
}