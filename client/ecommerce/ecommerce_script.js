let logoutButton = document.getElementById('logout');
let shopButton = document.getElementById('shop');
let shopCartDiv = document.getElementById('shop-cart');
let itemsList = document.getElementById('items');

logoutButton.addEventListener('click', () => {
  window.location.href = 'http://localhost:5000/';
});

let items = [];

shopButton.addEventListener('click', async () => {
  let response = await fetch('http://localhost:5000/retail/items');
  let data = await response.json();
  items = data;
  items.forEach((item, idx) => {
    itemsList.innerHTML += `
    <div>
        <li id="${idx}">${item.Description} - ${item.UnitPrice}</li>
            <span>
                <button>-</button>
                0
                <button>+</button>
            </span>
        <button>Addutocart</button>
    </div>
    `;
  });
});
