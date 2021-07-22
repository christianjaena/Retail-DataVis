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

function menuBtnChange() {
  if (sidebar.classList.contains('open')) {
    closeBtn.classList.replace('bx-menu', 'bx-menu-alt-right'); //replacing the iocns class
  } else {
    closeBtn.classList.replace('bx-menu-alt-right', 'bx-menu'); //replacing the iocns class
  }
}

function checkUser() {
  if (
    !localStorage.getItem('user') ||
    JSON.parse(localStorage.getItem('user')).Role === 'Customer' ||
    JSON.parse(localStorage.getItem('user')).Role === 'InventoryManager'
  ) {
    window.alert('You are not authorized to view this page');
    window.history.back()
  }
}

(async function getYearlySales() {
  let yearlySales = [];
  const response = await fetch('http://localhost:5000/retail/yearly_sales');
  const json = await response.json();
  yearlySales = json;
  let ctx = document.getElementById('financeView').getContext('2d');
  const labels = yearlySales.map(
    (item) => parseInt(item.MonthlyInvoice.split('-')[0]) + 1
  );
  const data = {
    labels: labels,
    datasets: [
      {
        type: 'bar',
        label: 'Annual Sales',
        data: yearlySales.map((item) => item.Sales),
        backgroundColor: ['rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };
  const config = {
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
})();

(async function getDailySales() {
  let dailySales = [];
  const response = await fetch('http://localhost:5000/retail/daily_sales');
  const json = await response.json();
  dailySales = json;
  let ctx = document.getElementById('dailySales');
  const labels = dailySales.map((item) => item.DailyInvoice.split('T')[0]);
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Daily Sales',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: dailySales.map((item) => item.Sales),
      },
    ],
  };
  const config = {
    type: 'bar',
    data,
  };
  new Chart(ctx, config);
})();

(async function getWeeklySales() {
  let weeklySales = [];
  const response = await fetch('http://localhost:5000/retail/weekly_sales');
  const json = await response.json();
  weeklySales = json;
  let ctx = document.getElementById('weeklySales');
  const labels = weeklySales.map((item) => item.WeeklyInvoice.split('T')[0]);
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Weekly Sales',
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgba(153, 102, 255, 1)',
        data: weeklySales.map((item) => item.Sales),
      },
    ],
  };
  const config = {
    type: 'bar',
    data,
  };
  new Chart(ctx, config);
})();

(async function getMonthlySales() {
  let monthlySales = [];
  const response = await fetch('http://localhost:5000/retail/monthly_sales');
  const json = await response.json();
  monthlySales = json;
  document.getElementById('total').innerHTML +=
    monthlySales[monthlySales.length - 1].Sales;
  let ctx = document.getElementById('monthlySales');
  const labels = monthlySales.map((item) => item.MonthlyInvoice.split('T')[0]);
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Monthly Sales',
        backgroundColor: 'rgba(255, 205, 86, 0.5)',
        borderColor: 'rgba(255, 205, 86, 1)',
        data: monthlySales.map((item) => item.Sales),
      },
    ],
  };
  const config = {
    type: 'bar',
    data,
  };
  new Chart(ctx, config);
})();

(async function getCountrySales() {
  let countrySales = [];
  const response = await fetch('http://localhost:5000/retail/country_sales');
  const json = await response.json();
  countrySales = json;
  let ctx = document.getElementById('countrySales');
  const labels = countrySales.map((item) => item.CountryInvoice);
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Country Sales',
        backgroundColor: countrySales.map((item) => {
          let o = Math.round;
          let r = Math.random;
          let s = 255;

          return (
            'rgba(' +
            o(r() * s) +
            ',' +
            o(r() * s) +
            ',' +
            o(r() * s) +
            ',' +
            1 +
            ')'
          );
        }),
        data: countrySales.map((item) => item.Sales),
        hoverOffset: 4,
      },
    ],
  };
  const config = {
    type: 'doughnut',
    data,
  };
  new Chart(ctx, config);
})();
