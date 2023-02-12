;(() => {
  "use strict"

  function login(username, password) {
    document.getElementById("login-feedback").classList.add("d-none")

    fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        userName: username,
        password: password,
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
        document.getElementById("login-feedback").classList.remove("d-none")
        document.getElementById("login-feedback").innerText = data.message
        document.getElementById("login-username").value = ""
        document.getElementById("login-password").value = ""
      })
      .catch((err) => console.log(err))
  }

  const form = document.querySelector(".needs-validation")

  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault()
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      } else {
        const username = document.getElementById("login-username").value
        const password = document.getElementById("login-password").value
        login(username, password)
      }
      form.classList.add("was-validated")
    },
    false
  )
})()
