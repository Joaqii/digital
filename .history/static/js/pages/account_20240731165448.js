const accBtns = document.querySelectorAll(".log_btn");

const loginBtn = accBtns[0];
const signUpBtn = accBtns[1];

const username = document.querySelector('input[name="username"]').value;
const password = document.querySelector('input[name="password"]').value;

const notifs = document.querySelectorAll('acc_login_alert')


loginBtn.addEventListener("click", () => {
  console.log(username.value, password.value);
});

signUpBtn.addEventListener("click", () => {
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
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
