import { frame_data } from "./frame_data.js";

//Change Tab (Profile or Matting)
let nav = document.querySelectorAll(".slider-tab");
nav.forEach((item) => {
  item.addEventListener("click", function (event) {
    if (event.target.classList.contains("nav")) {
      let lastActive = item.querySelector(".nav.active");
      let newActive = event.target;

      lastActive.classList.remove("active");
      newActive.classList.add("active");

      let lastContentActive = item.querySelector(".tab.active");
      let newContentActive = document.getElementById(newActive.dataset.target);

      lastContentActive.classList.remove("active");
      newContentActive.classList.add("active");
    }
  });
});

// FRAME

//Render Frame Data
const container = document.getElementById("item-tab");

frame_data().forEach((item) => {
  if (item.id !== 1) {
    const image = document.createElement("img");
    image.setAttribute("src", item.src);
    image.setAttribute(
      "class",
      "w-11 h-11 border-[1px] border-slate-300 rounded-[2px] p-1 cursor-pointer duration-200 item"
    );
    image.setAttribute("alt", item.name);
    image.setAttribute("id", item.id);

    container.appendChild(image);
  }
});

//Change Frame Style
let itemTab = document.querySelectorAll(".item-tab");
const frameName = document.getElementById("frame-name");
const leftImg = document.getElementById("left-img");
const centerImg = document.getElementById("center-img");
const rightImg = document.getElementById("right-img");
const borderFrame = document.getElementById("border-frame");
const framePrev = document.querySelector(".frame-prev");
const frameNext = document.querySelector(".frame-next");
const sideFrame = document.getElementById("side-frame");

frameNext.addEventListener("click", function () {
  handleFrameSlider(1);
});

framePrev.addEventListener("click", function () {
  handleFrameSlider(-1);
});

function changeFrameInfo(newActiveID) {
  frame_data().forEach((item) => {
    if (item.id === newActiveID) {
      frameName.innerHTML = item.name;
      borderFrame.style = `
        border-image-source: url(${item.frame});
        border-image-slice: 85;
        border-image-repeat: stretch;
        `;
      sideFrame.style = `
        transform: rotateY(-90deg);
        background-image: url("${item.sideFrame}")
        `;
      leftImg.setAttribute("src", item.corner.left);
      centerImg.setAttribute("src", item.corner.center);
      rightImg.setAttribute("src", item.corner.right);
    }
  });
}

function handleFrameSlider(dir) {
  if (dir === 1) {
    itemTab.forEach((item) => {
      let allItem = item.querySelectorAll(".item");
      let lastActive = item.querySelector(".item.active");
      let newActiveId = parseInt(lastActive.id) + 1;

      if (newActiveId > frame_data().length) {
        newActiveId = frame_data().length;
        return;
      }

      lastActive.classList.remove("active");

      allItem.forEach((item) => {
        if (newActiveId.toString() === item.id) {
          item.classList.add("active");

          changeFrameInfo(newActiveId);
        }
      });
    });
  } else if (dir === -1) {
    itemTab.forEach((item) => {
      let allItem = item.querySelectorAll(".item");
      let lastActive = item.querySelector(".item.active");
      let newActiveId = parseInt(lastActive.id) - 1;

      if (newActiveId <= 0) {
        newActiveId = 1;
        return;
      }

      lastActive.classList.remove("active");

      allItem.forEach((item) => {
        if (newActiveId.toString() === item.id) {
          item.classList.add("active");

          changeFrameInfo(newActiveId);
        }
      });
    });
  }
}

itemTab.forEach((item) => {
  item.addEventListener("click", function (event) {
    if (event.target.classList.contains("item")) {
      let lastActive = item.querySelector(".item.active");
      let newActive = event.target;

      lastActive.classList.remove("active");
      newActive.classList.add("active");

      changeFrameInfo(newActive.id);

      //Change Name, Image bottom
      frame_data().forEach((item) => {
        if (item.id.toString() === newActive.id) {
          frameName.innerHTML = item.name;
          borderFrame.style = `
            border-image-source: url(${item.frame});
            border-image-slice: 85;
            border-image-repeat: stretch;
            `;
          sideFrame.style = `
          transform: rotateY(-90deg);
          background-image: url("${item.sideFrame}")
            `;

          leftImg.setAttribute("src", item.corner.left);
          centerImg.setAttribute("src", item.corner.center);
          rightImg.setAttribute("src", item.corner.right);
        }
      });
    }
  });
});

