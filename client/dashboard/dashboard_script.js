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
let logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
  window.location.href = 'http://localhost:5000/';
  localStorage.removeItem('user');
});

function checkUser() {
  if (
    !localStorage.getItem('user') ||
    JSON.parse(localStorage.getItem('user')).Role === 'Customer' ||
    JSON.parse(localStorage.getItem('user')).Role === 'InventoryManager' ||
    JSON.parse(localStorage.getItem('user')).Role === 'Finance'
  ) {
    window.alert('You are not authorized to view this page');
    window.location.href = 'http://localhost:5000/';
  }
}
