const heronav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    heronav.classList.add("sticky");
  } else {
    heronav.classList.remove("sticky");
  }
});
