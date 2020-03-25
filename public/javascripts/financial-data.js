const start  = document.getElementById('start')
const end    = document.getElementById('end')
const button = document.getElementById('fetch')
const ctx    = document.getElementById('myChart').getContext('2d');

let dates 
let prices

const getData = (one,two) => {
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${one}&end=${two}`)
    .then(response => {
      const data = response.data["bpi"];
      console.log(data)
      dates = Object.keys(data)
      prices = Object.values(data)
      myChart(dates,prices)
    })
    .catch(error => {
        console.log(error);
    });  
}

const myChart = (one,two) => new Chart(ctx, {
      type: 'line',
      data: {
          labels: one,
          datasets: [{
              label: '# bitcoin price',
              data: two,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });

  

button.onclick = getData(start.value,end.value) 