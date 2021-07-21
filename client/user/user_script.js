let userId = document.getElementById('userID');
let email = document.getElementById('email');
let role = document.getElementById('role');
let country = document.getElementById('country');

async function getUserDetails() {
  let userID = JSON.parse(localStorage.getItem('user')).UserID;
  let response = await fetch('http://localhost:5000/user/user_details', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userID }),
  });
  let json = await response.json();
  console.log(json);
  userId.innerHTML += json.UserID;
  email.innerHTML += json.Email;
  role.innerHTML += json.Role;
  country.innerHTML += json.Country;
}

function checkUser() {
  if (
    !localStorage.getItem('user') ||
    JSON.parse(localStorage.getItem('user')).Role === 'Customer' ||
    JSON.parse(localStorage.getItem('user')).Role === 'InventoryManager' ||
    JSON.parse(localStorage.getItem('user')).Role === 'Finance'
  ) {
    window.alert('You are not authorized to view this page');
    window.history.back();
  } else {
    getUserDetails();
  }
}
