let sidebar = document.querySelector('.sidebar');
let closeBtn = document.querySelector('#btn');
let logoutButton = document.getElementById('logout');
let itemDemandDiv = document.getElementById('item-demand');
let lowerSubcontainer = document.querySelector('.lower-subcontainer');
let topItems = document.getElementById('top_5_items');
let topItems2 = document.getElementById('top_5_items_2');
let items = [];
let year;
let month;

function filterItems(year, month) {
  topItems.innerHTML = '';
  topItems2.innerHTML = '';
  let filteredItems = items.filter(
    (item) => item.Year === year && item.Month === month
  );
  if (!filteredItems.length) {
    topItems.innerHTML += '<h3>No data for this month.</h3>';
  } else {
    filteredItems.forEach((item) => {
      if (item.MonthlyRank <= 5) {
        topItems.innerHTML += `
                    <li class="top-item">
                        <div class="item-name">${item.Description.toLowerCase()}</div>
                        <div class="item-qty">${item.Quantity}</div>
                    </li>
    `;
      } else {
        topItems2.innerHTML += `
                    <li class="top-item">
                        <div class="item-name">${item.Description.toLowerCase()}</div>
                        <div class="item-qty">${item.Quantity}</div>
                    </li>
    `;
      }
    });
  }
}

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
    JSON.parse(localStorage.getItem('user')).Role === 'Finance'
  ) {
    window.alert('You are not authorized to view this page');
    window.history.back();
  } else {
    renderDropdown();
  }
}

async function getItemPrices() {
  const response = await fetch('http://localhost:5000/retail/item_prices');
  const json = await response.json();
  let ctx = document.getElementById('itemPrices').getContext('2d');
  const labels = json.map((item) => item.Description);
  const data = {
    labels: labels,
    datasets: [
      {
        type: 'bar',
        label: 'Top 50 Most Expensive Items',
        data: json.map((item) => item.UnitPrice),
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
      },
    ],
  };
  const config = {
    data: data,
    options: {
      indexAxis: 'y',
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
    },
  };
  new Chart(ctx, config);
}

async function renderDropdown() {
  await getItemPrices();
  await getItemDemand();
  await itemDemandGraph();
  lowerSubcontainer.innerHTML = `
        <select class="dropdown" name="year" id="year">
          <option value="2010">2010</option>
          <option value="2011">2011</option>
        </select>
        <select class="dropdown" id="month" name="month">
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
        </select>
  `;
  year = document.getElementById('year');
  month = document.getElementById('month');
  month.value = '11';
  filterItems(year.value, month.value);
  year.addEventListener('change', () => {
    filterItems(year.value, month.value);
  });
  month.addEventListener('change', () => {
    filterItems(year.value, month.value);
  });
}
async function getItemDemand() {
  let response = await fetch('http://localhost:5000/retail/monthly_demand');
  let json = await response.json();
  json.forEach((item) => {
    if (item.Description === null || item.Description === '?') {
      item.Description = 'Unnamed Item';
    }
    item.Year = item.Month.split('-')[0];
    item.Month = item.Month.split('-')[1];
    items.push(item);
  });
}

async function itemDemandGraph() {
  let ctx = document.getElementById('itemDemand').getContext('2d');
  const labels = items.map((item) => `${item.Year}-${item.Month}`);
  const data = {
    labels: labels,
    datasets: [
      {
        type: 'line',
        label: 'Item with most demand per Month',
        data: items.map((item) => item.Quantity),
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
}
