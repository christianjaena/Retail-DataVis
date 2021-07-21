let sidebar = document.querySelector('.sidebar');
let closeBtn = document.querySelector('#btn');
let searchBtn = document.querySelector('.bx-search');
let logoutButton = document.getElementById('logout');
let itemDemandDiv = document.getElementById('item-demand');

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
    window.history.back()
  }
}

(async function getItemDemand() {
  let response = await fetch('http://localhost:5000/retail/monthly_demand');
  let json = await response.json();
  json.forEach((item, idx) => {
    if (item.Description === null || item.Description === '?') {
      item.Description = 'Unnamed Item';
    }
    if (idx % 5 === 0) {
      itemDemandDiv.innerHTML += `<h3>${item.Month.split('-')[0]}-${
        item.Month.split('-')[1]
      }</h3>`;
    }
    itemDemandDiv.innerHTML += `
     <div>
      ${item.MonthlyRank}.) ${item.Description} - ${item.Quantity} sales
     </div> 
    `;
  });
})();
