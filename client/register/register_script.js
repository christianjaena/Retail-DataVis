let role = document.getElementById('role');
let email = document.getElementById('email');
let password = document.getElementById('password');
let registerButton = document.getElementById('register');
let loginButton = document.getElementById('login');

loginButton.addEventListener('click', () => {
  window.location.href = 'http://localhost:5000/';
});

registerButton.addEventListener('click', async (e) => {
  e.preventDefault();
  if (validateInput(email.value, password.value, role.value)) {
    let data = {
      email: email.value,
      password: password.value,
      role: role.value,
    };

    let response = await fetch('http://localhost:5000/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    let result = await response.json();
    window.alert(result);
    if (result === 'Registered successfully') {
      window.location.href = 'http://localhost:5000/';
    }
  } else {
    window.alert('Please provide proper credentials');
  }
});

function validateInput(email, password) {
  const emailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
  const isValidEmail = email.search(emailRegex);
  if (isValidEmail === -1 || email === '' || password === '' || role === '') {
    return false;
  } else {
    return true;
  }
}
