function mitron(){

let svg = d3.select("#vis").select("svg")

svg.append('g').append('image').attr('class', 'nehruModi')
.attr('xlink:href', 'https://raw.githubusercontent.com/geetkalra/weblab/master/nehruModi.png')
.attr('width', 1000)
.attr('height', 950)
.transition().duration(2000)
.attr('opacity', 1)

}


// https://raw.githubusercontent.com/geetkalra/weblab/master/littleGirl.png