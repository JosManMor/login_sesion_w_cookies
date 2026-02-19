import AuthRequest from './apiAuthReq.js';

const btnLogout = document.getElementById('btnLogout');
const message = document.getElementById('message');
const adminPanel = document.getElementById('admin-panel');
const usersTableBody = document.querySelector('#users-table tbody');

const loadUsers = async () => {
    try {
        const users = await AuthRequest.getAllUsers();
        usersTableBody.innerHTML = users.map(user => `
            <tr>
                <td>${user._id}</td>
                <td>${user.username}</td>
                <td>${user.role || 'user'}</td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Failed to load users', error);
        usersTableBody.innerHTML = '<tr><td colspan="4">Error loading users.</td></tr>';
    }
};

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await AuthRequest.validateSession();
    if (response.valid && response.user) {
        message.innerHTML = `Welcome, <strong>${response.user.username}</strong>!`;
        
        if (response.user.role === 'admin') {
            adminPanel.style.display = 'block';
            await loadUsers();
        }
    } else {
        throw new Error('Invalid session');
    }
  } catch {
    window.location.href = '/';
  }
});

btnLogout.addEventListener('click', async () => {
  const data = await AuthRequest.logout();
  if (message) message.innerHTML = data.message;
  setTimeout(() => (window.location.href = '/'), 1000);
});
