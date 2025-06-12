// require("dotenv").config();
const express = require("express");
const path = require("path");
const axios = require("axios");
const querystring = require("querystring");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const clientId = "";
const clientSecret = "";
const redirectUri = "http://lvh.me:3000";

async function getToken() {
  const tokenUrl = "https://www.arcgis.com/sharing/rest/oauth2/token";

  try {
    console.log("Retrieving token...")
    const response = await axios.post(
      tokenUrl,
      querystring.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
        f: "json",
      })
    );
    console.log("Retrieving token:", response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error("Error retrieving token:", error);
    throw new Error("Failed to obtain token");
  }
}

app.get("/get-token", async (req, res) => {
  try {
    const token = await getToken();
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
