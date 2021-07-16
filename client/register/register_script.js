let role = document.getElementById('role');
let email = document.getElementById('email');
let password = document.getElementById('password');
let registerButton = document.getElementById('register');

registerButton.addEventListener('click', async () => {
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
  console.log(result);
});
