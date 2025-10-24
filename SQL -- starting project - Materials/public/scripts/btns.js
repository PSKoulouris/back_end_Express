const deleteBtns = document.querySelectorAll('.delete-btn')

deleteBtns.forEach(btn => {
     btn.addEventListener('click', deleteReview)
})


async function deleteReview(event) {
    event.preventDefault()

    const id = deleteBtns.dataset.btnId
  
    await fetch(`/posts/${id}/delete`)
    window.location.href = '/posts'
}