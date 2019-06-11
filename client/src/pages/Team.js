import React from "react";
import * as d3 from 'd3';
import Clutch from '../assets/Clutch.csv'


class Team extends React.Component {

    CB(){
      // set the dimensions and margins of the graph
    var width = 1200
    var height = 800
    
    // append the svg object to the body of the page
    var svg = d3.select("#team")
      .append("svg")
        .attr("width", width)
        .attr("height", height)
    
    // Read data
  
    d3.csv(Clutch).then (function(data) {
    
      // Filter a bit the data -> more than 1 million inhabitants
     var data = data.filter(function(d){ return d.value>1 })
    
      // Color palette for continents?
      var color = d3.scaleOrdinal()
      .domain(["ATL", "BOS", "BRK", "CHO", "CHI", "CLE", "DAL", "DEN", "DET", "GSW", "HOU", "IND", "LAC", "LAL", "MEM", "MIA", "MIL", "MIN", "NOP", "NYK", "OKC", "ORL", "PHI", "PHO", "POR", "SAC", "SAS", "TOR", "UTA", "WAS"])
      .range(["#E03A3E","#007A33","#000000","#1D1160","#CE1141","#6F263D","#00538C","#0E2240","#C8102E","#006BB6","#CE1141","#002D62","#C8102E","#552583","#5D76A9","#98002E","#00471B","#0C2340","#0C2340","#006BB6","#007AC1","#0077C0","#006BB6","#1D1160","#E03A3E","#5A2D81","#C4CED4","#CE1141","#002B5C","#002B5C"])    
      
      var line = d3.scaleOrdinal()
      .domain(["ATL", "BOS", "BRK", "CHO", "CHI", "CLE", "DAL", "DEN", "DET", "GSW", "HOU", "IND", "LAC", "LAL", "MEM", "MIA", "MIL", "MIN", "NOP", "NYK", "OKC", "ORL", "PHI", "PHO", "POR", "SAC", "SAS", "TOR", "UTA", "WAS"])
      .range(["#C1D32F","#BA9653","#FFFFFF","#00788C","#000000","#041E42","#002B5E","#FEC524","#006BB6","#FDB927","#000000","#FDBB30","#1D428A","#FDB927","#12173F","#F9A01B","#EEE1C6","#236192","#C8102E","#F58426","#EF3B24","#C4CED4","#ED174C","#E56020","#000000","#63727A","#000000","#000000","#00471B","#E31837"])

        // Size scale for players
      var size = d3.scaleLinear()
        .domain([0, 60])
        .range([5,100])  // circle will be between 7 and 55 px wide
    
      // create a tooltip
      var Tooltip = d3.select("#team")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "black")
        .style("color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
        .style("border-color", "black")
    
      // Three function that change the tooltip when user hover / move / leave a cell
      var mouseover = function(d) {
        Tooltip
          .style("opacity", 1)
      }
      var mousemove = function(d) {
        Tooltip
          .html('<u>' + d.key + '</u>' + "<br>" + d.value + " FG %")
          .style("left", (d3.mouse(this)[0]+20) + "px")
          .style("top", (d3.mouse(this)[1]+20) + "px")
      }
      var mouseleave = function(d) {
        Tooltip
          .style("opacity", 0)
      }
    
      // Initialize the circle: all located at the center of the svg area
      var node = svg.append("g")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
          .attr("class", "node")
          .attr("r", function(d){ return size(d.value)})
          .attr("cx", width / 2)
          .attr("cy", height / 2)
          .style("fill", function(d){ return color(d.team)})
          .style("fill-opacity", 0.8)
          .attr("stroke", function(d){ return line(d.team)})
          .style("stroke-width", 3)
          .on("mouseover", mouseover) // What to do when hovered
          .on("mousemove", mousemove)
          .on("mouseleave", mouseleave)
          .call(d3.drag() // call specific function when circle is dragged
               .on("start", dragstarted)
               .on("drag", dragged)
               .on("end", dragended));
    
      // Features of the forces applied to the nodes:
      var simulation = d3.forceSimulation()
          .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
          .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
          .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (size(d.value)+3) }).iterations(1)) // Force that avoids circle overlapping
    
      // Apply these forces to the nodes and update their positions.
      // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
      simulation
          .nodes(data)
          .on("tick", function(d){
            node
                .attr("cx", function(d){ return d.x; })
                .attr("cy", function(d){ return d.y; })
          });
    
      // What happens when a circle is dragged?
      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(.03).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }
      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(.03);
        d.fx = null;
        d.fy = null;
      }
    
    })
  }
      componentDidMount () {
        this.CB()
      }

    render (){
    return (
      <div id="team"></div>
    )
    }
    
}
export default Team;
