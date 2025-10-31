const searchBox = document.getElementById('restaurant-search');
const restaurantList = document.getElementById('restaurants-list');

function initializeRestaurantSearch() {

  if (!searchBox || !restaurantList) {
    console.log('Search elements not found on this page');
    return;
  }
  
  const restaurants = restaurantList.querySelectorAll('li.restaurant-item');
  
  searchBox.addEventListener('input', function() {
    const searchText = this.value.toLowerCase().trim();
    
    restaurants.forEach(restaurant => {
      const matches = searchText === '' || 
                      restaurant.textContent.toLowerCase().includes(searchText);
      //console.log(restaurant.textContent)
      restaurant.style.display = matches ? '' : 'none';
      /*
        if (matches) {
          restaurant.style.display = '';  // Show it
        } else {
          restaurant.style.display = 'none';  // Hide it
        }
      */
    });
  });
  
  console.log('Restaurant search functionality loaded successfully!');
}

document.addEventListener('DOMContentLoaded', initializeRestaurantSearch);