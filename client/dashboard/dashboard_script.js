let sidebar = document.querySelector('.sidebar');
let closeBtn = document.querySelector('#btn');
let searchBtn = document.querySelector('.bx-search');
let logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
  window.location.href = 'http://localhost:5000/';
  localStorage.removeItem('user');
});

closeBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  menuBtnChange(); //calling the function(optional)
});

searchBtn.addEventListener('click', () => {
  // Sidebar open when you click on the search iocn
  sidebar.classList.toggle('open');
  menuBtnChange(); //calling the function(optional)
});

function menuBtnChange() {
  if (sidebar.classList.contains('open')) {
    closeBtn.classList.replace('bx-menu', 'bx-menu-alt-right'); //replacing the iocns class
  } else {
    closeBtn.classList.replace('bx-menu-alt-right', 'bx-menu'); //replacing the iocns class
  }
}

let shop = document.getElementById('shop');
let inventory = document.getElementById('inventory');
let user = document.getElementById('user');
let finance = document.getElementById('finance');

shop.addEventListener('click', () => {
  window.location.href = 'http://localhost:5000/ecommerce';
});
inventory.addEventListener('click', () => {
  window.location.href = 'http://localhost:5000/inventory';
});
user.addEventListener('click', () => {
  window.location.href = 'http://localhost:5000/user';
});
finance.addEventListener('click', () => {
  window.location.href = 'http://localhost:5000/finance';
});

function checkUser() {
  if (
    !localStorage.getItem('user') ||
    JSON.parse(localStorage.getItem('user')).Role === 'Customer' ||
    JSON.parse(localStorage.getItem('user')).Role === 'InventoryManager' ||
    JSON.parse(localStorage.getItem('user')).Role === 'Finance'
  ) {
    window.alert('You are not authorized to view this page');
    window.history.back();
  }
}
