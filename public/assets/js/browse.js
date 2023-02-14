;(() => {
  "use strict"

  const commentEL = document.querySelectorAll(".comment")

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
