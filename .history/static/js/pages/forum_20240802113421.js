const textBox = document.querySelector(".chatbox_input_form");
const textBoxText = document.querySelector(".chatbox_input_form_input");

textBox.addEventListener("submit", (e) => {
  e.preventDefault();
  if (textBoxText.value) {
    fetch("/action/chat", {
      method: "POST",
      body: JSON.stringify({
        message: textBoxText.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data["success"] == "positive") {
          textBoxText.value = "";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
