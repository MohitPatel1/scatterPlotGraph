const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json'

const getData = async (url) => {
    const dataPromise = await fetch(url);
    const dataSet = await dataPromise.json();
    // dataSet is single array of objects
    plottGraph(dataSet)
    
}

getData(url);

const plottGraph = (dataSet) => {
    let width = 0.7 * window.innerWidth;
    let height = 0.6 * window.innerHeight;
    let padding = 30;
    console.log(dataSet)
    
    dataSet.forEach(d => {
        const min_sec = d.Time.split(":")
        d.Time = new Date(1970,1,1,1,min_sec[0],min_sec[1])
    });
    
    const minX = d3.min(dataSet, (d) => d.Year - 1)
    const maxX = d3.max(dataSet, (d) => d.Year + 1)
    const minY = d3.min(dataSet, (d) => d.Time)
    const maxY = d3.max(dataSet, (d) => d.Time)

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    const graph = d3.select('#graph')
    .append("svg")
    .attr('height',height)
    .attr('width',width)
    .attr('transform','translate(50,50)')
    
    let xScale = d3.scaleLinear().range([padding,width-padding]).domain([minX,maxX])
    let yScale = d3.scaleTime().range([padding, height-padding]).domain([minY,maxY])
    
    const timeFormat = d3.timeFormat("%M:%S")
    var xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));

    var yAxis = d3.axisLeft(yScale).tickFormat(timeFormat)
    
    graph.append("g")
    .attr("transform",`translate(0,${height-padding})`)
    // .attr("transform",'translate(0,0)')
    .call(xAxis)
    .attr("id","x-axis")

    graph.append("g")
    .attr("transform",`translate(${padding},0)`)
    .call(yAxis)
    .attr("id","y-axis")

    graph.selectAll('.dot')
    .data(dataSet)
    .enter()
    .append('circle')
    .attr('class','dot')
    .attr('r',6)
    .attr('cx',d=>xScale(d.Year))
    .attr('cy',d=>yScale(d.Time))
    // .attr('d',d=>console.log(d))
    .attr('fill',d=>`${color(d.Doping==='')}`)

    

}
