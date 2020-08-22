const rp = require("request-promise-native");
const axios = require("axios");

// async function getData() {
//   var options = {
//     uri: `https://api.spoonacular.com/recipes/findByNutrients?minCarbs=10&maxCarbs=50&number=1&apiKey=dce5c0d84f274548a3edb7a7b661c3de`,
//     json: true,
//   };
//   var response = await rp(options);
//   console.log("here" + response);
//   return response;
// }

// async function rundata() {
//   const result = await getData();
//   console.log(result.data);
// }

// rundata();

const callapi = async () => {
  try {
    const response = await axios.get(
      "https://api.spoonacular.com/recipes/findByNutrients?minCarbs=10&maxCarbs=50&number=1&apiKey=dce5c0d84f274548a3edb7a7b661c3de"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const newfun = async () => {
  console.log("FIRST");

  const result = await callapi().then((response) => {
    console.log(response);
    return response;
  });

  console.log("LAST");

  return result;
};

console.log(newfun());
