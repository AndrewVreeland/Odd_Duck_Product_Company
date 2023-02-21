//*********** */ GLOBAL *************

const productArray = [];
let votingRounds = 25;


// ************** DOM WINDOWS ******************
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const imageContainer = document.getElementById('imageContainer');
const resultsBtn1 = document.getElementById('resultsBtn1');

// **************** CANVAS ELEMENT FOR CHART ************

let ctx = document.getElementById('myChart');

// ************** Constructor Functions ***************

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.image = `images/${name}.${fileExtension}`;
  this.votes = 0;
  this.views = 0;
}
// ************* HELPER FUNCTIONS ***********
function randomIndex() {
  return Math.floor(Math.random() * productArray.length);
}

// ************ HELPER FUNCTION TO RENDER CHART

function renderChart() {
  let ChartObj = {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  new ChartObj(ctx, ChartObj);
}
// ********* EVENT HANDLERS ******************



function handleImgClick(event) {
  console.log('hello');
  // identify image was clicked
  const imgClicked = event.target.title;
  console.dir(imgClicked);
  // increase number of clicks
  for (let i = 0; i < productArray.length; i++) {
    if (imgClicked === productArray[i].name) {
      productArray[i].votes++;
      console.log(productArray[i].votes);
      votingRounds--;
      renderImg();
    }
  }
  if (votingRounds === 0) {
    imageContainer.removeEventListener('click', handleImgClick);
  }
}

function handleResultsViewing() {
  if (votingRounds === 0) {
    renderChart();
    resultsBtn1.removeEventListener('click', handleResultsViewing);
  }

}

// compares the images so no identical images are rendered.
function renderImg() {
  let imgOneIndex = randomIndex();
  let imgTwoIndex = randomIndex();
  let imgThreeIndex = randomIndex();
  while (imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex || imgThreeIndex === imgTwoIndex) {
    imgTwoIndex = randomIndex();
    imgThreeIndex = randomIndex();
  }
  image1.src = productArray[imgOneIndex].image;
  image1.title = productArray[imgOneIndex].name;
  image1.alt = `this is our ${imgThreeIndex}.name product.`;

  image2.src = productArray[imgTwoIndex].image;
  image2.title = productArray[imgTwoIndex].name;
  image2.alt = `this is our ${imgThreeIndex}.name product.`;

  image3.src = productArray[imgThreeIndex].image;
  image3.title = productArray[imgThreeIndex].name;
  image3.alt = `this is our ${imgThreeIndex}.name product`;

  // increase the views
  productArray[imgOneIndex].views++;
  productArray[imgTwoIndex].views++;
  productArray[imgThreeIndex].views++;
}



// ***************** Executable Code *****************
const bag = new Product('bag');
const banana = new Product('banana');
const bathroom = new Product('bathroom');
const boots = new Product('boots');
const breakfast = new Product('breakfast');
const bubblegum = new Product('bubblegum');
const chair = new Product('chair');
const cthulhu = new Product('cthulhu');
const dogDuck = new Product('dogDuck');
const dragon = new Product('dragon');
const scissors = new Product('scissors');
const shark = new Product('shark');
const sweep = new Product('sweep', 'png');
const tauntaun = new Product('tauntaun');
const unicorn = new Product('unicorn');
const waterCan = new Product('waterCan');
const wineGlass = new Product('wineGlass');
const pen = new Product('pen');
const petSweep = new Product('petSweep');

productArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass, petSweep, pen);

renderImg();

imageContainer.addEventListener('click', handleImgClick);

resultsBtn1.addEventListener('click', handleResultsViewing);
