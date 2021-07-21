let userDetails = JSON.parse(localStorage.getItem('user'));
let cartItems = document.getElementById('cart_items_container');
async function getItemsFromCart() {
  let response = await fetch('http://localhost:5000/cart/cart_items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userID: userDetails.UserID }),
  });
  let json = await response.json();
  if (json.length === 0) {
    cartItems.innerHTML = '<h1>No items in cart yet.</h1>';
  } else {
    cartItems.innerHTML = '';

    json.forEach((item) => {
      cartItems.innerHTML += `
      <div class="cart-item">
        <p>${item.Description}</p>
        <p>${item.Quantity}</p>
        <p>${item.Total}</p>
        <button class="remove">Remove</button>
      </div>
    `;
    });
  }

  let removeButton = document.querySelectorAll('.remove');
  removeButton.forEach((item) => {
    item.addEventListener('click', () => {});
  });
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
    getItemsFromCart();
  }
}
