const input=document.getElementById('inputbox')
const randomMeal = document.getElementById('random')



    async function getRandomMeal() {      
        try {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
          const data = await response.json(); // Await the response.json() method
      
          console.log(data);
      
          const image = document.createElement('img');
          image.setAttribute('src', `${data.meals[0].strMealThumb}`);
          image.setAttribute('id', 'img-1')
          image.setAttribute('width', '250vw')

          const mealName = document.createElement('h3');
          mealName.textContent = data.meals[0].strMeal;

          randomMeal.append(image,mealName);
        } catch (error) {
          console.error("Error in fetching the data: ", error);
        }
      }
      async function categoryMeals() {
        const value = input.value;
    
        if (value !== '') {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`);
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }
    
    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            categoryMeals();
        }
    });
    
        
      
      
      window.onload = async function () {
        await getRandomMeal();
      };
      
