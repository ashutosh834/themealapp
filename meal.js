// query selectors
const searchKeyword = document.querySelector('#search');
const mealContainer = document.querySelector('.search-result');
const mealDetailsContainer = document.querySelector("#meal-details-container");
const backButton = document.querySelector("#back-button");

// Event listeners
searchKeyword.addEventListener('input',searchForMeal);   
backButton.addEventListener("click", closeRecipeDetails);
mealContainer.addEventListener("click", getRecipeDetails);
mealContainer.addEventListener("click", addToFavourites);

// for preventing enter key effect
searchKeyword.addEventListener('keypress',function(event){
  if (event.keyCode == 13) {
    event.preventDefault();
}
})

// for searching meals on input
function searchForMeal() {
    let searchText = searchKeyword.value;
    // Promise chaining
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
      // convert response to json
      .then((response) => response.json())
      // json structure -> {meals:[]}
      .then((data) => {
        let list = "";
        if (data.meals) {
          // loop over every meal and add it to the list
          data.meals.forEach((meal) => {
            list += `
            <div class="item" id ="${meal.idMeal}">
                    <div class="img">
                     <img src= "${meal.strMealThumb}">
                    </div>
                    <div class="meal-name">
                    <h3>${meal.strMeal}</h3>
                    </div>
                  <div class="btns">
                     <a href="#"class="recipe">Get the Recipe</a>
                     <button type="submit"class="fav">Add to Favourite</button>
                  </div>
                </div>
            `;
          });
        }
        // append all meals found to meal div
        mealContainer.innerHTML = list;
      });
}

//get recipe details
function getRecipeDetails(event) {
  // check if recipe button is clicked
    if (event.target.classList.contains("recipe")) {
      let mealItem = event.target.parentElement.parentElement;
      const mealId = mealItem.id;
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then((response) => response.json())
        .then((data) => addRecipeDetail(data.meals[0]));
    }
}
// function  to show recipe details
function addRecipeDetail(meal) {
    let content = `
      <h2 class = "recipe-title">${meal.strMeal}</h2>
      <div class = "recipe-instructions">
           <p>${meal.strInstructions}</p>
      </div>
      <div class = "recipe-meal-img">
          <img src = "${meal.strMealThumb}" alt = "">
      </div>
      <div class = "recipe-link">
          <a href = "${meal.strYoutube}" target = "_blank"><i class="fa-brands fa-youtube"></i>&nbsp;Watch Video</a>
      </div>`;

    mealDetailsContainer.innerHTML = content;
    mealDetailsContainer.parentElement.classList.add("show-recipe");
  }
  
  // To close recipe details
  function closeRecipeDetails() {
    mealDetailsContainer.parentElement.classList.remove("show-recipe");
  }

  // add meals to favourites
function addToFavourites(event) {
  // if user has not clicked on favourite button just return
  if (!event.target.classList.contains("fav")) {
    return;
  }
  // if (event.target.classList.contains("fav")){
  //   alert('Added to favourite');
  // }
  let mealId = event.target.parentElement.parentElement.id;
  let favouriteMeals;

  if (localStorage.getItem("fav") === null) {
    favouriteMeals = [];
  } else {
    favouriteMeals = JSON.parse(localStorage.getItem("fav"));
  }

  // check if the mealId is already present
  if (favouriteMeals.indexOf(mealId) !== -1) {
    return;
  } 
  // add id to array and save it back to local storage
  favouriteMeals.push(mealId);
  localStorage.setItem("fav", JSON.stringify(favouriteMeals));
}
  