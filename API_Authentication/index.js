import express from "express";
import axios from "axios";
import path from "path";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// The details below came from: https://secrets-api.appbrewery.com/
const yourUsername = "user1";
const yourPassword = "user1";
const yourAPIKey = "e1b6fa6e-ad8e-48f0-8a89-0713111d4799";
const yourBearerToken = "bd1ae11c-4795-422a-a596-5f0313316ff9";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

// No Authentication.
app.get("/noAuth", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/random");
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Basic Authentication.
app.get("/basicAuth", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/all?page=2", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// API Key Authentication.
app.get("/apiKey", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/filter", {
      params: {
        score: 5,
        apiKey: yourAPIKey,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Token Authenticaion.
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.get("/bearerToken", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/secrets/2", config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
