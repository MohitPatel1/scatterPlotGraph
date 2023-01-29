const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json'

const getData = async (url) => {
    const dataPromise = await fetch(url);
    const dataSet = await dataPromise.json();
    // dataSet is single array of objects
    plottGraph(dataSet)
    
}

getData(url);

const plottGraph = (dataSet) => {
    let width = 0.9 * window.innerWidth;
    let height = 0.8 * window.innerHeight;
    let padding = 40;
    console.log(dataSet)
    
    dataSet.forEach(d => {
        const min_sec = d.Time.split(":")
        d.Time = new Date(1970,1,1,1,min_sec[0],min_sec[1])
    });
    
    const minX = d3.min(dataSet, (d) => d.Year - 1)
    const maxX = d3.max(dataSet, (d) => d.Year + 1)
    const minY = d3.min(dataSet, (d) => d.Time)
    const maxY = d3.max(dataSet, (d) => d.Time)

    
    let xScale = d3.scaleLinear().range([0,width]).domain([minX,maxX])
    let yScale = d3.scaleTime().range([0, height]).domain([minY,maxY])
    

    var xAxis = d3.axisBottom(xScale);

    var yAxis = d3.axisLeft(yScale);
    
    console.log(typeof(d3.format('d')))
    console.log(minY)
    const graph = d3.select('#graph')
    .attr('height',height)
    .attr('width',width)
    .attr('transform','translate(30,30)')

    graph.selectAll('.dot')
    .data(dataSet)
    .enter()
    .append('circle')
    .attr('class','dot')
    .attr('r',6)
    .attr('cx',d=>xScale(d.Year))
    .attr('cy',d=>yScale(d.Time))
    // .attr('d',d=>console.log(d))
    .attr('fill','green')
    

}

// const color = d3.scaleOrdinal(d3.schemeCatagory10); not working in minified version