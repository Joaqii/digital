const accBtns = document.querySelectorAll(".log_btn");

const loginBtn = accBtns[0];
const signUpBtn = accBtns[1];

const username = document.querySelector('input[name="username"]').value;
const password = document.querySelector('input[name="password"]').value;

const notifs = document.querySelectorAll(".acc_login_alert");

function hideNotifs() {
  notifs.forEach((notif) => {
    notif.classList.add("hidden");
  });
}

function checkNotifs(check) {
  if (check["message"] == "positive") {
    notifs[0].classList.remove("hidden");
  } else if (check["message"] == "negative") {
    notifs[1].classList.remove("hidden");
  } else if (check["message"] == "neutral") {
    notifs[2].classList.remove("hidden");
  }
}

loginBtn.addEventListener("click", () => {
  console.log(username.value, password.value);
});

signUpBtn.addEventListener("click", () => {
  hideNotifs();
  fetch("/action/register", {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
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
    })
    .catch((err) => {
      console.log(err);
    });
});
