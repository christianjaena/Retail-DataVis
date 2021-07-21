let shopCartDiv = document.getElementById('shop-cart');
let content = document.getElementById('content');
let logoutButton = document.getElementById('logout');
let products = document.getElementById('products');

logoutButton.addEventListener('click', () => {
  window.location.href = 'http://localhost:5000/';
  localStorage.removeItem('user');
});

(async function getProducts() {
  let response = await fetch('http://localhost:5000/retail/items');
  let data = await response.json();

  data.forEach((item, idx) => {
    products.innerHTML += `
      <div id="${idx}" class="square">
        <div class="image-container">
          <p>${item.Description}</p>
          <p>${item.UnitPrice}</p>
        </div>
        <div class="amount-container">
            <button class='bx bxs-minus-square'></button>
            <div class="count-container">
              <input type="number" class="count" value="1" min="1">
            </div>
            <button class='bx bxs-plus-square'></button>
        </div>
        <div class="price-container">
            <button class="price">Add to Cart</button>
        </div>
      </div>
    `;
  });
  let itemDiv = document.querySelectorAll('.square');
  itemDiv.forEach((item) => {
    let imageContainer = item.children[0];
    let description = imageContainer.children[0].innerHTML;
    let price = parseFloat(imageContainer.children[1].innerHTML);
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

    addToCartButton.addEventListener('click', () => {
      console.log(description);
      console.log(price * quantity.value);
      quantity.value = 1;
    });
  });
})();

function checkUser() {
  if (!localStorage.getItem('user')) {
    window.alert('You are not authorized to view this page');
    window.history.back();
  }
}
