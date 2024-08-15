// Select the skip button element
const btnSkip = document.querySelector(".btn_skip");

// Animation variables
const road = document.querySelector(".road"); // Select the road element
const car = document.querySelector(".car"); // Select the car element
const dzCar = document.querySelector(".denzelle.side"); // Select the side view of Denzelle's car
const dzCarFace = document.querySelector(".denzelle.face"); // Select the front view of Denzelle's face
const dzCarSmile = document.querySelector(".denzelle.smile"); // Select the smile animation of Denzelle
const bgTrans = document.querySelector(".bg_trans"); // Select the background transition element
const bg = document.querySelector(".bg"); // Select the background element
const bgSkip = document.querySelector(".bg_skip"); // Select the background element for skip functionality

// Sections of the page
const sec1 = document.querySelector(".hero"); // Select the hero section
const sec2 = document.querySelector(".about"); // Select the about section
const sec3 = document.querySelector(".gallery"); // Select the gallery section
const sec4 = document.querySelector(".footer"); // Select the footer section

// Array containing the sections that will be revealed
const matter = [sec2, sec3, sec4];

// Navigation bar (commented out)
/*
const heronav = document.querySelector(".nav");

// Add a sticky class to the navigation bar when scrolling (commented out)
window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    heronav.classList.add("sticky");
  } else {
    heronav.classList.remove("sticky");
  }
});
*/

// Function to pause all animations
function pauseAnimations() {
  btnSkip.style.display = "none"; // Hide the skip button
  car.style.animationPlayState = "paused"; // Pause car animation
  road.style.animationPlayState = "paused"; // Pause road animation
  dzCar.style.animationPlayState = "paused"; // Pause Denzelle's car animation
  dzCarFace.style.animationPlayState = "paused"; // Pause Denzelle's face animation
  dzCarSmile.style.animationPlayState = "paused"; // Pause Denzelle's smile animation
  bgTrans.style.animationPlayState = "paused"; // Pause background transition animation
  // heronav.style.animationPlayState = "paused"; // Pause navigation animation (if used)
}

// Function to reveal or hide sections based on the 'check' parameter
function reveal(check) {
  matter.forEach((e) => {
    e.style.display = check ? "block" : "none"; // Show or hide the sections
  });
}

// Initially hide all sections except the hero section
reveal(false);

// Add an event listener to the skip button to handle the skip action
btnSkip.addEventListener("click", () => {
  pauseAnimations(); // Pause all animations
  bgSkip.classList.add("play"); // Start the skip background animation
  bg.classList.add("suck"); // Start the "suck" animation on the background
  reveal(true); // Reveal the hidden sections
  setTimeout(() => {
    bgTrans.style.display = "none"; // Hide the background transition after 2 seconds
    heronav.classList.remove("hidden"); // Show the navigation bar
  }, 2000);
});

// Automatically reveal the sections and show the navigation bar after 14 seconds
setTimeout(() => {
  reveal(true);
  heronav.classList.remove("hidden");
}, 14000);

// Function to immediately skip the intro and reveal content
function skipIntro() {
  pauseAnimations(); // Pause all animations
  bg.classList.add("instasuck"); // Instantly apply the "suck" effect to the background
  reveal(true); // Reveal the hidden sections
  heronav.classList.remove("hidden"); // Show the navigation bar
}

// Function to handle the intro playback based on session storage
function handleIntroPlayback() {
  if (sessionStorage.getItem("introCheck") == "true") {
    skipIntro(); // Skip intro if it has already been viewed
  } else {
    setTimeout(() => {
      sessionStorage.setItem("introCheck", "true"); // Mark the intro as viewed after 1 second
    }, 1000);
  }
}

// Add an event listener to handle the intro playback when the DOM content is loaded
window.addEventListener("DOMContentLoaded", handleIntroPlayback);

// Skip the intro and show all content (commented out)
/*
skipIntro();
sessionStorage.setItem("introCheck", "false");

setTimeout(() => {
  sessionStorage.setItem("introCheck", "true");
}, 1000);

if (sessionStorage.getItem("introCheck") == "true") {
  skipIntro();
}

console.log(sessionStorage.getItem("introCheck"));
*/

// Code to pause animations and reveal content immediately (commented out)
/*
pauseAnimations();
bg.classList.add("instasuck");
reveal(true);
heronav.classList.remove("hidden");
*/
