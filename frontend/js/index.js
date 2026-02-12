import { registerForm } from './registerForm.js';
import AuthRequest from './apiAuthReq.js';

const modal = document.getElementById('registerDialog');
const showRegisterBtn = document.getElementById('ShowRegister');
const login = document.getElementById('login-section');
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const data = await AuthRequest.validateSession();
    if (data.valid) {
      window.location.href = './protected.html';
    }
  } catch (error) {
    console.error(error.message);
  }
});

showRegisterBtn.addEventListener('click', () => {
  modal.innerHTML = registerForm();
  requestAnimationFrame(() => {
    attachCloseEvent();
    attachSubmitEvent();
    login.hidden = true;
    modal.showModal();
  });
});

function attachSubmitEvent() {
  document.getElementById('register').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('r_username').value;
    const password = document.getElementById('r_password').value;
    const confpassword = document.getElementById('conf_password').value;
    try {
      if (password != confpassword) throw new Error('passwords are different');
      await AuthRequest.signup({ username, password });
      modal.close();
      let span = document.getElementById('message');
      if (!span) {
        span = document.createElement('span');
        span.id = 'message';
        document.body.appendChild(span);
      }
      span.textContent = 'Sign up succesfull';
      AuthRequest.loginUser({ username, password });
      setTimeout(
        () => (window.location.href = './protected.html'),
        2000
      );
    } catch (error) {
      error.message ? alert(error.message) : alert(JSON.stringify(error));
    }
  });
}

function attachCloseEvent() {
  const closeBtn = document.getElementById('closeDialog');
  if (closeBtn) {
    closeBtn.addEventListener(
      'click',
      () => {
        modal.close();
        login.hidden = false;
      },
      { once: true }
    );
  }
}

document.getElementById('login').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  clearInput('username');
  clearInput('password');
  try {
    const response = await AuthRequest.loginUser({ username, password });
    console.log('Login successful:', response);
    window.location.href = './protected.html';
  } catch (error) {
    console.error('Login error:', error);
    error.message ? alert(error.message) : alert(JSON.stringify(error));
  }
});
const clearInput = (id) => {
  document.getElementById(id).value = '';
};
