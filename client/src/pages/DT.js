import React from "react";
import * as d3 from 'd3';
import Scatter from '../assets/Scatter.csv'

class DT extends React.Component {

BC(){
  // set the dimensions and margins of the graph
var margin = {top: 80, right: 300, bottom: 120, left: 60},
    width = 1000 - margin.left - margin.right,
    height = 840 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#BC")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv(Scatter).then (function(data) {

  // ---------------------------//
  //       AXIS  AND SCALE      //
  // ---------------------------//

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 25])
    .range([0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5));

  // Add X axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height+50)
      .text("Time Remaining In Game");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([1, 50])
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add Y axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", 0)
      .attr("y", -20 )
      .text("Shot Distance")
      .attr("text-anchor", "start")

  // Add a scale for bubble size
  var z = d3.scaleSqrt()
    .domain([1, 10])
    .range([2, 30]);

  // Add a scale for bubble color
  var color = d3.scaleOrdinal()
  .domain(["ATL", "BOS", "BRK", "CHO", "CHI", "CLE", "DAL", "DEN", "DET", "GSW", "HOU", "IND", "LAC", "LAL", "MEM", "MIA", "MIL", "MIN", "NOP", "NYK", "OKC", "ORL", "PHI", "PHO", "POR", "SAC", "SAS", "TOR", "UTA", "WAS"])
  .range(["#E03A3E","#007A33","#000000","#1D1160","#CE1141","#6F263D","#00538C","#0E2240","#C8102E","#006BB6","#CE1141","#002D62","#C8102E","#552583","#5D76A9","#98002E","#00471B","#0C2340","#0C2340","#006BB6","#007AC1","#0077C0","#006BB6","#1D1160","#E03A3E","#5A2D81","#C4CED4","#CE1141","#002B5C","#002B5C"])    
  
  var line = d3.scaleOrdinal()
  .domain(["ATL", "BOS", "BRK", "CHO", "CHI", "CLE", "DAL", "DEN", "DET", "GSW", "HOU", "IND", "LAC", "LAL", "MEM", "MIA", "MIL", "MIN", "NOP", "NYK", "OKC", "ORL", "PHI", "PHO", "POR", "SAC", "SAS", "TOR", "UTA", "WAS"])
  .range(["#C1D32F","#BA9653","#FFFFFF","#00788C","#000000","#041E42","#002B5E","#FEC524","#006BB6","#FDB927","#000000","#FDBB30","#1D428A","#FDB927","#12173F","#F9A01B","#EEE1C6","#236192","#C8102E","#F58426","#EF3B24","#C4CED4","#ED174C","#E56020","#000000","#63727A","#000000","#000000","#00471B","#E31837"])



  // ---------------------------//
  //      TOOLTIP               //
  // ---------------------------//

  // -1- Create a tooltip div that is hidden by default:
  var tooltip = d3.select("#BC")
    .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "black")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("width", "300px")
      .style("length", "100px")
      .style("color", "white")

  // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
  var showTooltip = function(d) {

    tooltip
      .transition()
      .duration(2000)
    tooltip
      .style("opacity", 1)
      .html("Description: " + d.description)
      .style("left", (d3.mouse(this)[0]+50) + "px")
      .style("top", (d3.mouse(this)[1]+50) + "px")
  }
  var moveTooltip = function(d) {
    tooltip
      .style("left", (d3.mouse(this)[0]+50) + "px")
      .style("top", (d3.mouse(this)[1]+50) + "px")
  }
  var hideTooltip = function(d) {
    tooltip
      .transition()
      .duration(5000)
      .style("opacity", 0)
  }


  // ---------------------------//
  //       HIGHLIGHT GROUP      //
  // ---------------------------//

  // What to do when one group is hovered
  var highlight = function(d){
    // reduce opacity of all groups
    d3.selectAll(".bubbles").style("opacity", .05)
    // expect the one that is hovered
    d3.selectAll("."+d).style("opacity", 1)
  }

  // And when it is not hovered anymore
  var noHighlight = function(d){
    d3.selectAll(".bubbles").style("opacity", 0.5)
  }


  // ---------------------------//
  //       CIRCLES              //
  // ---------------------------//


  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("class", function(d) { return "bubbles " + d.teamname })
      .attr("cx", function (d) { return x(d.timer); } )
      .attr("cy", function (d) { return y(d.shotdistance); } )
      .attr("r", function (d) { return z(d.makeormiss); } )
      .style("fill", function (d) { return color(d.teamname); } )
      .attr("stroke", function(d){ return line(d.teamname)})
      .style("stroke-width", 1)
      .attr("opacity", "0.5")
    // -3- Trigger the functions for hover
    .on("mouseover", showTooltip )
    .on("mousemove", moveTooltip )
    .on("mouseleave", hideTooltip )
 


    // ---------------------------//
    //       LEGEND              //
    // ---------------------------//

    // Add legend: circles
    var valuesToShow = [10000000, 100000000, 1000000000]
    var xCircle = 390
    var xLabel = 440
    svg
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("circle")
        .attr("cx", xCircle)
        // .attr("cy", function(d){ return height + 24 - z(d) } )
        .attr("r", function(d){ return z(d) })
        .style("fill", "none")
        .attr("stroke", "black")

    // Add legend: segments
    svg
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("line")
        .attr('x1', function(d){ return xCircle + z(d) } )
        .attr('x2', xLabel)
        .attr('y1', function(d){ return height - 100 - z(d) } )
        .attr('y2', function(d){ return height - 100 - z(d) } )
        .attr('stroke', 'black')
        .style('stroke-dasharray', ('2,2'))

    // Add legend: labels
    svg
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("text")
        .attr('x', xLabel)
        .attr('y', function(d){ return height - 100 - z(d) } )
        .text( function(d){ return d/1000000 } )
        .style("font-size", 10)
        .attr('alignment-baseline', 'middle')

    // Legend title
    // svg.append("text")
    //   .attr('x', xCircle)
    //   .attr("y", height - 100 +30)
    //   .text("(M)")
    //   .attr("text-anchor", "middle")

    // Add one dot in the legend for each name.
    var size = 20
    var allgroups = ["ATL", "BOS", "BRK", "CHO", "CHI", "CLE", "DAL", "DEN", "DET", "GSW", "HOU", "IND", "LAC", "LAL", "MEM", "MIA", "MIL", "MIN", "NOP", "NYK", "OKC", "ORL", "PHI", "PHO", "POR", "SAC", "SAS", "TOR", "UTA", "WAS"]
    svg.selectAll("myrect")
      .data(allgroups)
      .enter()
      .append("circle")
        .attr("cx", 700)
        .attr("cy", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
        .style("fill", function(d){ return color(d)})
        .attr("stroke", function(d){ return line(d)})
        .style("stroke-width", 1)
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)

    // Add labels beside legend dots
    svg.selectAll("mylabels")
      .data(allgroups)
      .enter()
      .append("text")
        .attr("x", 700 + size*.8)
        .attr("y", function(d,i){ return i * (size + 5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d){ return color(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)
  })
}

componentDidMount(){
  this.BC()
}

render(){
  return(
    <div className="windowBox" id="BC"></div>
  )
}

}
export default DT;
