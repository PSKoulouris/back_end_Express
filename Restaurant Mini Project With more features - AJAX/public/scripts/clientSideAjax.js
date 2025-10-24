/*
AJAX USE CASES:
1.Search filter
2.Updating shopping list
3.Autocomplete suggestion search
4.Data instant validation
5.Weather, date information 
6. Dashboards
7.Updating web page properties[dom]
8.Live chat
9.Transition between pages
10.Fetching data from APIs
11.Interactive Maps
*/

//Step1:Retriving the first view link [targeting the element]
const viewRestBtn = document.querySelectorAll(".restaurant-actions a:first-child") //a:nth(4), a:last-child

//Step3: Create the AJAX asynchronous functions
async function viewRestaurantItem(event){
    event.preventDefault() //stop the anchor tag behaviour 
    // retrieve the id of the restaurant from the dataset:
    const restId = event.target.dataset.id //data-id
    //console.log("test")
    await fetch(`/restaurants/${restId}`)
    console.log("Request sent")

    window.location.href = `/restaurants/${restId}`
} 



//Step2:prevent default change of page for anker tags:
viewRestBtn.forEach(btn =>{
    btn.addEventListener("click", viewRestaurantItem)
})

//Edit with AJAX:

//Delete with AJAX:
const deleteRestBtn = document.querySelectorAll(".restaurant-actions a:last-child") //a:nth(4), a:last-child

async function deleteRestaurantItem(event){
    event.preventDefault() 
    // retrieve the id of the restaurant from the dataset:
    const restId = event.target.dataset.idDelete //data-idDelete
    //console.log("test")
    await fetch(`/restaurants/${restId}`,{
        method:"DELETE"
    })
    window.location.href = `/restaurants`

    console.log("Request Delete sent")
}
deleteRestBtn.forEach(btn =>{
    btn.addEventListener("click", deleteRestaurantItem)
})
