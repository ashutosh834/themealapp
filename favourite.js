const favouriteMealContainer = document.getElementById("fav-meal-container");

// Event Listeners
document.addEventListener("DOMContentLoaded", getFavouriteMeals);
favouriteMealContainer.addEventListener("click", removeFromFavourites);

// fetches and displays all favourite meals
function getFavouriteMeals() {
  let favouriteMealsId;

  if (localStorage.getItem("fav") === null) {
    favouriteMealsId = [];
    return;
  } else {
    favouriteMealsId = JSON.parse(localStorage.getItem("fav"));
  }

  let content = "";
  // loop over each meal ID and fetch for meals
  favouriteMealsId.forEach((mealId) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((response) => response.json())
      .then((data) => addfavouriteMeals(data.meals[0], content));
  });
}

// helper funtion that appends favourite meal to container
function addfavouriteMeals(meal, content) {
  content = ` <div class="item" id ="${meal.idMeal}">
    <div class="img">
     <img src= "${meal.strMealThumb}">
    </div>
    <div class="meal-name">
    <h3>${meal.strMeal}</h3>
    </div>
      <button type="submit" class="unfavourite-button"> Delete </button>
    </div>`;
  favouriteMealContainer.innerHTML += content;
}

// to remove favourites from local storage
function removeFromFavourites(event) {
  if (!event.target.classList.contains("unfavourite-button")) {
    return;
  }
  // if unfavourite button is clicked get id of parent
  let favouriteMeal = event.target.parentElement;
  console.log(favouriteMeal);
  let mealId = favouriteMeal.id;
  let favouriteMealsId = JSON.parse(localStorage.getItem("fav"));

  // find the id in the array of all favourite meals
  let idx = favouriteMealsId.indexOf(mealId);

  // remove the id from the array and save array in local storage
  favouriteMealsId.splice(idx, 1);
  localStorage.setItem("fav", JSON.stringify(favouriteMealsId));

  // remove favourite meal element
  favouriteMeal.remove();
}
Footer
© 2023 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
