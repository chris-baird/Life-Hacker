;(() => {
  "use strict"

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const form = document.querySelector(".needs-validation")

  // Loop over them and prevent submission

  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault()
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      } else {
        login()
      }
      form.classList.add("was-validated")
    },
    false
  )
})()

const userNameEl = document.getElementById("login-username")
const passwordEl = document.getElementById("login-password")
const loginEl = document.getElementById("login-button")

function login() {
  console.log(userNameEl.value, passwordEl.value)

  fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify({
      userName: userNameEl.value,
      password: passwordEl.value,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (res.status === 200) {
        window.location.replace("/dashboard")
      }
      return res.json()
    })
    .then((data) => console.log(data))
    .catch((err) => console.log(err))
}

// loginEl.addEventListener("click", login)
