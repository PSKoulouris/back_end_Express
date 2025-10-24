const deleteRestaurantBtns = document.querySelectorAll('.delete-btn')
const viewRestaurantBtns = document.querySelectorAll('.restaurant-actions a:first-child')
const editRestaurantBtns = document.querySelectorAll('.edit-btn')


async function viewRestaurantItem(event) {
    event.preventDefault()
    
    const restaurantId = event.currentTarget.dataset.restId
    
    await fetch(`/restaurants/${restaurantId}`)
    window.location.href = `/restaurants/${restaurantId}`
}

async function editRestaurantItem(event) {
    event.preventDefault()
    
    const restaurantId = event.currentTarget.dataset.restId
    
    await fetch(`/restaurants/${restaurantId}/edit`)
    window.location.href = `/restaurants/${restaurantId}/edit`
}

async function deleteRestaurantItem(event) {
    event.preventDefault()
    
    const id = deleteRestaurantBtn.dataset.restId
  
    await fetch(`/restaurants/${id}/delete`)
    window.location.href = '/restaurants'  // Needed because fetch doesn't auto-redirect browser
}


// Add event listeners to all buttons
viewRestaurantBtns.forEach(btn => {
    btn.addEventListener('click', viewRestaurantItem)
})

editRestaurantBtns.forEach(btn => {
    btn.addEventListener('click', editRestaurantItem)
})

deleteRestaurantBtns.forEach(btn => {
    btn.addEventListener('click', deleteRestaurantItem)
})



