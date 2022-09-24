;(() => {
  "use strict"

  const form = document.querySelector(".needs-validation")

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
  document.getElementById("login-feedback").classList.add("d-none")

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
    .then((data) => {
      console.log(data)
      document.getElementById("login-feedback").classList.remove("d-none")
      document.getElementById("login-feedback").innerText = data.message
    })
    .catch((err) => console.log(err))
}
