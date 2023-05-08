let positionX = 0;
let index = 0;

let sliderMain = document.querySelector(".slider-main");
let sliderItems = document.querySelectorAll(".slider-item");
let sliderItemsWidth = sliderItems[0].offsetWidth;
let sliderLength = sliderItems.length;

// Reset Variable On Resize
const body = document.getElementsByTagName("body")[0];
body.onresize = function () {
  positionX = 0;
  index = 0;

  sliderMain = document.querySelector(".slider-main");
  sliderItems = document.querySelectorAll(".slider-item");
  sliderItemsWidth = sliderItems[0].offsetWidth;
  sliderLength = sliderItems.length;

  sliderMain.style = `transform: translateX(${positionX}px)`;
};

// Next Button (Slider)
const nextBtn = document.querySelector(".slider-next");
nextBtn.addEventListener("click", function () {
  handleChange(1);
});

//Prev Button (Slider)
const prevBtn = document.querySelector(".slider-prev");
prevBtn.addEventListener("click", function () {
  handleChange(-1);
});

// Change Direction Function
function handleChange(dir) {
  // Next
  if (dir === 1) {
    index++;
    if (index >= sliderLength) {
      index = sliderLength - 1;
      return;
    }
    positionX = positionX - sliderItemsWidth;
    sliderMain.style = `transform: translateX(${positionX}px)`;
  }
  // Prev
  else if (dir === -1) {
    index--;
    if (index < 0) {
      index = 0;
      return;
    }
    positionX = positionX + sliderItemsWidth;
    sliderMain.style = `transform: translateX(${positionX}px)`;
  }
}

// POP UP
const popUp = document.querySelector(".pop-up");
const buyBtn = document.getElementById("buy-btn");
const popBtn = document.getElementById("pop-btn");
const mainContent = document.getElementById("main-content");

buyBtn.addEventListener("click", function () {
  popUp.classList.remove("hidden");
  mainContent.style = "opacity: 0.2";
});
popBtn.addEventListener("click", function () {
  popUp.classList.add("hidden");
  mainContent.style = "opacity: 1";
});
