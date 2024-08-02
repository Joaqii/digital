const textBox = document.querySelector(".chatbox_input_form");
const textBoxText = document.querySelector(".chatbox_input_form_input");

if (textBox) {
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
  fetch("/action/getusername", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      user = data.username;
    })
    .catch((err) => {
      console.log(err);
    });
  
}
const socket = io("http://127.0.0.1:5000");

socket.on("connect", (e) => {
  console.log("SocketIO Connected");
});

let user = "none";

socket.on("post", (data) => {
  const postsContainer = document.querySelector(".chatbox_window");
  const newPost = document.createElement("div");
  newPost.innerHTML = `<div class="chatbox_message"><div class="chatbox_message_username
  ${
    data.current_user == user
      ? "chatbox_message_text current"
      : "chatbox_message_text"
  }
  ">${data.author}:</div><div class="chatbox_message_text">${
    data.content
  }</div></div>`;
  postsContainer.prepend(newPost);
});

socket.on("message", function (msg) {
  console.log("Received:", msg.data);
});

socket.emit("test_event", { message: "Testing from client" });
