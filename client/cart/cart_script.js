let userDetails = JSON.parse(localStorage.getItem('user'));
let cartItems = document.getElementById('cart_items_container');
let grandTotalDiv = document.getElementById('grand_total');
let logoutButton = document.getElementById('logout');
let checkoutButton = document.getElementById('checkout_btn');
let grandTotal = 0;

let cart = [];
checkoutButton.addEventListener('click', () => {
  cart.forEach(async (item) => {
    console.log(item);
    let data = {
      userID: item.UserID,
      description: item.Description,
      quantity: item.Quantity,
      total: item.Total,
    };
    await fetch('http://localhost:5000/invoice/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    await fetch(
      `http://localhost:5000/cart/delete_cart_item/${item.CartItemID}`,
      {
        method: 'DELETE',
      }
    );
    getItemsFromCart();
  });
  window.alert('Purchased successfully!');
});

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
    cart = json;
    cartItems.innerHTML = '';

    json.forEach((item) => {
      grandTotal += Number(parseFloat(item.Total));
      cartItems.innerHTML += `
      <div class="cart-item">
        <p>${item.Description}</p>
        <p>${item.Quantity}</p>
        <p>${parseFloat(item.Total).toFixed(2)}</p>
        <button id=${item.CartItemID} class="remove">Remove</button>
      </div>
    `;
    });
    grandTotalDiv.innerHTML += grandTotal.toFixed(2);
  }

  let removeButton = document.querySelectorAll('.remove');
  removeButton.forEach((item) => {
    item.addEventListener('click', async () => {
      await fetch(`http://localhost:5000/cart/delete_cart_item/${item.id}`, {
        method: 'DELETE',
      });
      getItemsFromCart();
    });
  });
}

logoutButton.addEventListener('click', () => {
  window.location.href = 'http://localhost:5000/';
  localStorage.removeItem('user');
});

function checkUser() {
  if (
    !localStorage.getItem('user') ||
    JSON.parse(localStorage.getItem('user')).Role === 'InventoryManager' ||
    JSON.parse(localStorage.getItem('user')).Role === 'Finance'
  ) {
    window.alert('You are not authorized to view this page');
    window.history.back();
  } else {
    getItemsFromCart();
  }
}
