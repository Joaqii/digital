const textBox = document.querySelector(".chatbox_input_form");
const textBoxText = document.querySelector(".chatbox_input_form_input");

textBox.addEventListener("submit", (e) => {
  e.preventDefault();
  if (textBoxText.value) {
    fetch("/action/chat", {
      method: "POST",
      body: JSON.stringify({ message: textBoxText.value }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data["success"] == "positive") {
          textBoxText.value = "";
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
