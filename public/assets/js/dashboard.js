;(() => {
  "use strict"
  const commentEL = document.querySelectorAll(".comment")

  const createEl = document.getElementById("dashboard-create")

  const submitEl = document.getElementById("dashboard-submit")

  createEl.addEventListener("click", (e) => {
    e.preventDefault()
    toggleCreatePannel()
  })

  commentEL.forEach((e) => {
    e.addEventListener("click", (el) => {
      const commentEl =
        el.target.parentNode.parentNode.parentNode.parentNode.children[2]
      const commentClasses = [...commentEl.classList]

      if (commentClasses.includes("d-none")) {
        commentEl.classList.remove("d-none")
      } else {
        commentEl.classList.add("d-none")
      }
    })
  })

  function toggleCreatePannel() {
    const newEl = document.getElementById("dashboard-form")

    if ([...newEl.classList].includes("d-none")) {
      newEl.classList.remove("d-none")
      document.getElementById(
        "dashboard-create"
      ).innerHTML = `New Life Hack <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-up" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"/>
    </svg>`
    } else {
      newEl.classList.add("d-none")
      document.getElementById(
        "dashboard-create"
      ).innerHTML = `New Life Hack <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"/>
    </svg>`
    }
  }

  function createLifeHack(title, description, imageUrl) {
    document.getElementById("dashboard-feedback").classList.add("d-none")
    const formData = new FormData()

    formData.append("title", title)
    formData.append("description", description)
    formData.append("file", imageUrl)

    fetch("/api/lifeHacks/", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          window.location.replace("/dashboard")
        }

        return res.json()
      })
      .then((data) => {
        document.getElementById("dashboard-feedback").classList.remove("d-none")
        document.getElementById("dashboard-feedback").innerText = data.message
        document.getElementById("dashboard-title").value = ""
        document.getElementById("dashboard-description").value = ""
        document.getElementById("dashboard-file").value = ""
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
        const title = document.getElementById("dashboard-title").value
        const description = document.getElementById(
          "dashboard-description"
        ).value
        const file = document.getElementById("dashboard-file").files[0]
        createLifeHack(title, description, file)
      }
      form.classList.add("was-validated")
    },
    false
  )
})()
