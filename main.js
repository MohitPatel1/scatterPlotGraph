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

    let xScale = d3.scaleLinear().range([0,width]) 
    let yScale = d3.scaleLinear().range([0,height])

    // const color = d3.scaleOrdinal(d3.schemeCatagory10); not working in minified version


    dataSet.forEach(d => {
        // console.log(d)
        const min_sec = d.Time.split(":")
        d.Time = new Date(1970,1,1,1,min_sec[0],min_sec[1])
    });

    console.log(dataSet)
    // // x axis domain
    // const minX = d3.min(dataSet, (d) => d.Year - 1)
    // const maxX = d3.max(dataSet, (d) => d.Year + 1)

    // console.log(minX ,maxX)

    // y axis domain
    // const minY = 
}