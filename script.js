const images = [
  "Coffee/B0DW7BXKRH/01-main.jpg",
  "Coffee/B0DW7BXKRH/02.jpg",
  "Coffee/B0DW7BXKRH/03.jpg"
];

let index = 0;

function showImg() {
  const img = document.getElementById("productImage");
  if (!img) return;
  img.src = images[index];
}

function nextImg() {
  index = (index + 1) % images.length;
  showImg();
}

function prevImg() {
  index = (index - 1 + images.length) % images.length;
  showImg();
}
