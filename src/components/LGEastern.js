import React from "react";
import * as d3 from "d3";
import ECdata from '../assets/eclinedata.csv';


class LGEastern extends React.Component {

    LGE() {
        // set the dimensions and margins of the graph
    var margin = { top: 30, right: 50, bottom: 10, left: 50 },
    width = 500,
    height = 600

  // append the svg object to the body of the page
  var svg = d3.select("#ECLG")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  // Parse the Data
  d3.csv(ECdata).then (function (data) {

    // Color scale: give me a specie name, I return a color
    var color = d3.scaleOrdinal()
    .domain(["MIL", "TOR", "PHI", "BOS", "IND", "BKN", "ORL", "DET", "CHA", "MIA", "WSH", "ATL", "CHI", "CLE", "NY"])
    .range([ "#00471B", "#CE1141","#006BB6", "#007A33", "#FDBB30","#000000","#0077C0","#C8102E","#1D1160","#98002E","#E31837","#FFCD00","#BC032B","#6F263D", "#F58426"])

    // Here I set the list of dimension manually to control the order of axis:
    var dimensions = ["Losses", "Standings", "Wins"]

    // For each dimension, I build a linear scale. I store all in a y object
    var y = {}
    var i = 0; 
    for (i in dimensions) {
      var name = dimensions[i]
      y[name] = d3.scaleLinear()
        .domain([10, 70]) // --> Same axis range for each group
        // --> different axis range for each group --> .domain( [d3.extent(data, function(d) { return +d[name]; })] )
        .range([height, 0])
    }

    // Build the X scale -> it find the best position for each Y axis
    var x = d3.scalePoint()
      .range([0, width])
      .domain(dimensions);

    // Highlight the specie that is hovered
    var highlight = function (d) {

      var team = d.Team

      // first every group turns grey
      d3.selectAll(".line")
        .transition().duration(200)
        .style("stroke", "lightgrey")
        .style("opacity", "0.2")
      // Second the hovered specie takes its color
      d3.selectAll("." + team)
        .transition().duration(200)
        .style("stroke", color(team))
        .style("opacity", "1")
    }

    // Unhighlight
    var doNotHighlight = function (d) {
      d3.selectAll(".line")
        .transition().duration(200).delay(1000)
        .style("stroke", function (d) { return (color(d.Team)) })
        .style("opacity", "1")
    }

    // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
    function path(d) {
      return d3.line()(dimensions.map(function (p) { return [x(p), y[p](d[p])]; }));
    }

    // Draw the lines
    svg
      .selectAll("myPath")
      .data(data)
      .enter()
      .append("path")
      .attr("class", function (d) { return "line " + d.Team }) // 2 class for each line: 'line' and the group name
      .attr("d", path)
      .style("fill", "none")
      .style("stroke", function (d) { return (color(d.Team)) })
      .style("opacity", 1)
      .on("mouseover", highlight)
      .on("mouseleave", doNotHighlight)

    // Draw the axis:
    svg.selectAll("myAxis")
      // For each dimension of the dataset I add a 'g' element:
      .data(dimensions).enter()
      .append("g")
      .attr("class", "axis")
      // I translate this element to its right position on the x axis
      .attr("transform", function (d) { return "translate(" + x(d) + ")"; })
      // And I build the axis with the call function
      .each(function (d) { d3.select(this).call(d3.axisLeft().ticks(5).scale(y[d])); })
      // Add axis title
      .append("text")
      .style("text-anchor", "middle")
      .attr("y", -9)
      .text(function (d) { return d; })
      .style("fill", "grey")

  })
    }

}