// Pop Up
const notif = document.querySelector(".notification");
const buyBtn = document.getElementById("buy-btn");
const popBtn = document.getElementById("pop-btn");
const mainContent = document.getElementById("main-content");

function buttonPopUpClick(btn, event, element) {
  btn.addEventListener("click", function () {
    popUpChange(event, element);
  });
}

buttonPopUpClick(buyBtn, 1, notif);
buttonPopUpClick(popBtn, -1, notif);

// Frame Zoom, Slider
const frameZoom = document.querySelector(".frame-zoom");
const frameZoomImage = document.getElementById("frame-zoom-img");
const closeBtn = document.getElementById("close-btn");
const sliderPrev = document.querySelector(".slider-prev");
const sliderNext = document.querySelector(".slider-next");
let index = 0;

function slideFrameZoomImage(dir, array) {
  if (dir === 1) {
    index++;
    if (index >= array.length) {
      index = array.length - 1;
      return;
    }
    frameZoomImageChange(array[index]);
  } else if (dir === -1) {
    index--;
    console.log(index);
    if (index < 0) {
      index = 0;
      return;
    }
    frameZoomImageChange(array[index]);
  }
}

function frameZoomImageChange(e) {
  frameZoomImage.setAttribute("src", e.src);
}

function frameZoomClick(e, i) {
  e.addEventListener("click", function () {
    popUpChange(1, frameZoom);
    frameZoomImageChange(e);
    index = i;
  });
}

function sliderNextClick() {
  sliderNext.addEventListener("click", function () {
    slideFrameZoomImage(1, [leftImg, centerImg, rightImg]);
  });
}

function sliderPrevClick() {
  sliderPrev.addEventListener("click", function () {
    slideFrameZoomImage(-1, [leftImg, centerImg, rightImg]);
  });
}

function popUpChange(event, element) {
  if (event === 1) {
    element.classList.remove("hidden");
    mainContent.style = "opacity: 0.2";
  } else if (event === -1) {
    element.classList.add("hidden");
    mainContent.style = "opacity: 1";
  }
}

buttonPopUpClick(closeBtn, -1, frameZoom);

frameZoomClick(leftImg, 0);
frameZoomClick(centerImg, 1);
frameZoomClick(rightImg, 2);

sliderNextClick();
sliderPrevClick();

// MATTING
const matTab = document.querySelectorAll(".mat-tab");
const matColorTab = document.querySelectorAll(".mat-color-tab");
const matSizeColor = document.getElementById("mat-size-color");

function resetMatSize() {
  matSizeColor.className = matSizeColor.className.replace(/\bp.*?\b/g, "");
}

matTab.forEach((item) => {
  item.addEventListener("click", function (event) {
    if (event.target.classList.contains("item")) {
      let lastActive = item.querySelector(".item.active");
      let newActive = event.target;

      lastActive.classList.remove("active");
      newActive.classList.add("active");

      newActive.dataset.id === "none"
        ? resetMatSize()
        : newActive.dataset.id === "1"
        ? (resetMatSize(), matSizeColor.classList.add("p-2"))
        : newActive.dataset.id === "1.5"
        ? (resetMatSize(), matSizeColor.classList.add("p-3"))
        : newActive.dataset.id === "2"
        ? (resetMatSize(), matSizeColor.classList.add("p-4"))
        : none;
    }
  });
});

matColorTab.forEach((item) => {
  item.addEventListener("click", function (event) {
    if (event.target.classList.contains("item")) {
      let lastActive = item.querySelector(".item.active");
      let newActive = event.target;

      lastActive.classList.remove("active");
      newActive.classList.add("active");

      newActive.dataset.id === "black"
        ? (matSizeColor.classList.remove("bg-white"),
          matSizeColor.classList.add("bg-black"))
        : newActive.dataset.id === "white"
        ? (matSizeColor.classList.remove("bg-black"),
          matSizeColor.classList.add("bg-white"))
        : none;
    }
  });
});
