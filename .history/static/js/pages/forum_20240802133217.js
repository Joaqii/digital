const textBox = document.querySelector(".chatbox_input_form");
const textBoxText = document.querySelector(".chatbox_input_form_input");

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

import { io from "https://cdn.socket.io/4.7.0/socket.io.min.js";

const socket = io.connect("http://127.0.0.1:5000");

socket.on("connect", (e) => {
  console.log("SocketIO Connected", socket.id);
});

console.log(socket);

socket.on("post", (data) => {
  console.log("hey");

  const postsContainer = document.querySelector(".chatbox_window");
  const newPost = document.createElement("div");
  newPost.innerHTML = `<div class="chatbox_message_username">${data.author}</div><div class="chatbox_message_text">${data.content}</div>`;
  postsContainer.prepend(newPost);
});

fetch("/test", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

socket.on("test_event", (data) => {
  console.log(data);
});
