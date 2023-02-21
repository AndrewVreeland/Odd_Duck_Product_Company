//*********** */ GLOBAL *************

const productArray = [];
let votingRounds = 25;
const imageContainer = document.getElementById('imageContainer');


// ************** DOM WINDOWS ******************
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const resultsBtn1 = document.getElementById('resultsBtn1');
const list = document.getElementById('list');

// ************* HELPER FUNCTIONS ***********
function randomIndex() {
  return Math.floor(Math.random() * productArray.length);
}


function handleImgClick(event) {
  // identify image was clicked
  const imgClicked = event.target.title;
  console.dir(imgClicked);
  // increase number of clicks
  for (let i = 0; i < productArray.length; i++){
    if (imgClicked === productArray[i].name){
      productArray[i].votes++;
      console.log(productArray[i].votes);
    }
  }
  votingRounds--;
  renderImg();
  if (votingRounds === 0){
    imageContainer.removeEventListener('click', handleImgClick);
    document.getElementById('resultsBtn1').style = 'visibility: visible';
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
  image1.alt = `this is our ${imgThreeIndex} product.`;
  image2.src = productArray[imgTwoIndex].image;
  image2.title = productArray[imgTwoIndex].name;
  image1.alt = `this is our ${imgThreeIndex} product.`;
  image3.src = productArray[imgThreeIndex].image;
  image3.title = productArray[imgThreeIndex].name;
  image1.alt = `this is our ${imgThreeIndex} product`;

  // increase the views
  productArray[imgOneIndex].views++;
  productArray[imgTwoIndex].views++;
  productArray[imgThreeIndex].views++;
}

function handleResultsViewing(){
  console.log('hello');
  for (let i = 0; i < productArray.length; i++){
    let productListItem = document.createElement('li');
    productListItem.textContent = `The ${productArray[i].name} has ${productArray[i].views} Views, & votes: ${productArray[i].votes}`;
    list.appendChild(productListItem);
  }
  resultsBtn1.removeEventListener('click', handleResultsViewing);
}

// ************** Constructor Functions ***************

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.image = `images/${name}.${fileExtension}`;
  this.votes = 0;
  this.views = 0;
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
const wireframe = new Product('wireframe');
const pen = new Product('pen');
const petSweep = new Product('petSweep');

productArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass, petSweep, pen, wireframe);


imageContainer.addEventListener('click', handleImgClick);
renderImg();
resultsBtn1.addEventListener('click', handleResultsViewing);
