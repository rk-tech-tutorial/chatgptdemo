// Create a express js and with body parser middleware
const express = require('express');
const { Configuration, OpenAIApi } =  require("openai")
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: "org-fanwP43iYPqqauPBQXqsndNn",
    apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add headers
app.use(cors("*"))

// Create a route for the backend
app.post('/api/createCompletion', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Tum physics ke teacher ho, answer karo prasno ka: ${message}`,
        max_tokens: 100,
        temperature: 0.9,
      });
    return res.send({ express: response.data.choices[0].text });
})

app.post("/api/createImage", async (req, res) => {
    const response = await openai.createImage({
        prompt: req.body.message,
        n: 2,
        size: "1024x1024",
      })
    console.log("response", response.data.data)
    return res.send({ express: response.data.data });
})

app.get('/api', (req, res) => {
    res.send({ express: 'Hello From Express' });
})


// Start the server
app.listen(port, () => console.log(`Listening on port ${port}`));