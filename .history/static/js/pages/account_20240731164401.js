const accBtns = document.querySelectorAll(".log_btn");

const loginBtn = accBtns[0];
const signUpBtn = accBtns[1];

const username = document.querySelector('input[name="username"]');
const password = document.querySelector('input[name="password"]');

loginBtn.addEventListener("click", () => {
  console.log(username.value, password);
});

signUpBtn.addEventListener("click", () => {
  console.log("no");
});
