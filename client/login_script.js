let role = document.getElementById('role');
let email = document.getElementById('email');
let password = document.getElementById('password');
let loginButton = document.getElementById('login');
let signupButton = document.getElementById('signup');

signupButton.addEventListener('click', () => {
  window.location.href = 'http://localhost:5000/register';
});

loginButton.addEventListener('click', async (e) => {
  e.preventDefault();
  if (validateInput(email.value, password.value, role.value)) {
    let data = {
      email: email.value,
      password: password.value,
      role: role.value,
    };

    let response = await fetch('http://localhost:5000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    let result = await response.json();
    localStorage.setItem('user', JSON.stringify(result));
    if (result !== 'No such user found') {
      switch (result.Role) {
        case 'SuperAdmin':
          window.location.href = 'http://localhost:5000/dashboard';
          window.alert(`Logged in as ${result.Email}`);
          break;
        case 'InventoryManager':
          window.location.href = 'http://localhost:5000/inventory';
          window.alert(`Logged in as ${result.Email}`);
          break;
        case 'Finance':
          window.location.href = 'http://localhost:5000/finance';
          window.alert(`Logged in as ${result.Email}`);
          break;
        case 'Customer':
          window.location.href = 'http://localhost:5000/ecommerce';
          window.alert(`Logged in as ${result.Email}`);
          break;
      }
    } else {
      window.alert('No such user found');
    }
  } else {
    window.alert('Please provide proper credentials.');
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
