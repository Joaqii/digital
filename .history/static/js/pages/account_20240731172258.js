const accBtns = document.querySelectorAll(".log_btn");

const loginBtn = accBtns[0];
const signUpBtn = accBtns[1];

const username = document.querySelector('input[name="username"]');
const password = document.querySelector('input[name="password"]');

const notifs = document.querySelectorAll(".acc_login_alert");

function hideNotifs() {
  notifs.forEach((notif) => {
    notif.classList.add("hidden");
  });
}

function checkNotifs(check) {
  if (check["success"] == "positive") {
    notifs[0].classList.remove("hidden");
  } else if (check["success"] == "negative") {
    notifs[1].classList.remove("hidden");
  } else if (check["success"] == "neutral") {
    notifs[2].classList.remove("hidden");
  }
}

function checkLogin() {
  fetch("/action/checklogin", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data["success"] == "positive") {
        console.log("hey");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

checkLogin;

loginBtn.addEventListener("click", () => {
  hideNotifs();
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
      hideNotifs();
      checkNotifs(data);
      console.log(data);
      setTimeout(() => {
        hideNotifs();
      }, 2000);
    })
    .catch((err) => {
      console.log(err);
    });
});

signUpBtn.addEventListener("click", () => {
  hideNotifs();
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
      hideNotifs();
      checkNotifs(data);
      console.log(data);
      setTimeout(() => {
        hideNotifs();
      }, 2000);
    })
    .catch((err) => {
      console.log(err);
    });
});
