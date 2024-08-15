// Select the login screen and logged-in screen elements
const loginScreen = document.querySelector(".acc_login");
const loggedScreen = document.querySelector(".acc_logged");

// Select all buttons related to login actions
const accBtns = document.querySelectorAll(".log_btn");

// Select the logout button within the logged-in screen
const logoutBtn = document.querySelector(".acc_logged_logout_btn");

// Assign login and signup buttons from the array of login action buttons
const loginBtn = accBtns[0];
const signUpBtn = accBtns[1];

// Select the input fields for username and password
const username = document.querySelector('input[name="username"]');
const password = document.querySelector('input[name="password"]');

// Select all notification elements that appear during login or signup
const notifs = document.querySelectorAll(".acc_login_alert");

// Function to hide all notification elements
function hideNotifs() {
  notifs.forEach((notif) => {
    notif.classList.add("hidden");
  });
}

// Function to show the appropriate notification based on the success status
function checkNotifs(check) {
  if (check["success"] == "positive") {
    notifs[0].classList.remove("hidden"); // Show success notification
  } else if (check["success"] == "negative") {
    notifs[1].classList.remove("hidden"); // Show error notification
  } else if (check["success"] == "neutral") {
    notifs[2].classList.remove("hidden"); // Show neutral notification
  }
}

// Function to switch from the login screen to the logged-in screen
function accountScreen() {
  loginScreen.classList.add("hidden");
  loggedScreen.classList.remove("hidden");
}

// Function to switch from the logged-in screen to the login screen
function logScreen() {
  loginScreen.classList.remove("hidden");
  loggedScreen.classList.add("hidden");
}

// Add event listener to the logout button if it exists
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    fetch("/action/logout", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data["success"] == "positive") {
          window.location.reload(); // Reload the page after successful logout
          logScreen(); // Switch to login screen
        }
      })
      .catch((err) => {
        console.log(err); // Log any errors during the logout process
      });
  });
}

// Add event listener to the login button if it exists
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    hideNotifs(); // Hide all notifications before attempting login
    fetch("/action/login", {
      method: "POST",
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        hideNotifs(); // Hide notifications again after receiving response
        if (data["success"] == "positive") {
          window.location.reload(); // Reload page on successful login
        } else {
          checkNotifs(data); // Display appropriate notification on failure
          setTimeout(() => {
            hideNotifs(); // Hide notifications after a delay
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err); // Log any errors during the login process
      });
  });

  // Add event listener to the sign-up button if it exists
  signUpBtn.addEventListener("click", () => {
    hideNotifs(); // Hide all notifications before attempting signup
    fetch("/action/register", {
      method: "POST",
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        hideNotifs(); // Hide notifications again after receiving response
        checkNotifs(data); // Display appropriate notification based on the response
        console.log(data); // Log the response data to the console
        setTimeout(() => {
          hideNotifs(); // Hide notifications after a delay
        }, 2000);
      })
      .catch((err) => {
        console.log(err); // Log any errors during the signup process
      });
  });
}
