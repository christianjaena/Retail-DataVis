let userId = document.getElementById('userID');
let email = document.getElementById('email');
let role = document.getElementById('role');
let country = document.getElementById('country');
let logoutButton = document.getElementById('logout');
let purchases = document.getElementById('purchase_table');

async function getUserDetails() {
  let userID = JSON.parse(localStorage.getItem('user')).UserID;
  let response_user_details = await fetch(
    'http://localhost:5000/user/user_details',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userID }),
    }
  );
  let response_purchases = await fetch(
    'http://localhost:5000/invoice/purchases',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userID }),
    }
  );
  let user_details_json = await response_user_details.json();
  let purchases_json = await response_purchases.json();
  userId.innerHTML += user_details_json.UserID;
  email.innerHTML += user_details_json.Email;
  role.innerHTML += user_details_json.Role;
  country.innerHTML += user_details_json.Country;
  purchases_json.forEach((item) => {
    purchases.innerHTML += `
    <tr>
      <td id="description" >${item.Description}</td>
      <td>${item.Quantity}</td>
      <td>${parseFloat(item.Total).toFixed(2)}</td>
      <td>${item.InvoiceDate.split('T')[0]}</td>
    </tr>
  `;
  });
}

function checkUser() {
  if (!localStorage.getItem('user')) {
    window.alert('You are not authorized to view this page');
    window.history.back();
  } else {
    getUserDetails();
  }
}

logoutButton.addEventListener('click', () => {
  window.location.href = 'http://localhost:5000/';
  localStorage.removeItem('user');
});
