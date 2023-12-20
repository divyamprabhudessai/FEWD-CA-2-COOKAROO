// Get DOM elements
const input = document.getElementById('inputbox');
const randomMeal = document.getElementById('random');
const Meal = document.getElementById('meal');
const searchbtn = document.getElementById('searchbtn');
const category = document.getElementById('category');
const modal = document.querySelector('.modalContainer');
const modalContainer = document.querySelector('.bigModal');
const smallmodal = document.querySelector('.modal');

// Event listener for displaying random meal modal
randomMeal.onclick = () => {
    modalContainer.style.visibility = 'visible';
    modal.style.display = 'block';
};

// Event listener for closing the modal
const close = document.querySelector('.close');
close.onclick = () => {
    modalContainer.style.visibility = 'hidden';
    modal.style.display = 'none';
};

input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
  }
});

// Event listener for the search button to trigger fetching category and meals
searchbtn.addEventListener('click', (e) => {
  e.preventDefault();
  handleSearch();
});


// Function to handle search (common logic for both Enter key and search button click)
function handleSearch() {
  getMealCategory();
  getMeals();
}
// Fetch a random meal and display its details
async function getRandomMeal() {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
        const data = await response.json();

        // Display the random meal and ingredients in the modal
        displayRandomMeal(data);
    } catch (error) {
        console.error('Error in fetching random meal data: ', error);
    }
}

// Fetch the category name based on the search input
function getMealCategory() {
    const name = input.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then((data) => data.json())
        .then((data) => displayCategoryName(data));
}

// Display the category name
function displayCategoryName(data) {
    const meals = data.meals;

    meals.forEach((el) => {
        category.textContent = el.strCategory;
    });
    console.log(data);
}

// Fetch meals based on the category
function getMeals() {
    const name = input.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)
        .then((data) => data.json())
        .then((data) => displayMeals(data));
}

// Display meals in the UI
function displayMeals(data) {
    const meals = data.meals;

    // Clear previous search results
    Meal.innerHTML = '';

    meals.forEach((el) => {
        let newTile = document.createElement('div');
        newTile.setAttribute('class', 'tile');

        let img = document.createElement('img');
        img.setAttribute('src', el.strMealThumb);
        img.setAttribute('width', '150vw');

        let name = document.createElement('h3');
        name.textContent = el.strMeal;

        newTile.append(img, name);

        Meal.append(newTile);
    });
    console.log(data);
}

// Load a random meal when the window is loaded
window.onload = async function () {
    await getRandomMeal();
};

// Helper function to display a random meal in the modal
function displayRandomMeal(data) {
    const image = document.createElement('img');
    image.setAttribute('src', `${data.meals[0].strMealThumb}`);
    image.setAttribute('id', 'img-1');
    image.setAttribute('width', '250vw');

    const mealName = document.createElement('h3');
    mealName.setAttribute('id', 'randomName');
    mealName.textContent = data.meals[0].strMeal;

    randomMeal.append(image, mealName);

    // Add image and meal name to smallmodal
    const smallModalImage = document.createElement('img');
    smallModalImage.setAttribute('src', `${data.meals[0].strMealThumb}`);
    smallModalImage.setAttribute('id', 'smallModalImg');
    smallModalImage.setAttribute('width', '250vw');

    const smallModalName = document.createElement('h3');
    smallModalName.setAttribute('id', 'smallModalName');
    smallModalName.textContent = data.meals[0].strMeal;

    smallmodal.append(smallModalImage, smallModalName);

    let modalList = document.querySelector('.modalList');
    modalList.innerHTML = '';

    let currentMeal = data.meals[0];

    // Display ingredients in the modal
    for (let i = 1; i < 9; i++) {
        const ingredient = `strIngredient${i}`;
        let ing = currentMeal[ingredient];

        if (ing) {
            const listItem = document.createElement('li');
            listItem.textContent = ing;
            modalList.appendChild(listItem);
        }
    }
}
