

function gdpScience() {

    var tickDuration = 400;
    let year = 1970;
    
    var top_n = 15;
    var margin = {top: 50, right: 80, bottom: 250, left: 80},
    width = 1000 - margin.left - margin.right,
    height = 950 - margin.top - margin.bottom;
  

    var svg = d3.select("#vis")
    .select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


  const Y_VARS = {
    "Foreign direct investment, net inflows (BoP, current US$)": true,
    "Total Patents": false,
    "Exports of goods and services (BoP, current US$)": false,
    "Foreign direct investment, net (BoP, current US$)": false,
    
    "Trademark applications, total": false,
  }
  function createDropdown() {
    const select = document.getElementById("yVar");
    Object.keys(Y_VARS).forEach((yVar) => {
      const option = document.createElement("option");
      option.text = option.value = yVar;
      select.add(option);
    })
  }
  createDropdown();

  

  function allToFloat(data) {
    data.map(d => {
      for (const key in d) d[key] = !isNaN(parseFloat(d[key])) ? parseFloat(d[key]) : d[key];
      if ([1970, 1980, 1990].includes(d["Year"])) {
        for (const key in d) {
          if (key === "Year") continue;
          if (typeof d[key] === 'number') {
            d[key] = d[key] / 2;
          }
        }
      }
      return d;
    });
    return data;
  }
                // append the svg object to the body of the page
                // https://raw.githubusercontent.com/geetkalra/weblab/master/gdpScience.csv
                
                            
d3.csv("https://raw.githubusercontent.com/6859-sp21/final-project-india_economichistory/main/gdpScience_noContinents.csv").then((gdpScience) => {
  gdpScience = allToFloat(gdpScience);
  const g7Countries = ['India','China']
  // console.log(gdpScience)
  // Setting parameters
  
  let popMin = 10000, popMax = 1000000000;
  let xVar = "GDP";
  let yVar = Y_VARS[0];
  // let xVar = ;
  // let yVar = "GDP";
  let country = "India";

  // Setting up variables that describe chart space
  // const height = 500;
  // const width = 600;
  const margin = ({ top: 10, right: 20, bottom: 50, left: 50 });

  // Create scatterplot SVG
const colorScale = (countryName) => d3.schemeTableau10[g7Countries.includes(countryName) ? 1 : 0]

  const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

 

  // Initialize points
  const symbol = d3.symbol();
  const g = svg.append('g');

  // Initialize x-axis
  let xScale = d3.scaleLog()
    .domain([10000000, d3.max(gdpScience, d => d[xVar])])
    // .domain(d3.extent(gdpScience, d => d[xVar]))
    .range([height - margin.bottom, margin.top])
    
    .nice();
  const xAxisG = svg.append('g')
  .attr('transform', `translate(${margin.left + 30}, 0)`);
  const xAxisText = xAxisG.call(d3.axisLeft(xScale))
    .append('text');

    

  // Initialize y-axis
  let yScale = d3.scaleLog()
    .domain([1, d3.max(gdpScience, d => d[yVar])])
    // .domain(d3.extent(gdpScience, d => d[yVar]))
    .range([margin.left, width - margin.right])
    .nice();
  const yAxisG = svg.append('g')

  .attr('transform', `translate(0, ${height - margin.bottom})`);
  const yAxisText = yAxisG.call(d3.axisBottom(yScale))
    .append('text');


   // Add year background label
  //  const yearLabel = svg.append('text');

  let yearText = svg.append('text')
  .attr('class', 'yearText')
  .attr('x', 700)
  .attr('y', height - margin.bottom - 100)
  // .style('text-anchor', 'end')
  .html(~~year)
  // .call(halo, 10);

  function updateScatter() {
    yVar = document.getElementById("yVar").value;
    const data = gdpScience.filter(d => d["Year"] === year && d[xVar] >= 1 && d[yVar] >= 1);

    // Draw x-axis
    xScale = d3.scaleLog()
      // .domain([10000000, d3.max(gdpScience, d => d[xVar])])
      .domain([10000000, 1e+17])
      .range([height - margin.bottom, margin.top])
      .nice();
    xAxisG.call(d3.axisLeft(xScale));
    xAxisText
      .attr('transform', `translate(20, ${margin.top}) rotate(-90)`)
      .attr('text-anchor', 'end')
      .attr('fill', 'black')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .text(xVar);
    //   .range([margin.left, width - margin.right])
    //   .nice();
    // xAxisG.call(d3.axisBottom(xScale));
    // xAxisText
    //   .attr('transform', `translate(0, 0)`)
    //   .attr('text-anchor', 'end')
    //   .attr('fill', 'black')
    //   .attr('font-size', '12px')
    //   .attr('font-weight', 'bold')
    //   .attr('x', width - margin.right)
    //   .attr('y', -10)
    //   .text(xVar);

    // Draw y-axis
    if (Y_VARS[yVar])
      yScale = d3.scaleLog()
        .domain([1, d3.max(gdpScience, d => d[yVar])])
        .range([margin.left, width - margin.right])
        // .range([height - margin.bottom, margin.top])
        .nice();
    else
      yScale = d3.scaleLinear()
        .domain([1, d3.max(gdpScience, d => d[yVar])])
        .range([margin.left, width - margin.right])
        .nice();
      yAxisG.call(d3.axisBottom(yScale));
      yAxisText
        .attr('transform', `translate(0, 0)`)
        .attr('text-anchor', 'end')
        .attr('fill', 'black')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .attr('x', width - margin.right)
        .attr('y', -10)
        .text(yVar);
    //     .range([height - margin.bottom, margin.top])
    //     .nice();
    // yAxisG.call(d3.axisLeft(yScale));
    // yAxisText
    //   .attr('transform', `translate(20, ${margin.top}) rotate(-90)`)
    //   .attr('text-anchor', 'end')
    //   .attr('fill', 'black')
    //   .attr('font-size', '12px')
    //   .attr('font-weight', 'bold')
    //   .text(yVar);

    // Draw points
    g
      .selectAll('path')
      .data(data)
      .join('path')
      .attr('transform', d => `translate(${yScale(d[yVar])}, ${xScale(d[xVar])})`)
      .attr('fill', d => colorScale(d["Country Name"]))
      .attr('d', d => symbol())
      .on("mouseover",function(d,i){
        console.log(d)
        d3.select(this).style("opacity",1);
    
        d3.select('#tooltip')
        .style('left', (d3.event.pageX + 10)+ 'px')
        .style('top', (d3.event.pageY - 25) + 'px')
        .style('display', 'inline-block')
        // .style("background", z(d.country))
        .html("Country: " + d["Country Name"] + "<br/>  GDP (Billion US $): " + d[xVar]+"             " + yVar+":" + d[yVar])

          d3.select(this)
            // .attr("fill", "black")
            .attr("d", symbol.size(64 * 4));
    
                })
      .on("mouseout", function(d,i) {
        d3.select(this).style("opacity",1);
        d3.select('#tooltip')
        .style('display', 'none')
        //  tooltip.transition()
        //    .duration(500)
        //    .style("opacity", 0);

         d3.select(this)
            // .attr("fill", z(d.country))
            .attr("d", symbol.size(64));

        });
      // .on("mouseout", function (event, d) {
      //   tooltip.transition()
      //     .duration(500)
      //     .style("opacity", 0);
      //   d3.select(this)
      //     .attr("fill", colorScale(d["Country Name"]))
      //     .attr("d", symbol.size(64));
      // })
      // .on("click", function (event, d) {
      //   country = d["Country Name"];
      //   updatePie();
      // });

    // Draw year label
    // yearLabel
    //   .attr('x', 800)
    //   .attr('y', height - margin.bottom - 100)
    //   .attr('fill', '#ccc')
    //   .attr('font-family', 'Helvetica Neue, Arial')
    //   .attr('font-weight', 500)
    //   .attr('font-size', 160)
    //   .text(year);
  }
  document.getElementById("yVar").addEventListener("change", updateScatter);
 
  $(function () {
    $("#yearForSlider").slider({
      range: false,
      min: 1970,
      max: 2016,
      value: 2010,
      slide: function (event, ui) {
        year = ui.value;
        document.getElementById("yearSelected").innerText = `${year}`
        updateScatter();
      }
    });
  });
  updateScatter();
  // let tickDuration = 100
  // let year = 1970;
  let ticker = d3.interval(
        e => {
          console.log("imhere")
                updateScatter();
              if(year == 2016) ticker.stop();
              yearText.html(~~year);
              year = year+1;
            //  year = d3.format('.2f')((+year) + 1);
            },
                        tickDuration/5);

  // *********************************************************************


  // Initialize pie graphics

  // *********************************************************************

  

});

 }