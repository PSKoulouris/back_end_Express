//find the product and delete without routes:

const deleteButtons = document.querySelectorAll('.product-item-actions button')

//deleteButton.addEventListener('click', deleteProduct)
async function deleteProduct(event) {
    const prodId = event.target.dataset.productid
    const csrfToken = event.target.dataset.csrf

    const response = await fetch('/admin/products/' + prodId + '?_csrf=' + csrfToken, {
        method : 'DELETE'
    }
)

if (!response.ok){
    alert('We could not delete the product')
    return
}

event.target.parentElement.parentElement.parentElement.parentElement.remove() // remove the article by goimng up several children
}



for(const deleteBtn of deleteButtons) {
    deleteBtn.addEventListener('click', deleteProduct)
}