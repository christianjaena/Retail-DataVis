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
  items
    .filter((item) => item.Year === year && item.Month === month)
    .forEach((item) => {
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

async function renderDropdown() {
  await getItemDemand();
  lowerSubcontainer.innerHTML = `
        <select class="dropdown" name="year" id="year">
          <option value="" disabled selected>Select Year</option>
          <option value="2010">2010</option>
          <option value="2011">2011</option>
        </select>
        <select class="dropdown" id="month" name="month">
          <option value="" disabled selected>Select Month</option>
        </select>
  `;
  year = document.getElementById('year');
  month = document.getElementById('month');
  year.addEventListener('change', () => {
    if (year.value === '2010') {
      month.innerHTML = `
              <option value="" disabled selected>Select Month</option>
              <option value="11">November</option>
              <option value="12">December</option>
  `;
    } else if (year.value === '2011') {
      month.innerHTML = `
              <option value="" disabled selected>Select Month</option>
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
  `;
    }
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
