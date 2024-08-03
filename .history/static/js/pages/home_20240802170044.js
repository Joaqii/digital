const btnSkip = document.querySelector(".btn_skip");

// Animation variables
const road = document.querySelector(".road");
const car = document.querySelector(".car");
const dzCar = document.querySelector(".denzelle.side");
const dzCarFace = document.querySelector(".denzelle.face");
const dzCarSmile = document.querySelector(".denzelle.smile");
const bgTrans = document.querySelector(".bg_trans");
const bg = document.querySelector(".bg");
const bgSkip = document.querySelector(".bg_skip");

// Sections

const sec1 = document.querySelector(".hero");
const sec2 = document.querySelector(".about");
const sec3 = document.querySelector(".gallery");
const sec4 = document.querySelector(".footer");

const matter = [sec2, sec3, sec4];

// Nav

// const heronav = document.querySelector(".nav");

// window.addEventListener("scroll", () => {
//   if (window.scrollY > 0) {
//     heronav.classList.add("sticky");
//   } else {
//     heronav.classList.remove("sticky");
//   }
// });

//

function pauseAnimations() {
  btnSkip.style.display = "none";
  car.style.animationPlayState = "paused";
  road.style.animationPlayState = "paused";
  dzCar.style.animationPlayState = "paused";
  dzCarFace.style.animationPlayState = "paused";
  dzCarSmile.style.animationPlayState = "paused";
  bgTrans.style.animationPlayState = "paused";
  // heronav.style.animationPlayState = "paused";
}

function reveal(check) {
  matter.forEach((e) => {
    e.style.display = check ? "block" : "none";
  });
}

reveal(false);

btnSkip.addEventListener("click", () => {
  pauseAnimations();
  bgSkip.classList.add("play");
  bg.classList.add("suck");
  reveal(true);
  setTimeout(() => {
    bgTrans.style.display = "none";
    heronav.classList.remove("hidden");
  }, 2000);
});

setTimeout(() => {
  reveal(true);
  heronav.classList.remove("hidden");
}, 14000);

function skipIntro() {
  pauseAnimations();
  bg.classList.add("instasuck");
  reveal(true);
  heronav.classList.remove("hidden");
}

function handleIntroPlayback() {
  if (sessionStorage.getItem("introCheck") == "true") {
    skipIntro();
  } else {
    setTimeout(() => {
      sessionStorage.setItem("introCheck", "true");
    }, 1000);
  }
}

// window.addEventListener("DOMContentLoaded", handleIntroPlayback);

skipIntro();

// sessionStorage.setItem("introCheck", "false");

// setTimeout(() => {
//   sessionStorage.setItem("introCheck", "true");
// }, 1000);

// if (sessionStorage.getItem("introCheck") == "true") {
//   skipIntro();
// }

// console.log(sessionStorage.getItem("introCheck"));

/* ---------------------------------- */

// pauseAnimations();
// bg.classList.add("instasuck");
// reveal(true);
// heronav.classList.remove("hidden");

/* ---------------------------------- */
