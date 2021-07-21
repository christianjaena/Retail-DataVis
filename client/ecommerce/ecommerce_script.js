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
      <div class="square">
        <div class="image-container">
          ${item.Description} - ${item.UnitPrice}
         </div>
         <div class="amount-container">
            <button class='bx bxs-minus-square'></button>
            <div class="count-container">
            <input type="number" class="count">
         </div>
            <button class='bx bxs-plus-square'></button>
            </div>
            <div class="price-container">
            <button class="price">Add to Cart</button>
        </div>
      </div>
    `;
  });
})();

function checkUser() {
  if (!localStorage.getItem('user')) {
    window.alert('You are not authorized to view this page');
    window.history.back();
  }
}
