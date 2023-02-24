//*********** */ GLOBAL *************

let productArray = [];
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
  let productNames = [];
  let productVotes = [];
  let productViews = [];

  for (let i = 0; i < productArray.length; i++) {
    productNames.push(productArray[i].name);
    productVotes.push(productArray[i].votes);
    productViews.push(productArray[i].views);
  }

  let ChartObj = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [
        {
          label: '# of Votes',
          data: productVotes,
          borderWidth: 1
        },
        {
          label: '# of Views',
          data: productViews,
          borderWidth: 1
        },
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  new Chart(ctx, ChartObj);
}
// ********* EVENT HANDLERS ******************



function handleImgClick(event) {
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
    document.getElementById('resultsBtn1').remove();

    // LOCAL STORAGE STARTS HERE
    //! STEP 1 CONVERT DATA INTO A STRING TO STORE IN LOCAL STORAGE
    let stringifiedProduct = JSON.stringify(productArray);

    //! STEP 2
    localStorage.setItem('myProducts', stringifiedProduct);
  }

}

// compares the images so no identical images are rendered.

// *************** HELPER FUNCTION / UTILITIES *********************


const indexArray = [];

function renderImg() {

  while (indexArray.length < 6) {
    let randomNum = randomIndex();
    if (!indexArray.includes(randomNum)) {
      indexArray.unshift(randomNum);
    }
  }
  console.log(indexArray);

  let imgOneIndex = indexArray.pop();
  let imgTwoIndex = indexArray.pop();
  let imgThreeIndex = indexArray.pop();
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

// *************** LOCALS STORAGE CONTINUES *************


//! STEP 3 GET INFO FROM LOCAL STORAGE

let retreivedProducts = localStorage.getItem('myProducts');

//! STEP 4 CONVERT BACK TO USEABLE CODE

let parsedProducts = JSON.parse(retreivedProducts);
console.log(parsedProducts);



// if(retreivedProducts){
//   for(let i = 0; i < parsedProducts; i++){
// if (parsedProducts[i].name === 'sweep'){
//   let reconstructedSweep = new Product (parsedProducts[i])
// }
// }
// }

if (retreivedProducts) {
  productArray = parsedProducts;

} else {
  let bag = new Product('bag');
  let banana = new Product('banana');
  let bathroom = new Product('bathroom');
  let boots = new Product('boots');
  let breakfast = new Product('breakfast');
  let bubblegum = new Product('bubblegum');
  let chair = new Product('chair');
  let cthulhu = new Product('cthulhu');
  let dogDuck = new Product('dogDuck');
  let dragon = new Product('dragon');
  let scissors = new Product('scissors');
  let shark = new Product('shark');
  let sweep = new Product('sweep', 'png');
  let tauntaun = new Product('tauntaun');
  let unicorn = new Product('unicorn');
  let waterCan = new Product('waterCan');
  let wineGlass = new Product('wineGlass');
  let pen = new Product('pen');
  let petSweep = new Product('petSweep');
  productArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass, petSweep, pen);
}

renderImg();

imageContainer.addEventListener('click', handleImgClick);

resultsBtn1.addEventListener('click', handleResultsViewing);
