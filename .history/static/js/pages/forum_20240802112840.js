const textBox = document.querySelector(".chatbox_input_form");
const textBoxText = document.querySelector('.chatbox_input_form_input')


textBox.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.value);
});