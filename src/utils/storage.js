// @ts-check

export default {
  getUser: () => JSON.parse(localStorage.getItem('userId')),
  setUser: (user) => localStorage.setItem('userId', JSON.stringify(user)),
  removeUser: () => localStorage.removeItem('userId'),
};
