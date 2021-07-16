let role = document.getElementById('role')
let email = document.getElementById("email");
let password = document.getElementById("password");
let loginButton = document.getElementById("register");

loginButton.addEventListener("click", () => {
  console.log(role.value, email.value, password.value);
});
