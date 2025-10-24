/*
 *  ==> Ajax use cases:
 *    1. Search filter
 *    2. Update the shopping list
 *    3. Auto complete suggestion search
 *    4. Data instant validation
 *    5. Weather information, date
 *    6. Dashboards
 *    7. Updating properties [manipulation of DOM properties]
 *    8. Live chat
 *    9. Transition between pages!
 *    10. Fetching data from APIs
 *    11. Interactive Maps
 */

// Step 1: Targeting the first view link [targeting the element]
const viewRestBtn = document.querySelectorAll('.restaurant-actions a:first-child');
const deleteRestBtn = document.querySelectorAll('.restaurant-actions a:last-child');

// Step 3: Create the functions needed
async function viewRestaurantItem(event) {
  event.preventDefault(); // a. Stopping the anchor tag behaviour [refreshing]
  // b. Retrieve the id of the restaurant from the dataset
  const restId = event.target.dataset.id;
  const response = await fetch(`/restaurants/${restId}`);
  console.log("Request Sent!");
  window.location.href = `/restaurants/${restId}`
}

// Step 2: Adding the event listener
viewRestBtn.forEach( btn => {
  btn.addEventListener('click', viewRestaurantItem);
});

deleteRestBtn.forEach( btn => {
  btn.addEventListener('click', async event => {
    event.preventDefault();
    const restId = event.target.dataset.id;
    console.log(event);
    console.log(restId);

    if (!confirm("Are you sure you want to delete this restaurant?"))
      return;

    const response = await fetch(`/restaurants/${restId}/delete`);
    if (response.status == 200) {
      document.getElementById(restId).hidden = true;
    }
  });
});
