

makeChart();

async function makeChart(){
  const data = await getData();
  //console.log(xlabels)
  //console.log(ylabels)
  const ctx = document.getElementById('myChart');
  const chart = new Chart(ctx, {
      type: 'bar', // The type of chart we want to create

      // The data for our dataset
      data: {
          //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
          labels: data.xlabels
          ,
          datasets: [{
              label: 'Oregon 2009',
              backgroundColor: 'rgb(25, 132, 99)',
              borderColor: 'rgb(25, 132, 99)',
              //data: [20, 10, 5, 2, 20, 30, 45]
              data:data.ylabels
          }]
      },
      options: {
       //responsive: true,
        scales: {
          xAxes: [ {
            //type: 'time',
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Household Income'
            },
            // ticks: {
            //   major: {
            //     fontStyle: 'bold',
            //     fontColor: '#FF0000'
            //   }
            // }
          } ],
          yAxes: [ {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Number of Households (thousands)'
            },
           // ticks: {
        	   // beginAtZero: true
          //  }
          }]
        }
      }
  });
}

async function getData() {
  const xlabels = [];
  const ylabels = [];
  const response = await fetch('Oregon Household Income Distribution 2009.csv');
  const data = await response.text();
  // console.log(data)
  const table = data.split('\r\n').slice(1);
  table.forEach(row => {
    const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    //const columns = row.split(',');
    
    const year = columns[0];
   // console.log("year: "+ year)
    var income_level = columns[2];
    income_level=income_level.replace(/['"]+/g, '');
    console.log("income_level: "+ income_level)
    xlabels.push(income_level);
    const percent = columns[3];
   // console.log("percent: "+ percent)
   
    var number_of_households =columns[4];
  //  console.log("number_of_households: "+ number_of_households)
    number_of_households=number_of_households.replace(/['"]+/g, '');
    ylabels.push(parseFloat(number_of_households));
  });
  console.log(xlabels)
  console.log(ylabels)
  return {xlabels, ylabels}
}


