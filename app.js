// @TODO: YOUR CODE HERE!
// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
    .select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "#######";

// function used for updating x-scale var upon click on axis label
function xScale(####, chosenXAxis) {
  
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(####, d => d[chosenXAxis]) * 0.8,
    d3.max(######, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXaxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  if (chosenXAxis === "######") {
    var label = "########:";
  }
  else {
    var label = "########:";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function (d) {
      return (`${d.#####}<br>${label} ${d[chosenXAxis]}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function (data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function (data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}
// Step 3:
// Import data from the donuts.csv file
// =================================
d3.csv("data.csv", function (error, Data) {
    if (error) throw error;

//assign and execute the data from CSV file

// parse data
  #######.forEach(function(data) {
    data.###### = +data.######;
    data.#### = +data.#####;
    data.#### = +data.#####;
  });

 // xLinearScale function above csv import
  var xLinearScale = xScale(######, chosenXAxis);

  // Create y scale function
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(######, d => d.######)])
    .range([height, 0]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = ######.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${ height })`)
    .call(bottomAxis);

  // append y axis
  ######.append("g")
    .call(leftAxis);

  // append initial circles
  var circlesGroup = ######.selectAll("circle")
    .data(######)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d.######))
    .attr("r", 20)
    .attr("fill", "pink")
    .attr("opacity", ".5");

  // Create group for  2 x- axis labels
  var ###### = ######.append("g")
    .attr("transform", `translate(${ width / 2}, ${ height + 20 })`);

  var ###### = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "######") // value to grab for event listener
    .classed("active", true)
    .text("######");

  var albumsLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "######") // value to grab for event listener
    .classed("######", true)
    .text("######");

  // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("######");

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(######, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenXAxis === "######") {
          ######
            .classed("active", true)
            .classed("inactive", false);
          ######
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          ######
            .classed("active", false)
            .classed("inactive", true);
          ######
            .classed("active", true)
            .classed("inactive", false);
        }
      }
    });
});
