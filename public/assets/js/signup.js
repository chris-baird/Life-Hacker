;(() => {
  "use strict"

  function signup(username, password, email) {
    document.getElementById("signup-feedback").classList.add("d-none")

    fetch("/api/users/", {
      method: "POST",
      body: JSON.stringify({
        userName: username,
        password: password,
        email,
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
        document.getElementById("signup-feedback").classList.remove("d-none")
        document.getElementById("signup-feedback").innerText =
          data.message.split(":")[2]
        document.getElementById("signup-username").value = ""
        document.getElementById("signup-username").placeholder = "username"
        document.getElementById("signup-password").value = ""
        document.getElementById("signup-email").value = ""
        document.getElementById("signup-password-confirm").value = ""
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
        const username = document.getElementById("signup-username").value
        const password = document.getElementById("signup-password").value
        const passwordConfirm = document.getElementById(
          "signup-password-confirm"
        ).value
        const email = document.getElementById("signup-email").value
        signup(username, password, email)
      }
      form.classList.add("was-validated")
    },
    false
  )
})()
