const dscc = require('@google/dscc');
const d3 = require('d3');

const drawViz = (data) => {
  // Clear any existing content
  d3.select('body').html('');

  // Extract data
  const totalPopulation = data.tables.DEFAULT[0].TotalPopulation;
  const executedPopulation = data.tables.DEFAULT[0].ExecutedPopulation;

  // Calculate the execution percentage
  const executionPercentage = executedPopulation / totalPopulation;

  // Extract threshold values from the style settings
  const redThreshold = dscc.getSettings().style.redThreshold;
  const yellowThreshold = dscc.getSettings().style.yellowThreshold;
  const greenThreshold = dscc.getSettings().style.greenThreshold;

  // Determine the status color based on thresholds
  let statusColor;
  if (executionPercentage <= redThreshold) {
    statusColor = 'red';
  } else if (executionPercentage <= yellowThreshold) {
    statusColor = 'yellow';
  } else {
    statusColor = 'green';
  }

  // Create a container for the stoplight
  const container = d3.select('body').append('div').attr('class', 'stoplight-container');

  // Create the stoplight
  container.append('div')
    .attr('class', 'stoplight')
    .style('background-color', statusColor)
    .style('width', '100px')
    .style('height', '100px')
    .style('border-radius', '50%');
};

dscc.subscribeToData(drawViz, {transform: dscc.objectTransform});
