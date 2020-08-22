const GetRemoteDataHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "LaunchRequest" ||
      (handlerInput.requestEnvelope.request.type === "IntentRequest" &&
        handlerInput.requestEnvelope.request.intent.name ===
          "GetRemoteDataIntent")
    );
  },
  async handle(handlerInput) {
    let outputSpeech = "This is the default message.";

    await getRemoteData(
      "https://api.spoonacular.com/recipes/findByNutrients?minCarbs=10&maxCarbs=50&number=1&apiKey=dce5c0d84f274548a3edb7a7b661c3de"
    )
      .then((data) => {
        const response = JSON.parse(data);
        outputSpeech = `I found ${response.data[0]["title"]} that will give you ${response.data[0]["calories"]} calories.`;
      })
      .catch((err) => {
        console.log(`ERROR: ${err}`);
      });
    return handlerInput.responseBuilder.speak(outputSpeech).getResponse();
  },
};

const getRemoteData = (url) =>
  new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? require("https") : require("http");
    const request = client.get(url, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error(`Failed with status code: ${response.statusCode}`));
      }
      const body = [];
      response.on("data", (chunk) => body.push(chunk));
      response.on("end", () => resolve(body.join("")));
    });
    request.on("error", (err) => reject(err));
  });
