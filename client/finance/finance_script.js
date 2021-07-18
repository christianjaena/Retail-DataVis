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

function checkUser() {
  if (
    !localStorage.getItem('user') ||
    JSON.parse(localStorage.getItem('user')).Role === 'Customer' ||
    JSON.parse(localStorage.getItem('user')).Role === 'InventoryManager'
  ) {
    window.alert('You are not authorized to view this page');
    window.location.href = 'http://localhost:5000/';
  }
}

async function getCountrySales() {
  const response = await fetch('http://localhost:5000/retail/country_sales');
  let data = await response.json();
  data.forEach((item) => {
    data[item.Country] = parseInt(item.count);
  });
  var width = 450;
  height = 450;
  margin = 40;

  var radius = Math.min(width, height) / 2 - margin;

  var svg = d3
    .select('#countrySales')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

  var color = d3.scaleOrdinal().domain(data).range(d3.schemeSet2);

  var pie = d3.pie().value(function (d) {
    return d.value;
  });
  var data_ready = pie(d3.entries(data));

  var arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

  svg
    .selectAll('mySlices')
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', arcGenerator)
    .attr('fill', function (d) {
      return color(d.data.key);
    })
    .attr('stroke', 'black')
    .style('stroke-width', '2px')
    .style('opacity', 0.7);

  svg
    .selectAll('mySlices')
    .data(data_ready)
    .enter()
    .append('text')
    .text(function (d) {
      return d.data.key;
    })
    .attr('transform', function (d) {
      return 'translate(' + arcGenerator.centroid(d) + ')';
    })
    .style('text-anchor', 'middle')
    .style('font-size', 17);
}
getCountrySales();
