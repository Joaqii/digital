const accBtns = document.querySelectorAll(".log_btn");

const loginBtn = accBtns[0];
const signUpBtn = accBtns[1];

const username = document.querySelector('input[name="username"]').value;
const password = document.querySelector('input[name="password"]').value;

loginBtn.addEventListener("click", () => {
  console.log(username.value, password.value);
});

signUpBtn.addEventListener("click", () => {
  fetch("/action/register", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      username: username,
      password: password,
      confirmPassword: confirmPassword,
  })
});
