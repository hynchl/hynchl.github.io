//https://datacadamia.com/viz/d3/histogram


function createHistPlot(data) {
    // layout
    var margin = { top: 30, right: 30, bottom: 30, left: 50 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    let domain = [d3.min(data), d3.max(data)];
    const numBin = 100;

    var x = d3.scaleLinear().domain([0, 1]).range([0, 300]);
    
    let histogram = d3.histogram()
        .domain(x.domain())
        .thresholds(x.ticks(numBin));
    
    let bins = histogram(data)
    // console.log(bins);

    // append SVG
    var svg = d3
      .select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
    
    
    var y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([
        0,
        d3.max(bins, function(d) {
          return d.length;
        })
      ]);
    
    svg.append("g").call(d3.axisLeft(y));
    
    svg
        .selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) {
            return "translate(" + x(d.x0) + "," + y(d.length) + ")";
        })
        .attr("width", function(d) {
            return Math.max(x(d.x1) - x(d.x0) - 1,0);
        })
        .attr("height", function(d) {
            return height - y(d.length);
        })
        .style("fill", "#888888");

    svg
        .selectAll("rect")
        .exit()
        .remove()
        

  return svg;
}

function updateHistPlot(svg, data) {
    // layout
    var margin = { top: 30, right: 30, bottom: 30, left: 50 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    let domain = [d3.min(data), d3.max(data)];
    const numBin = 100;

    var x = d3.scaleLinear().domain([0, 1]).range([0, 300]);
    
    let histogram = d3.histogram()
        .domain(x.domain())
        .thresholds(x.ticks(numBin));
    
    let bins = histogram(data)
    // console.log(bins);

    
    var y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([
        0,
        d3.max(bins, function(d) {
          return d.length;
        })
      ]);
    
    svg
        .selectAll("rect")
        .data(bins)
        .transition()
        // .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) {
            return "translate(" + x(d.x0) + "," + y(d.length) + ")";
        })
        .attr("width", function(d) {
            return Math.max(x(d.x1) - x(d.x0) - 1,0);
        })
        .attr("height", function(d) {
            return height - y(d.length);
        })
        .style("fill", "#888888");

    return svg;
}

function Histogram(data, domain=[0,1], n_bin=100){
    // this function used in `scripts.js`
    let histogram = d3.histogram()
    .domain(domain)
    .thresholds(n_bin);
    return histogram(data)
}






// var color = "steelblue";
// var margin = ({top: 20, right: 20, bottom: 30, left: 40})
// var height = 500;
// var width = 500;

// let yAxis = g => g
//     .attr("transform", `translate(${margin.left},0)`)
//     .call(d3.axisLeft(y).ticks(height / 40))
//     .call(g => g.select(".domain").remove())
//     .call(g => g.select(".tick:last-of-type text").clone()
//         .attr("x", 4)
//         .attr("text-anchor", "start")
//         .attr("font-weight", "bold")
//         .text(data.y))

// let xAxis = g => g
//     .attr("transform", `translate(0,${height - margin.bottom})`)
//     .call(d3.axisBottom(x).ticks(width / 80 ).tickSizeOuter(0))
//     .call(g => g.append("text")
//         .attr("x", width - margin.right)
//         .attr("y", -4)
//         .attr("fill", "currentColor")
//         .attr("font-weight", "bold")
//         .attr("text-anchor", "end")
//         .text(data.x))

// let bins = d3.bin().thresholds(50)(data);

// let y = d3.scaleLinear()
//     .domain([0, d3.max(bins, d => d.length)]).nice()
//     .range([height - margin.bottom, margin.top])

// let x = d3.scaleLinear()
//     .domain([bins[0].x0, bins[bins.length - 1].x1])
//     .range([margin.left, width - margin.right])

// const svg = d3.select("body")
//     .append("svg")
//     .attr("viewBox", [0, 0, width, height]);

//     svg.append("g")
//         .selectAll("rect")
//         .data(bins)
//         .join("rect")
//         .attr("x", d => x(d.x0) + 1)
//         .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
//         .attr("y", d => y(d.length))
//         .attr("height", d => y(0) - y(d.length));

//     svg.append("g")
//         .call(xAxis);

//     svg.append("g")
//         .call(yAxis);




