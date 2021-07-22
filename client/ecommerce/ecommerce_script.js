let shopCartDiv = document.getElementById('shop-cart');
let content = document.getElementById('content');
let logoutButton = document.getElementById('logout');
let products = document.getElementById('products');
let pageNumber = document.getElementById('pageNumber');
let currentPageNumber = document.getElementById('currentPageNumber');
let prevPage = document.getElementById('prev');
let nextPage = document.getElementById('next');
let userDetails = JSON.parse(localStorage.getItem('user'));

prevPage.addEventListener('click', async () => {
  if (parseInt(currentPageNumber.innerHTML) > 1) {
    currentPageNumber.innerHTML = parseInt(currentPageNumber.innerHTML) - 1;
    products.innerHTML = '';
    await getProducts(parseInt(currentPageNumber.innerHTML));
  }
});

nextPage.addEventListener('click', async () => {
  currentPageNumber.innerHTML = parseInt(currentPageNumber.innerHTML) + 1;
  products.innerHTML = '';
  await getProducts(parseInt(currentPageNumber.innerHTML));
});

logoutButton.addEventListener('click', () => {
  window.location.href = 'http://localhost:5000/';
  localStorage.removeItem('user');
});

async function getProducts(page) {
  let response = await fetch(`http://localhost:5000/retail/items?page=${page}`);
  let data = await response.json();
  data.forEach((item, idx) => {
    products.innerHTML += `
      <div id="${idx}" class="square">
        <div class="image-container">
          <p id="description">${item.Description.toLowerCase()}</p>
        </div>
        <div class="amount-container">
            <button class='bx bxs-minus-square'></button>
            <div class="count-container">
              <input type="text" class="count" value="1" min="1">
            </div>
            <button class='bx bxs-plus-square'></button>
        </div>
        <div class="price-container">
          <div class="price-tag"> 
              <p id="unitPrice">$${item.UnitPrice}</p>
          </div>
            <button class="price">Add to Cart</button>
        </div>
      </div>
    `;
  });
  let itemDiv = document.querySelectorAll('.square');
  itemDiv.forEach((item) => {
    let imageContainer = item.children[0];
    let description = imageContainer.children[0].innerHTML;
    let price = parseFloat(imageContainer.children[1].innerHTML.split('$')[1]);
    let amountContainer = item.children[1];
    let addToCartButton = item.children[2].children[0];
    let decrementButton = amountContainer.children[0];
    let quantity = amountContainer.children[1].children[0];
    let incrementButton = amountContainer.children[2];

    decrementButton.addEventListener('click', () => {
      if (quantity.value > 1) {
        quantity.value = parseInt(quantity.value) - 1;
      }
    });

    incrementButton.addEventListener('click', () => {
      quantity.value = parseInt(quantity.value) + 1;
    });

    addToCartButton.addEventListener('click', async () => {
      let data = {
        userID: userDetails.UserID,
        description,
        quantity: quantity.value,
        total: price * quantity.value,
      };
      let response = await fetch('http://localhost:5000/cart/add_to_cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      window.alert(`${result.Quantity} ${result.Description} was added to cart successfully!`);

      quantity.value = 1;
    });
  });
}

async function checkUser() {
  if (!localStorage.getItem('user')) {
    window.alert('You are not authorized to view this page');
    window.history.back();
  } else {
    await getProducts(1);
  }
}
