// Select the form element for the chatbox input
const textBox = document.querySelector(".chatbox_input_form");

// Select the input field where the user types their message
const textBoxText = document.querySelector(".chatbox_input_form_input");

// Selecting every message in the chatbox
const message = document.querySelectorAll(".chatbox_message");

// Initialize a variable to store the username, defaulting to "none"
let user = "none";

// Check if the chatbox message exists
function handleDelete(e) {
  // console.log("hey");

  e.forEach((msg) => {
    // console.log(msg);

    const id = Number(msg.dataset.id);
    msg
      .querySelector(".chatbox_message_delete")
      ?.addEventListener("click", (e) => {
        // console.log("hi");

        fetch("/action/delete", {
          method: "POST",
          body: JSON.stringify({
            id: id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            // if (data["success"] == "positive") {
            //   msg.remove();
            // }
          })
          .catch((err) => {
            console.log(err);
          });
      });
  });
}

if (message) {
  handleDelete(message);
}

// Check if the chatbox form exists
if (textBox) {
  // Add an event listener to handle the form submission
  textBox.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the form from submitting the traditional way
    if (textBoxText.value) {
      // If the input field is not empty, send a POST request to submit the message
      fetch("/action/post", {
        method: "POST",
        body: JSON.stringify({
          content: textBoxText.value, // Send the content of the input field
        }),
        headers: {
          "Content-Type": "application/json", // Indicate that the request body is JSON
        },
      })
        .then((res) => res.json()) // Parse the response as JSON
        .then((data) => {
          if (data["success"] == "positive") {
            textBoxText.value = ""; // Clear the input field if the message was successfully posted
          }
        })
        .catch((err) => {
          console.log(err); // Log any errors during the post request
        });
    }
  });

  // Fetch the current username from the server
  fetch("/action/getusername", {
    method: "GET",
  })
    .then((res) => res.json()) // Parse the response as JSON
    .then((data) => {
      user = data.username; // Store the username in the 'user' variable
    })
    .catch((err) => {
      console.log(err); // Log any errors during the username fetch
    });
}

// Initialize a Socket.IO connection
const socket = io();

// Handle the event when the socket successfully connects
socket.on("connect", (e) => {
  console.log("SocketIO Connected");
});

socket.on("delete", (data) => {
  const id = data.id;
  const msg = document.querySelector(`[data-id="${id}"]`);
  msg.remove();
});

// Handle incoming "post" events from the server
socket.on("post", (data) => {
  // Select the container element where chat messages are displayed
  const postsContainer = document.querySelector(".chatbox_window");

  // Create a new div element for the incoming message
  const newPost = document.createElement("div");

  // Set the inner HTML of the new div, including the message and username
  newPost.innerHTML = `<div class="chatbox_message" data-id=${
    data.id
  }><div class="chatbox_message_username
  ${
    data.current_user == user
      ? "chatbox_message_text current" // Apply a different style if the message is from the current user
      : "chatbox_message_text"
  }
  ">${data.author}:</div><div class="chatbox_message_text">${
    data.content
  }</div>${
    data.current_user == user
      ? `<button class="chatbox_message_delete">Delete</button>`
      : ""
  }</div>`;

  // Add the new message to the top of the chat window
  postsContainer.prepend(newPost);
  handleDelete(document.querySelectorAll(".chatbox_message"));
});

// Handle incoming "message" events from the server (not chat messages, but generic socket messages)
socket.on("message", function (msg) {
  console.log("Received:", msg.data); // Log the received message data
});

// Emit a test event to the server for debugging purposes
socket.emit("test_event", { message: "Testing from client" });
