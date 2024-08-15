const heronav = document.querySelector(".nav"); // Selects navbar

window.addEventListener("scroll", () => {
  // Navbar logic to add sticky class when scrolling
  if (window.scrollY > 0) {
    heronav.classList.add("sticky");
  } else {
    heronav.classList.remove("sticky");
  }
});
