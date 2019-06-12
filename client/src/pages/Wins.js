import React from "react";
import * as d3 from "d3";
import WCdata from '../assets/wclinedata.csv'; 
import ECdata from '../assets/eclinedata.csv';

class Wins extends React.Component {

  CM() {
    var data = [[66, ["MIL"]], [65, ["GSW", "TOR", "MIL"]], [64, ["GSW", "TOR", "MIL"]],[63, ["GSW", "TOR", "MIL"]],[62, ["GSW", "TOR", "MIL"]], [61, ["GSW", "TOR", "MIL"]], [60, ["GSW", "TOR", "MIL"]], [59, ["POR", "PHI", "GSW", "TOR", "MIL"]], [58, ["HOU", "GSW","POR","PHI", "TOR", "MIL"]], [57, ["DEN","HOU","UTA","GSW","POR","PHI", "TOR", "MIL"]], [56, ["OKC","UTA","HOU", "GSW","POR","PHI", "TOR", "MIL", "DEN"]], [55, ["OKC","UTA","HOU", "GSW","POR","PHI", "TOR", "MIL", "DEN"]], [54, ["OKC","BOS", "UTA","HOU", "GSW","POR","PHI", "TOR", "DEN"]], [53, ["OKC","IND", "BOS", "UTA","HOU", "GSW","POR","PHI", "TOR", "DEN"]], [52, ["SAS","OKC","IND", "BOS", "UTA","HOU", "GSW","POR","PHI", "TOR", "DEN"]],[51, ["ORL","SAS","OKC","IND", "BOS", "UTA","HOU", "GSW","POR","PHI", "TOR", "DEN"]], [50, ["BRK","LAC","ORL","SAS","OKC","IND", "BOS", "UTA","HOU", "GSW","POR","PHI", "TOR","DET", "DEN"]], [49, ["CHO","BRK","ORL","LAC","SAS","OKC","IND", "BOS","HOU","POR","PHI", "TOR","DET", "DEN"]], [48, ["MIA","BRK","CHO","ORL","SAS","OKC","IND", "BOS","HOU","POR","PHI", "TOR","DET", "DEN","LAC"]], [47, ["MIA","CHO","ORL","SAS","OKC","IND", "BOS","HOU","PHI", "TOR","BRK","DET", "DEN","LAC"]],[46, ["SAC","MIA","CHO","ORL","SAS","OKC","IND","BOS","PHI","TOR","BRK","DET","DEN","LAC"]], [45, ["SAC","MIA","CHO","ORL","SAS","OKC","IND", "BOS","PHI","BRK","DET", "DEN","LAC"]], [44, ["SAC","MIA","CHO","ORL","SAS","OKC","IND", "BOS","PHI","BRK","DET", "DEN","LAC"]], [43, ["SAC","MIA","CHO","ORL","SAS","OKC","IND","PHI","BRK","DET", "DEN","LAC"]], [42, ["MEM","SAC","MIA","CHO","ORL","SAS","IND","PHI","BRK","DET", "DEN","LAC"]], [41, ["MIN","LAL","MEM","SAC","MIA","CHO","ORL","SAS","PHI","BRK","DET", "DEN"]], [40, ["DAL","MIN","LAL","MEM","SAC","MIA","CHO","ORL","BRK","DET"]], [39, ["NOP","MIN","LAL","MEM","SAC","MIA","CHO","ORL","BRK","DET","DAL"]], [38, ["WAS","NOP","MIN","LAL","MEM","SAC","MIA","CHO","ORL","BRK","DET","DAL"]], [37, ["WAS","NOP","MIN","LAL","MEM","SAC","MIA","CHO","ORL","BRK","DET","DAL"]], [36, ["WAS","NOP","MIN","LAL","MEM","SAC","MIA","CHO","ORL","BRK","DET","DAL"]], [35, ["ATL","WAS","NOP","MIN","LAL","MEM","SAC","MIA","CHO","BRK","DET","DAL"]], [34, ["ATL","WAS","NOP","MIN","LAL","MEM","SAC","MIA","CHO","BRK","DAL"]], [33, ["ATL","WAS","NOP","MIN","LAL","MEM","SAC","MIA","CHO","BRK","DAL"]], [32, ["ATL","WAS","NOP","MIN","LAL","MEM","BRK","DAL"]], [31, ["ATL","WAS","NOP","MIN","MEM","BRK","DAL"]], [30, ["CHI","ATL","WAS","NOP","MIN","MEM","BRK","DAL"]], [29, ["CHI","ATL","WAS","NOP","MIN","MEM","DAL"]], [28, ["CHI","ATL","WAS","MIN","MEM","DAL"]], [27, ["CHI","ATL","WAS","MIN","MEM","DAL"]], [26, ["CHI","ATL","MIN","DAL"]], [25, ["CHI","ATL","DAL"]], [24, ["PHO","NYK","CHI","ATL","DAL"]], [23, ["CLE","NYK","CHI","ATL","PHO","DAL"]], [22, ["CLE","NYK","CHI","ATL","PHO"]], [21, ["CLE","NYK","CHI","ATL","PHO"]], [20, ["CLE","NYK","CHI","ATL","PHO"]], [19, ["CLE","NYK","CHI","PHO"]], [18, ["CLE","NYK","CHI","PHO"]], [17, ["CLE","NYK","CHI","PHO"]], [16, ["CLE","NYK","CHI","PHO"]], [16, ["CLE","NYK","CHI","PHO"]], [15, ["CLE","NYK","CHI","PHO"]], [14, ["CLE","NYK","CHI","PHO"]], [13, ["NYK"]]];
    // transform the data into a useful representation
// 1 is inner, 2, is outer

// need: inner, outer, links
//
// inner: 
// links: { inner: outer: }


var outer = d3.map(); 
var inner = [];
var links = [];

var outerId = [0];

data.forEach(function(d){
	
	if (d == null)
		return;
	
	i = { id: 'i' + inner.length, name: d[0], related_links: [] };
	i.related_nodes = [i.id];
	inner.push(i);
	
	if (!Array.isArray(d[1]))
		d[1] = [d[1]];
	
	d[1].forEach(function(d1){
		
		var o = outer.get(d1);
		
		if (o == null)
		{
			o = { name: d1,	id: 'o' + outerId[0], related_links: [] };
			o.related_nodes = [o.id];
			outerId[0] = outerId[0] + 1;	
			
			outer.set(d1, o);
		}
		
		// create the links
		var l = { id: 'l-' + i.id + '-' + o.id, inner: i, outer: o }
		links.push(l);
		
		// and the relationships
		i.related_nodes.push(o.id);
		i.related_links.push(l.id);
		o.related_nodes.push(i.id);
		o.related_links.push(l.id);
	});
});

data = {
	inner: inner,
	outer: outer.values(),
	links: links
}

// sort the data -- TODO: have multiple sort options
outer = data.outer;
data.outer = Array(outer.length);


var i1 = 0;
var i2 = outer.length - 1;

for (var i = 0; i < data.outer.length; ++i)
{
	if (i % 2 == 1)
		data.outer[i2--] = outer[i];
	else
		data.outer[i1++] = outer[i];
}

console.log(data.outer.reduce(function(a,b) { return a + b.related_links.length; }, 0) / data.outer.length);


// from d3 colorbrewer: 
// This product includes color specifications and designs developed by Cynthia Brewer (http://colorbrewer.org/).
var colors = ["#a50026","#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9","#74add1","#4575b4","#313695"]
var color = d3.scaleLinear()
    .domain([13, 66])
    .range([colors.length-1, 0])
    .clamp(true);

// var colors= ["#00471B", "#CE1141","#006BB6", "#007A33", "#FDBB30","#000000","#0077C0","#C8102E","#1D1160","#98002E","#E31837","#FFCD00","#BC032B","#6F263D", "#F58426"]
// var color = d3.scaleOrdinal()
//      .domain(["MIL", "TOR", "PHI", "BOS", "IND", "BRK", "ORL", "DET", "CHO", "MIA", "WAS", "ATL", "CHI", "CLE", "NYK"])
//      .range([ "#00471B", "#CE1141","#006BB6", "#007A33", "#FDBB30","#000000","#0077C0","#C8102E","#1D1160","#98002E","#E31837","#FFCD00","#BC032B","#6F263D", "#F58426"])
    
var diameter = 1120;
var rect_width = 40;
var rect_height = 13;

var link_width = "1px"; 

var il = data.inner.length;
var ol = data.outer.length;

var inner_y = d3.scaleLinear()
    .domain([0, il])
    .range([-(il * rect_height)/2, (il * rect_height)/2]);

var mid = (data.outer.length/2.0)
var outer_x = d3.scaleLinear()
    .domain([0, mid, mid, data.outer.length])
    .range([15, 170, 195 ,355]);

var outer_y = d3.scaleLinear()
    .domain([0, data.outer.length])
    .range([0, diameter / 2 - 120]);


// setup positioning
data.outer = data.outer.map(function(d, i) { 
    d.x = outer_x(i);
    d.y = diameter/3;
    return d;
});

data.inner = data.inner.map(function(d, i) { 
    d.x = -(rect_width / 2);
    d.y = inner_y(i);
    return d;
});


function get_color(name)
{
    var c = Math.round(color(name));
    if (isNaN(c))
        return '#dddddd';	// fallback color
    
    return colors[c];
}

// Can't just use d3.svg.diagonal because one edge is in normal space, the
// other edge is in radial space. Since we can't just ask d3 to do projection
// of a single point, do it ourselves the same way d3 would do it.  


function projectX(x)
{
    return ((x - 90) / 180 * Math.PI) - (Math.PI/2);
}

// var diagonal = d3.linkHorizontal()
//     .source(function(d) { return {"x": d.outer.y * Math.cos(projectX(d.outer.x)), 
//                                   "y": -d.outer.y * Math.sin(projectX(d.outer.x))}; })            
//     .target(function(d) { return {"x": d.inner.y + rect_height/2,
//                                   "y": d.outer.x > 180 ? d.inner.x : d.inner.x + rect_width}; })
//     .projection(function(d) { return [d.y, d.x]; });
  


var svg = d3.select("#wins").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
  .append("g")
    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
    

// links

var link = svg.append('g').attr('class', 'links').selectAll(".link")
    .data(data.links)
  .enter().append('path')
    .attr('class', 'link')
    .attr('id', function(d) { return d.id })
    .attr("d", function(d){
      var y1 = d.outer.y * Math.cos(projectX(d.outer.x)),
          x1 = -d.outer.y * Math.sin(projectX(d.outer.x)),
          y2 = d.inner.y + rect_height/2,
          x2 = d.outer.x > 180 ? d.inner.x : d.inner.x + rect_width;
        return "M" + x1 + "," + y1 + "L" + x2 + "," + y2;
    })
    .attr('stroke', function(d) { return get_color(d.inner.name); })
    .attr('stroke-width', link_width);

// outer nodes

var onode = svg.append('g').selectAll(".outer_node")
    .data(data.outer)
  .enter().append("g")
    .attr("class", "outer_node")
    .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
    .on("mouseover", mouseover)
    .on("mouseout", mouseout);
  
onode.append("circle")
    .attr('id', function(d) { return d.id })
    .attr("r", 4.5);
  
onode.append("circle")
    .attr('r', 20)
    .attr('visibility', 'hidden');
  
onode.append("text")
	.attr('id', function(d) { return d.id + '-txt'; })
    .attr("dy", ".31em")
    .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
    .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
    .text(function(d) { return d.name; })
    .style("font-size", 18)
  
// inner nodes
  
var inode = svg.append('g').selectAll(".inner_node")
    .data(data.inner)
  .enter().append("g")
    .attr("class", "inner_node")
    .attr("transform", function(d, i) { return "translate(" + d.x + "," + d.y + ")"})
    .on("mouseover", mouseover)
    .on("mouseout", mouseout);
  
inode.append('rect')
    .attr('width', rect_width)
    .attr('height', rect_height)
    .attr('id', function(d) { return d.id; })
    .attr('fill', function(d) { return get_color(d.name); });
  
inode.append("text")
	.attr('id', function(d) { return d.id + '-txt'; })
    .attr('text-anchor', 'middle')
    .attr("transform", "translate(" + rect_width/2 + ", " + rect_height * .75 + ")")
    .text(function(d) { return d.name; });

// need to specify x/y/etc

d3.select(window.self.frameElement).style("height", diameter - 150 + "px");

function mouseover(d)
{
	// bring to front
	d3.selectAll('.links .link').sort(function(a, b){ return d.related_links.indexOf(a.id); });	
	
    for (var i = 0; i < d.related_nodes.length; i++)
    {
        d3.select('#' + d.related_nodes[i]).classed('highlight', true);
        d3.select('#' + d.related_nodes[i] + '-txt').attr("font-weight", 'bold');
    }
    
    for (var i = 0; i < d.related_links.length; i++)
        d3.select('#' + d.related_links[i]).attr('stroke-width', '5px');
}

function mouseout(d)
{   	
    for (var i = 0; i < d.related_nodes.length; i++)
    {
        d3.select('#' + d.related_nodes[i]).classed('highlight', false);
        d3.select('#' + d.related_nodes[i] + '-txt').attr("font-weight", 'normal');
    }
    
    for (var i = 0; i < d.related_links.length; i++)
        d3.select('#' + d.related_links[i]).attr('stroke-width', link_width);
}
  }


  componentDidMount() {
      this.CM()
  }


  ////////// R E N D E R //////////

  render() {
    return (
      <div className="windowBox" id="wins"></div>
    )
  }

}
export default Wins;