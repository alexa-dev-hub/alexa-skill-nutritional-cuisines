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

    await getRemoteData("http://api.open-notify.org/astros.json")
      .then((response) => {
        const data = JSON.parse(response);
        outputSpeech = `There are currently ${data.people.length} astronauts in space. `;
      })
      .catch((err) => {
        console.log(`ERROR: ${err.message}`);
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
