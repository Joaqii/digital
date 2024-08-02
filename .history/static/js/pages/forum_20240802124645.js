const textBox = document.querySelector(".chatbox_input_form");
const textBoxText = document.querySelector(".chatbox_input_form_input");

const io = require("socket.io")(5000);

textBox.addEventListener("submit", (e) => {
  e.preventDefault();
  if (textBoxText.value) {
    fetch("/action/post", {
      method: "POST",
      body: JSON.stringify({
        content: textBoxText.value,
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

document.addEventListener("DOMContentLoaded", () => {
  io.on("post", (data) => {
    const postsContainer = document.querySelector(".chatbox_window");
    const newPost = document.createElement("div");
    newPost.innerHTML = `<div class="chatbox_message_username">${data.author}</div><div class="chatbox_message_text">${data.content}</div>`;
    postsContainer.prepend(newPost);
  });
});
