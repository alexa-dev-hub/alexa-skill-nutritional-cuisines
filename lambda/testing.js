const axios = require("axios");

axios
  .get(
    "https://api.spoonacular.com/recipes/findByNutrients?minCarbs=10&maxCarbs=50&number=2&apiKey=dce5c0d84f274548a3edb7a7b661c3de"
  )
  .then((response) => {
    console.log(response.data);
  })
  .catch((err) => {
    console.log(err);
  });
