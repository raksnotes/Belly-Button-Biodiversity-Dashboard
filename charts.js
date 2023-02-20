function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
  
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  // Initialize the dashboard
  init();
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildMetadata(newSample);
    buildCharts(newSample);
    
  }
  
  // Demographics Panel 
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      // Filter the data for the object with the desired sample number
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
     
      // Use d3 to select the panel with id of `#sample-metadata`
      var PANEL = d3.select("#sample-metadata");
  
      // Use `.html("") to clear any existing metadata
      PANEL.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
  
    });
  }
  
  // Deliverable 1: 1. Create the buildChart function.
  function buildCharts(sample) {
    // Deliverable 1: 2. Use d3.json to load the samples.json file 
    d3.json("samples.json").then((data) => {
      console.log(data);
  
      // Deliverable 1: 3. Create a variable that holds the samples array. 
      var samples = data.samples; 
      console.log(samples);
      
      // Deliverable 1: 4. Create a variable that filters the samples for the object with the desired sample number.
      // in ref to line 38 creating the resultArray variable 
      var filters_samples = samples.filter(data => data.id == sample);
      console.log(filters_samples);
      // Deliverable 3: 1. Create a variable that filters the metadata array for the object with the desired sample number.
      // in ref to line 38 creating the resultArray variable 
      // in ref to Mod 13.4.3
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample); 
      console.log(resultArray);
      // Deliverable 1: 5. Create a variable that holds the first sample in the array.
      // fs = first sample 
      // index for the first sample in an array is 0
      var first = filters_samples[0];
      console.log(first);
      // Deliverable 3: 2. Create a variable that holds the first sample in the metadata array.
      // index for the first sample in an array is 0 
      // in ref to Mod 13.4.3
      var result = resultArray[0];
      console.log(result); 
   
      // Deliverable 1: 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
      // the variables in Step 6 are found in the samples array in samples.json 
      // fs is the variable for the first sample in the array from step 5 in D1
      var otu_id = first.otu_ids; 
      console.log(otu_id);
      var otu_label = first.otu_labels; 
      console.log(otu_label); 
      var sample_value = first.sample_values;
      console.log(sample_value); 
      // Deliverable 3: 3. Create a variable that holds the washing frequency.
      // ref D1: Step 3
      // used result because 'wfreq' is in metadata array in samples.json
      var washing_freq = result.washing_freq;
      console.log(washing_freq);
      // Deliverable 1: 7. Create the yticks for the bar chart.
      // Hint: Get the the top 10 otu_ids and map them in descending order 
      // so the otu_ids with the most bacteria are last. 
      // 0 is start #, 10 is end #: slice(0,10)
      // in ref to: https://www.w3schools.com/jsref/jsref_slice_string.asp
      // used hint: Chain the slice() method with the map() and reverse() functions 
      // to retrieve the top 10 otu_ids sorted in descending order. 
      var yticks = otu_id.slice(0,10).map(id => 'OTU' + id).reverse();
        console.log(yticks); 
      // Deliverable 1: 8. Create the trace for the bar chart. 
      // In Step 8, create the trace object for the bar chart, where the x values are the sample_values 
      // and the hover text for the bars are the otu_labels in descending order.
      // in ref to: https://plotly.com/javascript/hover-text-and-formatting/
      var barData = {
        x: sample_value.slice(0,10).reverse(),
        type: "bar",
        hoverinfo: otu_label.slice(0,10).reverse(),
        y: yticks,
        orientation: "h",
        
      };
      var data1 = [barData];
  
      // Deliverable 1: 9. Create the layout for the bar chart. 
      var barLayout = {
       
          title: "Top 10 Bacteria Cultures Found",
       
      
      };
  
      // Deliverable 1: 10. Use Plotly to plot the data with the layout. 
      // in ref to Mod 13.1.3
      Plotly.newPlot("bar-plot", data1, barLayout);
      // Deliverable 2: 1. Create the trace for the bubble chart.
      // in ref to: https://plotly.com/javascript/bubble-charts/
      var bubbleData = {
        x: otu_id,
        y: sample_value,
        mode: 'markers',
        hoverinfo: otu_label,
        marker: { 
          color: otu_id,
          size: sample_value
        },
        type: "bubble",
        
        
      };
      var data2 = [bubbleData];
      // Deliverable 2: 2. Create the layout for the bubble chart.
      var bubbleLayout = {
        title: "Bacteria Cultures Per Sample"
      }
      // Deliverable 2: 3. Use Plotly to plot the data with the layout.
      // in ref to: https://plotly.com/javascript/bubble-charts/
      Plotly.newPlot('myDiv', data2, layout);
      // Deliverable 3: 4. Create the trace for the gauge chart.
      var guageData = {
        value: washing_freq, 
        type: "indicator", 
        mode: "guage+number"
      }
      // Deliverable 3: 5. Create the layout for the gauge chart.
   
      // Deliverable 3: 6. Use Plotly to plot the gauge data and layout.
      
    });
  }