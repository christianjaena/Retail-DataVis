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

// Finance
async function financeView() {
  var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  var svg = d3
    .select('#financeView')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  d3.csv(
    'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv',

    function (d) {
      return { date: d3.timeParse('%Y-%m-%d')(d.date), value: d.value };
    },

    function (data) {
      var x = d3
        .scaleTime()
        .domain(
          d3.extent(data, function (d) {
            return d.date;
          })
        )
        .range([0, width]);
      svg
        .append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

      var y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, function (d) {
            return +d.value;
          }),
        ])
        .range([height, 0]);
      svg.append('g').call(d3.axisLeft(y));

      svg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr(
          'd',
          d3
            .line()
            .x(function (d) {
              return x(d.date);
            })
            .y(function (d) {
              return y(d.value);
            })
        );
    }
  );
}

var margin = { top: 30, right: 30, bottom: 70, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

async function dailyView() {
  // Daily
  var svg = d3
    .select('#daily')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  d3.csv(
    'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv',
    function (data) {
      data.sort(function (b, a) {
        return a.Value - b.Value;
      });

      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Country;
          })
        )
        .padding(0.2);
      svg
        .append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'translate(-10,0)rotate(-45)')
        .style('text-anchor', 'end');

      var y = d3.scaleLinear().domain([0, 13000]).range([height, 0]);
      svg.append('g').call(d3.axisLeft(y));

      svg
        .selectAll('mybar')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', function (d) {
          return x(d.Country);
        })
        .attr('y', function (d) {
          return y(d.Value);
        })
        .attr('width', x.bandwidth())
        .attr('height', function (d) {
          return height - y(d.Value);
        })
        .attr('fill', '#69b3a2');
    }
  );
}
async function monthlyView() {
  // Monthly
  var svg = d3
    .select('#monthly')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  d3.csv(
    'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv',
    function (data) {
      data.sort(function (b, a) {
        return a.Value - b.Value;
      });

      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Country;
          })
        )
        .padding(0.2);
      svg
        .append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'translate(-10,0)rotate(-45)')
        .style('text-anchor', 'end');

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 13000]).range([height, 0]);
      svg.append('g').call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll('mybar')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', function (d) {
          return x(d.Country);
        })
        .attr('y', function (d) {
          return y(d.Value);
        })
        .attr('width', x.bandwidth())
        .attr('height', function (d) {
          return height - y(d.Value);
        })
        .attr('fill', '#69b3a2');
    }
  );
}

async function annualView() {
  // Annual
  var svg = d3
    .select('#annual')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  d3.csv(
    'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv',
    function (data) {
      data.sort(function (b, a) {
        return a.Value - b.Value;
      });

      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Country;
          })
        )
        .padding(0.2);
      svg
        .append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'translate(-10,0)rotate(-45)')
        .style('text-anchor', 'end');

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 13000]).range([height, 0]);
      svg.append('g').call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll('mybar')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', function (d) {
          return x(d.Country);
        })
        .attr('y', function (d) {
          return y(d.Value);
        })
        .attr('width', x.bandwidth())
        .attr('height', function (d) {
          return height - y(d.Value);
        })
        .attr('fill', '#69b3a2');
    }
  );
}
annualView();
monthlyView();
dailyView();
getCountrySales();
financeView();
