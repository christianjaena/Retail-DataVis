let userDetails = JSON.parse(localStorage.getItem('user'));
let cartItems = document.getElementById('cart_items_container');
let grandTotalDiv = document.getElementById('grand_total');
let logoutButton = document.getElementById('logout');
let checkoutButton = document.getElementById('checkout_btn');
let grandTotal = 0;
let sidebar = document.querySelector('.sidebar');
let closeBtn = document.querySelector('#btn');

closeBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  menuBtnChange(); //calling the function(optional)
});

async function getCartItems() {
  let response = await fetch('http://localhost:5000/cart/cart_items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userID: userDetails.UserID }),
  });
  let json = await response.json();
  return json;
}

let cart = [];
checkoutButton.addEventListener('click', async () => {
  const cartItems = await getCartItems();
  if (cartItems.length > 0) {
    if (confirm('Proceed to checkout? This action cannot be undone.') == true) {
      cart.forEach(async (item) => {
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
      grandTotal = 0;
      grandTotalDiv.innerHTML = `Grand Total: $` + grandTotal.toFixed(2);
      window.alert('Purchased successfully!');
      cart = [];
    }
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
    grandTotalDiv.innerHTML = `Grand Total: $` + grandTotal.toFixed(2);
  } else {
    cart = json;
    cartItems.innerHTML = '';

    json.forEach((item) => {
      grandTotal += Number(parseFloat(item.Total));
      cartItems.innerHTML += `
      <div class="square">
      <div id=${item.CartItemID} class="delete-icon remove">
        <button class='bx bxs-x-circle'></button>
      </div>
      <div class="image-container">
        <p id="description">${item.Description.toLowerCase()}</p>
      </div>
      <div class="price-container">
      <div class="count-container">
          <input type="text" class="count" value="${item.Quantity}" readonly>
        </div>
        <h6 id="unitPrice" class="price">$${parseFloat(item.Total).toFixed(
          2
        )}</h6>
      </div>
    </div>
      `;
    });
    grandTotalDiv.innerHTML = `Grand Total: $` + grandTotal.toFixed(2);
  }

  let removeButton = document.querySelectorAll('.remove');
  removeButton.forEach((item) => {
    item.addEventListener('click', async () => {
      if (
        confirm(
          'Are you sure to delete this product? This action cannot be undone.'
        )
      ) {
        await fetch(`http://localhost:5000/cart/delete_cart_item/${item.id}`, {
          method: 'DELETE',
        });
        await getItemsFromCart();
      }
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
