import AuthRequest from './apiAuthReq.js';

const btnLogout = document.getElementById('btnLogout');
const message = document.getElementById('message');

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await AuthRequest.validateSession();
  } catch {
    window.location.href = './index.html';
  }
});

btnLogout.addEventListener('click', async () => {
  const data = await AuthRequest.logout();
  message.innerHTML = data.message;
  setTimeout(() => (window.location.href = './index.html'), 1000);
});
