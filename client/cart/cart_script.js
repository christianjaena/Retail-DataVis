let userDetails = JSON.parse(localStorage.getItem('user'));
let cartItems = document.getElementById('cart_items_container');
let grandTotalDiv = document.getElementById('grand_total');
let logoutButton = document.getElementById('logout');
let checkoutButton = document.getElementById('checkout_btn');
let grandTotal = 0;


let cart = [];
checkoutButton.addEventListener('click', () => {
  if (!cart.length == 0) {
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
  } else {
    window.alert('Cart is empty. Please add products from the shop.');
  }
});

async function getItemsFromCart() {
  grandTotal = 0;
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
      cartItems.innerHTML +=
        ` <div id="${item.CartItemID}" class="square">
        <div class="image-container">
          <p id="description">${item.Description.toLowerCase()}</p>
        </div>
        <div class="amount-container">
            <div class="count-container">
              <input type="text" class="count" value="${item.Quantity}" readonly>
            </div>
        </div>
        <div class="price-container">
          <div class="price-tag"> 
              <p id="unitPrice">$${parseFloat(item.Total).toFixed(2)}</p>
          </div>
          <button id=${item.CartItemID}  class="price remove">Remove</button>
        </div>
      </div>`;
    });
    grandTotalDiv.innerHTML = `Grand Total: $` + grandTotal;
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
