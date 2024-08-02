const textBox = document.querySelector(".chatbox_input_form");

textBox.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.value);
});
