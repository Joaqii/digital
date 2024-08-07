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

document.addEventListener("DOMContentLoaded", () => {
  const socket = io();

  socket.on("post", (data) => {
    const postsContainer = document.querySelector("posts-container");
    const newPost = document.createElement("div");
    newPost.innerHTML = `<strong>${data.author}</strong>: ${data.content}`;
    postsContainer.prepend(newPost);
  });
});
