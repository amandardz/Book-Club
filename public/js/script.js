const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#user-email').value.trim();
  const password = document.querySelector('#user-password').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

const loginFormEl = document
  .querySelector('.login-form');
if (loginFormEl) {
  loginFormEl.addEventListener('submit', loginFormHandler);
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#user-name-signup').value.trim();
  const email = document.querySelector('#user-email-signup').value.trim();
  const password = document.querySelector('#user-password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormEl = document
  .querySelector('.signup-form');

if (signupFormEl) {
  signupFormEl.addEventListener('submit', signupFormHandler);
};

const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};


const logoutEl = document.querySelector('#logout')

if (logoutEl) {
  logoutEl.addEventListener('click', logout);
}