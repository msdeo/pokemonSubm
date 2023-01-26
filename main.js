const express = require("express");
const axios = require("axios");
const redis = require("redis");

const app = express();
const port = process.env.PORT || 5000;

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

async function fetchApiData(pokeName) {
  const apiResponse = await axios.get(
    `https://www.pokeapi.co/api/v2/pokemon/${pokeName}`
  );
  console.log("Request sent to the API");
  return apiResponse.data;
}

async function cacheData(req, res, next) {
  const pokeName = req.params.pokeName;
  let results;
  try {
    const cacheResults = await redisClient.get(pokeName);
    if (cacheResults) {
      results = JSON.parse(cacheResults);
      res.send({
        fromCache: true,
        data: results,
      });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(404);
  }
}
async function getPokeData(req, res) {
  const pokeName = req.params.pokeName;
  let results;

  try {
    results = await fetchApiData(pokeName);
    if (results.length === 0) {
      throw "API returned an empty array";
    }
    await redisClient.set(pokeName, JSON.stringify(results), {
      EX: 180,
      NX: true,
    });

    res.send({
      fromCache: false,
      data: results,
    });
  } catch (error) {
    console.error(error);
    res.status(404).send("Data unavailable");
  }
}

app.get("/pokemon/:pokeName", cacheData, getPokeData);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});