function do_work() {
    // extract user input
    let min_cases = d3.select("#min_total_cases").property("value");
    min_cases = parseInt(min_cases);
    let continent = d3.select("#continent_filter").property("value");
  
    // We need to make a request to the API
    let url = `/api/v1.0/get_dashboard/${min_cases}/${continent}`;
    d3.json(url).then(function (data) {
  
      // create the graphs
      make_stack(data.stack_data);
    //   make_sunburst(data.sunburst_data);
      make_table(data.table_data)
    });
  }
  
  function make_table(filtered_data) {
    // select table
    let table = d3.select("#data_table");
    let table_body = table.select("tbody");
    table_body.html(""); // destroy any existing rows
  
    // create table
    for (let i = 0; i < filtered_data.length; i++){
      // get data row
      let data_row = filtered_data[i];
  
      // creates new row in the table
      let row = table_body.append("tr");
      row.append("td").text(data_row.Continent);
      row.append("td").text(data_row.Country);
      row.append("td").text(data_row.Population);
      row.append("td").text(data_row["Total Cases"]);
      row.append("td").text(data_row["Active Cases"]);
      row.append("td").text(data_row["Total Deaths"]);
      row.append("td").text(data_row["Total Recovered"]);
      row.append("td").text(data_row["Total Test"]);
    }
  }
  
  function make_stack(filtered_data) {
    // sort values
    // filtered_data.sort((a, b) => (b["Total Cases"] - a["Total Cases"]));
  
    // extract the x & y values for our bar chart
    let bar_x = filtered_data.map(x => x.Country);
    let bar_text = filtered_data.map(x => x.Country);
    let bar_y1 = filtered_data.map(x => x["Total Cases"]);
    let bar_y2 = filtered_data.map(x => x["Total Recovered"]);
  
    // Trace1 for the Launch Attempts
    let trace1 = {
      x: bar_x,
      y: bar_y1,
      type: 'bar',
      marker: {
        color: "skyblue"
      },
      text: bar_text,
      name: "Total Recovered"
    };
  
    // Trace 2 for the Launch Successes
    let trace2 = {
      x: bar_x,
      y: bar_y2,
      type: 'bar',
      marker: {
        color: "firebrick"
      },
      text: bar_text,
      name: "Total Deaths"
    };
  
    // Create data array
    let data = [trace1, trace2];
  
    // Apply a title to the layout
    let layout = {
      title: "Covid Analysis",
      barmode: "group",
      // Include margins in the layout so the x-tick labels display correctly
      margin: {
        l: 150,
        r: 150,
        b: 150,
        t: 50,
        pad: 4
      },
      yaxis: {
        tickformat: ',d' // Display numbers with comma as thousands separator
      }
    };
  
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar_chart", data, layout);
  
  }

    // function make_stack(filtered_data) {
    //         // sort values
    //         // filtered_data.sort((a, b) => (b["Total Cases"] - a["Total Cases"]));
        
    //         // extract the x & y values for our bar chart
    //         let bar_x = filtered_data.map(x => x.Country);
    //         let bar_text = filtered_data.map(x => x.Country);
    //         let bar_y1 = filtered_data.map(x => x["Total Recovered"]);
    //         let bar_y2 = filtered_data.map(x => x["Total Deaths"]);
        
    //         // Trace1 for the Launch Attempts
    //         let trace1 = {
    //         x: bar_x,
    //         y: bar_y1,
    //             name: 'control',
    //             autobinx: true, 
    //             histnorm: "count", 
    //             marker: {
    //                 color: "rgba(255, 100, 102, 0.7)", 
    //                 line: {
    //                 color:  "rgba(255, 100, 102, 1)", 
    //                 width: 1
    //                 }
    //             },  
    //             opacity: 0.5, 
    //             type: "histogram", 
    //             // xbins: {
    //             // end: 10, 
    //             // size: 0.06, 
    //             // start: 0
    //             // }
    //         };
        
    //         // Trace 2 for the Launch Successes
    //         let trace2 = {
    //         x: bar_x,
    //         y: bar_y2,
    //             autobinx: true, 
    //             marker: {
    //                     color: "rgba(100, 200, 102, 0.7)",
    //                     line: {
    //                     color:  "rgba(100, 200, 102, 1)", 
    //                     width: 1
    //             } 
    //                 }, 
    //             name: "experimental", 
    //             opacity: 0.25, 
    //             type: "histogram", 
    //             // xbins: { 
    //             // end: 10, 
    //             // size: 0.06, 
    //             // start: 0
            
    //             // }
    //         };
        
    //         // Create data array
    //         let data = [trace1, trace2];
        
    //         // Apply a title to the layout
    //         let layout = {
    //             bargap: 0.05, 
    //             bargroupgap: 0.2, 
    //             barmode: "overlay", 
    //             title: "Sampled Results", 
    //             xaxis: {title: "Value"}, 
    //             yaxis: {title: "Count"}
    //           };
        
    //         // Render the plot to the div tag with id "plot"
    //         Plotly.newPlot("bar_chart", data, layout);
        
    //     }  
    //  function make_stack(filtered_data) {
    //         // sort values
    //         // filtered_data.sort((a, b) => (b["Total Cases"] - a["Total Cases"]));
        
    //         // extract the x & y values for our bar chart
    //         let bar_x = filtered_data.map(x => x.Country);
    //         let bar_text = filtered_data.map(x => x.Country);
    //         let bar_y1 = filtered_data.map(x => x["Total Recovered"]);
    //         let bar_y2 = filtered_data.map(x => x["Total Deaths"]);
        
    //         // Trace1 for the Launch Attempts
    //         let trace1 = {
    //         x: bar_x,
    //         y: bar_y1,

    //             // marker: {
    //             //     color: "rgba(255, 100, 102, 0.7)", 
    //             //     line: {
    //             //     color:  "rgba(255, 100, 102, 1)", 
    //             //     width: 1
    //             //     }
    //             // },  

    //             type: "histogram", 
    //             // xbins: {
    //             // end: 10, 
    //             // size: 0.06, 
    //             // start: 0
    //             // }
    //         };
        
    //         // Trace 2 for the Launch Successes
    //         let trace2 = {
    //         x: bar_x,
    //         y: bar_y2,
    //             // autobinx: true, 
    //             // marker: {
    //             //         color: "rgba(100, 200, 102, 0.7)",
    //             //         line: {
    //             //         color:  "rgba(100, 200, 102, 1)", 
    //             //         width: 1
    //             // } 
    //                 // }, 
    //             name: "experimental", 
    //             // opacity: 0.25, 
    //             type: "histogram", 
    //             // xbins: { 
    //             // end: 10, 
    //             // size: 0.06, 
    //             // start: 0
            
    //             // }
    //         };
        
    //         // Create data array
    //         let data = [trace1, trace2];
        
    //         // Apply a title to the layout
    //         let layout = {barmode: "stack"};
        
    //         // Render the plot to the div tag with id "plot"
    //         Plotly.newPlot("bar_chart", data, layout);
        
    //     }   
  // event listener for CLICK on Button
  d3.select("#filter").on("click", do_work);
  
  // on page load, don't wait for the click to make the graph, use default
  do_work();
  