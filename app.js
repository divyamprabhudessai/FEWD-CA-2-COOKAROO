const input = document.getElementById('inputbox');
const randomMeal = document.getElementById('random');
const Meal = document.getElementById('meal');
const searchbtn = document.getElementById('search')

async function getRandomMeal() {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
        const data = await response.json();

        console.log(data);

        const image = document.createElement('img');
        image.setAttribute('src', `${data.meals[0].strMealThumb}`);
        image.setAttribute('id', 'img-1');
        image.setAttribute('width', '250vw');

        const mealName = document.createElement('h3');
        mealName.setAttribute('id', 'randomName')
        mealName.textContent = data.meals[0].strMeal;

        randomMeal.append(image, mealName);
    } catch (error) {
        console.error("Error in fetching random meal data: ", error);
    }
}



function getMeals() {
  const name = input.value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((data) => data.json())
    .then((data) => displayMeals(data));
}

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

input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    getMeals();
  }
});


window.onload = async function () {
    await getRandomMeal();
};
