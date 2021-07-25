let sidebar = document.querySelector('.sidebar');
let closeBtn = document.querySelector('#btn');
let logoutButton = document.getElementById('logout');
let users = document.getElementById('users');
let items = document.getElementById('items');
let invoices = document.getElementById('invoices');
let cart = document.getElementById('cart');
let userSummary = document.getElementById('userSummary');

logoutButton.addEventListener('click', () => {
  window.location.href = 'http://localhost:5000/';
  localStorage.removeItem('user');
});

closeBtn.addEventListener('click', () => {
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

async function getData() {
  let promises = [
    'http://localhost:5000/user/users',
    'http://localhost:5000/retail/stocks',
    'http://localhost:5000/invoice/invoices',
    'http://localhost:5000/cart/in_item_cart',
  ];
  let responses = promises.map(async (promise) => {
    let response = await fetch(promise);
    let json = await response.json();
    return json;
  });
  responses.forEach((item) =>
    item.then((item) => {
      switch (Object.keys(item)[0]) {
        case 'UserCount':
          users.innerHTML = item.UserCount;
          break;
        case 'CartItemNo':
          cart.innerHTML = item.CartItemNo;
          break;
        case 'InvoiceCount':
          invoices.innerHTML = item.InvoiceCount;
          break;
        case 'StockCount':
          items.innerHTML = item.StockCount;
          break;
      }
    })
  );
}

async function loadData() {}

async function checkUser() {
  if (
    !localStorage.getItem('user') ||
    JSON.parse(localStorage.getItem('user')).Role === 'Customer' ||
    JSON.parse(localStorage.getItem('user')).Role === 'InventoryManager' ||
    JSON.parse(localStorage.getItem('user')).Role === 'Finance'
  ) {
    window.alert('You are not authorized to view this page');
    window.history.back();
  } else {
    await getData();
    await loadData();
    await getUserSummary();
  }
}

async function getUserSummary() {
  let roles = [];
  const response = await fetch('http://localhost:5000/user/roles');
  const json = await response.json();
  roles = json;
  let ctx = userSummary.getContext('2d');
  const labels = roles.map((item) => item.Role);
  const data = {
    labels: labels,
    datasets: [
      {
        label: labels,
        data: roles.map((item) => item.count),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(54, 162, 235)',
        ],
        hoverOffset: 4,
      },
    ],
  };
  const config = {
    type: 'doughnut',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  new Chart(ctx, config);
}
