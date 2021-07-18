let shopButton = document.getElementById('shop');
let shopCartDiv = document.getElementById('shop-cart');
let userDiv = document.getElementById('user');
let content = document.getElementById('content');
let logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
  window.location.href = 'http://localhost:5000/';
  localStorage.removeItem('user');
});

userDiv.addEventListener('click', () => {
  content.innerHTML = '';
  let user = JSON.parse(localStorage.getItem('user'));
  content.innerHTML = `
    <h1>${user.Email}</h1>
    <h3>${user.Role}</h3>
    `;
});

shopButton.addEventListener('click', async () => {
  content.innerHTML = '';
  let response = await fetch('http://localhost:5000/retail/items');
  let data = await response.json();

  data.forEach((item, idx) => {
    content.innerHTML += `
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

function checkUser() {
  if (!localStorage.getItem('user')) {
    window.alert('You are not authorized to view this page');
    window.location.href = 'http://localhost:5000/';
  }
}
