var canvasWidth = 900;
var canvasHeight = (canvasWidth/3) * 2;
var margin = 100;
var fontSize = 14;
var textColor = 0;
var yLabel = "Graduates";
var xLabel = "Race or Ethnicity";
var yTicks = 6;
var yNumTicks;
var xTicks;
var tickLength = 20;
var xStart = 2;
var xTickLabels = [];
var yTickLabels = [];
var barWidth = margin;
var mappedHeights = [];
var useData;
var maxValue;
var yMax;
var yRange = [];
var percentageMax;
var gradPercentages = [];
var gradPercentages2 = [];


// function chart() {
//load data
function preload() {
	data = loadJSON("data.json");
}

//create canvas rules
function setup() {
	//start here for responsive design
	// createCanvas(windowWidth, (windowWidth/3) * 2);
	// margin = windowWidth/10;
	createCanvas(canvasWidth, canvasHeight);
	$('canvas').appendTo('.container');
	background(255);
	noLoop();
	noStroke();
	//drawingContext.font = 'italic small-caps bold 12px arial';
	//https://github.com/processing/p5.js/issues/394
	//useData = data[0].AllFields[0].Recipients;
  	useData = data[3].ComputerScience[0].Recipients;
	xTicks = (useData.length) - (xStart + 1);
}

//draw
function draw() {
  drawChart();
  drawData();
}


/*** MAIN FUNCTIONS ***/
//create base chart
function drawChart() {
  stroke(0);
  yAxis();
  xAxis();
}
//draw data
function drawData() {

}



/*** SUB FUNCTIONS ***/
//bar graph
function drawBarGraph() {
  var mapped;
  for(i = 0; i < gradPercentages.length; i++) {
    console.log(gradPercentages);
    console.log(yRange);
    //I'm not yet sure why I have to have the second start value as 0
    // mapped = map(yTickLabels[i], 0, yRange[0], margin, height - margin * 2);
    /*** TEMP TEST ***/
    mapped = map(gradPercentages[i], 0, yRange[0], 0, height - margin * 2);
    console.log(mapped);
    mappedHeights.push(mapped);
  }
}
function barGraph(xPos, yPos, h) {
  rect(xPos, yPos, barWidth, h);
}
//draw y-axis
function yAxis() {
  axis = line(margin, margin, margin, height - margin);
  drawText(yLabel, margin/2, margin - 25, fontSize, BOLD);
}
//draw x-axis
function xAxis() {
  axis = line(margin, height - margin, width - margin/2, height - margin);
  drawText(xLabel, width / 2, height - 25, fontSize, BOLD);
  getTickLabels();
  drawXTicks();
  drawYTicks();
}
//add text to axes
function drawText(label, xPos, yPos, txtSize, txtWeight) {
  textAlign(CENTER);
  textFont("Arial");
  textSize(txtSize);
  textStyle(txtWeight);
  fill(textColor);
  strokeWeight(0);
  text(label, xPos, yPos);
  //The stroke weight needed for the lines is making the text too thick.
  //I should probably fix this via CSS instead
  strokeWeight(1);
}
//draw ticks for y-axis
function drawYTicks() {
  var tickSpread
  for( i = 0; i < yTicks; i++) {
    console.log(yTicks);
    tickSpread = margin + ((height - margin * 2)/yTicks) * i;
    console.log(tickSpread);
    line(margin - tickLength, tickSpread, margin, tickSpread);
    drawText(yRange[i], margin - margin/2, tickSpread + 3, 10, NORMAL);
  }
}
//draw ticks for x-axis
function drawXTicks() {
  drawBarGraph();
  var tickSpread
  for( i = 0; i < xTicks; i++) {
    tickSpread = margin * 1.6 + ((width - margin * 1.5)/xTicks)*i;
    line(tickSpread, height - margin, tickSpread, height - margin + 20); 
    drawText(xTickLabels[i], tickSpread, 540, 10, NORMAL);
    barGraph(tickSpread - margin/2, height - margin - mappedHeights[i], mappedHeights[i]);
  }
}
//label ticks
function getTickLabels() {
  for(i = 0; i < xTicks; i++) {
    xValue = useData[i + xStart].race;
    yValue = useData[i + xStart].graduates;
    console.log(yValue);
    yValue = parseInt(yValue.replace(/,/g, ""), 10);
    xTickLabels.push(xValue);
    yTickLabels.push(yValue);
  }
  numToPercent();
  findMax(gradPercentages);
  yMax = roundUp(maxValue, 10);
  console.log(yMax);
  
  makeRange(yMax, 10, yRange);
  console.log(yRange);
  yRange.reverse();
  console.log(yRange);
  yNumTicks = yRange.length;
  console.log(yNumTicks);
}
//take y Values and convert to a percentage
function numToPercent() {
  var allGrads = useData[1].graduates;
  var percentage;
  allGrads = parseInt(allGrads.replace(/,/g, ""), 10);
  for( i = 0; i < xTicks; i++) {
    percentage = (yTickLabels[i]/allGrads) * 100;
    gradPercentages.push(percentage);
    gradPercentages2.push(percentage);
  }
  percentageMax = roundUp(gradPercentages[0], 10);
  console.log(gradPercentages);
  console.log(gradPercentages2);
  // console.log(percentageMax);
}

/*** BASIC SUPPORT FUNCTIONS ***/
//find the max value in an array
function findMax(array) {
  maxValue = Math.max.apply(null, array);
  console.log(maxValue);
}
//round a value up
function roundUp(unrounded, decimalPlace) {
  var rounded = Math.ceil(unrounded/decimalPlace) * decimalPlace;
  return rounded;
}
//create an array by looping to make a range of values
function makeRange(rangeMax, rangeDecimalPlace, rangeArray) {
  for(i=0; i <= rangeMax; i+=rangeDecimalPlace ) {
    rangeArray.push(i);
  }
}

