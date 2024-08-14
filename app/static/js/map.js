function createMap(features) {
  
  
  
  
  // STEP 1: Init the Base Layers

  // Define variables for our tile layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Step 2: Create the Overlay layers
  let heatArray = [];

  // for each row, add to heat layer array
  features.forEach(feature => {
    let latitude = feature.latitude;
    let longitude = feature.longitude;
    let intensity = feature["Total Cases"];

    if (latitude && longitude) {
      // Multiply latitude and longitude by intensity for better visualization
      heatArray.push([latitude, longitude, intensity]);
    }
  });
    console.log(heatArray)
  // create layer
  let heatLayer = L.heatLayer(heatArray, {
    radius: 20,
    blur: 35,
    maxZoom: 17,
    max: 1.0 // Adjust this to scale intensity if needed
  });

  // Step 3: BUILD the Layer Controls

  // Only one base layer can be shown at a time.
  let baseLayers = {
    Street: street,
    Topography: topo
  };

  let overlayLayers = {
    Heatmap: heatLayer
  };

  // Step 4: INIT the Map
  let myMap = L.map("map", {
    center: [0, 0],
    zoom: 2,
    layers: [street, heatLayer]
  });

  // Step 5: Add the Layer Control filter + legends as needed
  L.control.layers(baseLayers, overlayLayers).addTo(myMap);
}

function doWork() {
  // URL to the queried data
  let url = `/api/v1.0/get_map`;
    

  d3.json(url).then(function (data) {
    let features = data;
    console.log(features)
    // Check if we have data before creating the map
    if (features.length > 0) {
      createMap(features);
    } else {
      console.log("No data found.");
    }
  })
  // }).catch(error => {
  //   console.error("Error fetching or processing data:", error);
  // });
}

// event listener for CLICK on Button
d3.select("#filter").on("click", doWork);

doWork();
