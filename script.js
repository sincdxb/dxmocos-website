
const images = {
  coffee1: [
    "Coffee/B09LHVL6W1/01.jpg",
    "Coffee/B09LHVL6W1/02.jpg",
    "Coffee/B09LHVL6W1/03.jpg"
  ],
  kitchen1: [
    "Kitchen/B08CKTB6Z4/01.jpg",
    "Kitchen/B08CKTB6Z4/02.jpg",
    "Kitchen/B08CKTB6Z4/03.jpg"
  ],
  home1: [
    "Home/B0G9Z319YP/01.jpg",
    "Home/B0G9Z319YP/02.jpg",
    "Home/B0G9Z319YP/03.jpg"
  ]
};

const indexMap = {
  coffee1:0,
  kitchen1:0,
  home1:0
};

function show(id){
  document.getElementById("img-"+id).src = images[id][indexMap[id]];
}

function next(id){
  indexMap[id] = (indexMap[id]+1)%images[id].length;
  show(id);
}

function prev(id){
  indexMap[id] = (indexMap[id]-1+images[id].length)%images[id].length;
  show(id);
}
