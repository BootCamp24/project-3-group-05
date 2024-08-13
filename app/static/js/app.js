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
      make_sunburst(data.sunburst_data);
      make_table(data.table_data)
    });
  }
  
  function make_table(filtered_data) {
    // select table
    let table = d3.select("#data_table");
    let table_body = table.select("tbody");
    table_body.html(""); // destroy any existing rows
    // Add a table caption with the title

    // create table
    for (let i = 0; i < filtered_data.length; i++){
      // re-init the datatable
      $('#data_table').DataTable().clear().destroy();

      // get data row
      let data_row = filtered_data[i];
      // re-init the datatable
      
      // creates new row in the table
      let row = table_body.append("tr");
      row.append("td").text(data_row.Continent);
      row.append("td").text(data_row.Country || "N/A");
      row.append("td").text(data_row.Population);
      row.append("td").text(data_row["Total Cases"]);
      row.append("td").text(data_row["Active Cases"]);
      row.append("td").text(data_row["Total Deaths"]);
      row.append("td").text(data_row["Total Recovered"]);
      row.append("td").text(data_row["Total Test"]);
    }
    // Create the datatable
    $('#data_table').DataTable();
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
        color: "#B5EFE5"
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
        color: "#5A8B82"
      },
      text: bar_text,
      name: "Total Deaths"
    };
  
    // Create data array
    let data = [trace1, trace2];
  
    // Apply a title to the layout
    let layout = {
      title: "Total Recovered and Death Cases for Top 10 Countries",
      // title: `Covid Analysis for top 10 ${continent}`,
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
  function make_sunburst(filtered_data) {
    // sort values
    // filtered_data.sort((a, b) => (b["Total Cases"] - a["Total Cases"]));
  
    // extract the x & y values for our bar chart

    let label_country = filtered_data.map(x => x.label);
    let parent_continent = filtered_data.map(x => x.parent);
    // if all continets ar
    // let id_continent = filtered_data.map(x => x.Continent);    
    let values_cases = filtered_data.map(x => x["Total Cases"]);
    console.log(label_country);
    console.log("make_sunburst() parent_continent:");
    console.log(parent_continent);
    console.log(values_cases);
     // Assign unique ids for each country or continent
    //let ids = label_country.map((label, index) => `${parent_continent[index]}_${label}`);
    // Trace1 for the Launch Attempts
    
    let trace1 = {
      type: "sunburst",
      labels: label_country,
      // ids : ids,
      parents: parent_continent,
      values: values_cases,
      branchvalues:"total",
      marker: {
        colors: ["#9CF4E4", "#83C9BC", "#619F94", "#358F7F", "#2ECAAE", "#244B7F"]
      }
      
    };
    

  
    // // Create data array
    let data = [trace1];
  
    // Apply a title to the layout
    let layout = {
      title: {
        text: "Covid SunBurst Chart for the World",

        // font: {
        //     size: 16, // Adjust the font size if needed
        //     color: 'black', // Specify the font color if needed
        //     family: 'Arial', // Specify the font family if needed
        //     weight: 'bold' // Make the font bold
        // }
        // colorway: ["#9CF4E4 ", "#83C9BC ", "#619F94", "#358F7F", "#2ECAAE", "#244B7F"]
      },

     

      width : 550,
      height :550
    };
  
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("sunburst_chart", data, layout);
  
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
  //   document.getElementById("showMoreBtn").addEventListener("click", function() {
  //     let tableRows = document.querySelectorAll("#data_table tbody tr");
  //     let visibleRows = 10; // Number of rows to show initially
  
  //     for (let i = 0; i < tableRows.length; i++) {
  //         if (i < visibleRows) {
  //             tableRows[i].style.display = "table-row"; // Show the first set of rows
  //         } else {
  //             tableRows[i].style.display = "none"; // Hide the rest of the rows
  //         }
  //     }
  
  //     visibleRows += 10; // Increment the number of visible rows for the next click
  // });  
  // event listener for CLICK on Button
  d3.select("#filter").on("click", do_work);
  
  // on page load, don't wait for the click to make the graph, use default
  do_work();
  