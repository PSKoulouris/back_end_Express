const deleteButtons = document.querySelectorAll('.product-item-actions button')

async function deleteProduct(event){
    //const btnElement = event.target
    //const prodId = btnElement.dataset.productid
    const prodId = event.target.dataset.productid
    const csrfToken = event.target.dataset.csrf

    const response = await fetch(
        '/admin/products/' + prodId + '?_csrf=' + csrfToken,{
            method : 'DELETE'
        }
    )

    if(!response.ok){
        alert('Something went Wrong, we could not delete that product')
        return
    }

    event.target.parentElement.parentElement.parentElement.parentElement.remove()
}



//deleteButton.addEventListener('click',deleteProduct)

for(const deleteBtn of deleteButtons){
    deleteBtn.addEventListener('click',deleteProduct)
}