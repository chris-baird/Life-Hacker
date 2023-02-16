;(() => {
  "use strict"

  // Displays comment, like and rating controls if user is logged in
  function showControls() {
    const user = document.querySelector(".browse-page").dataset.user
    if (user === "true") {
      document.querySelectorAll(".browse-controls").forEach((e) => {
        e.classList.remove("browse-controls")
      })
    }
  }

  showControls()

  function createComment(e) {
    const id = e.currentTarget.dataset.id
    const text = e.currentTarget.previousElementSibling.children[0].value
    if (text) {
      fetch("/api/lifeHacks/" + id + "/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
        }),
      }).then((res) => {
        if (res.status === 200) {
          window.location.replace("/browse")
        }
      })
    }
  }

  const commentEls = document.querySelectorAll(".comment-submit")

  commentEls.forEach((e) => {
    e.addEventListener("click", createComment)
  })

  function deleteLifehack(e) {
    const id = e.currentTarget.dataset.delete

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("/api/lifeHacks/" + id, {
          method: "DELETE",
        }).then((res) => {
          if (res.status === 200) {
            Swal.fire(
              "Deleted!",
              "Your Life Hack has been deleted.",
              "success"
            ).then(() => {
              console.log(true)
              window.location.replace("/dashboard")
            })
          } else {
            Swal.fire("Error!", "Unexpected error.", "Please try again").then(
              () => {
                console.log(true)
                window.location.replace("/dashboard")
              }
            )
          }
        })
      }
    })
  }

  const deleteEls = document.querySelectorAll(".dashboard-delete-lifehack")

  deleteEls.forEach((e) => {
    e.addEventListener("click", deleteLifehack)
  })
})()
