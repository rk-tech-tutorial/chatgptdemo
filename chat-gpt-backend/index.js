// Create a express js and with body parser middleware
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const { Configuration, OpenAIApi } =  require("openai")
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: process.env.ORG_ID,
    apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add headers
app.use(cors("*"))

const promptOptions = {
    "physics teacher": "Think that your are a physics teacher and answer the following question:",
    "maths teacher": "Think that your are a maths teacher and answer the following question:",
    "chemistry teacher": "Think that your are a chemistry teacher and answer the following question:",
    "biology teacher": "Think that your are a biology teacher and answer the following question:",
    "linux terminal": "Think that your are a linux terminal and answer the following question:",
    "windows terminal": "Think that your are a windows terminal and answer the following question:",
    "mac terminal": "Think that your are a mac terminal and answer the following question:",
    "linux commands": "Think that your are a linux commands and answer the following question:",
    "windows commands": "Think that your are a windows commands and answer the following question:",
    "mac commands": "Think that your are a mac commands and answer the following question:",
    "tata 4 wheeler sales executive": "Think that your are a tata 4 wheeler sales executive and answer the following question:",
    "You are javascript programmer": "Think that your are a javascript programmer and answer the following question:",
}


// Create a route for the backend
app.post('/api/createCompletion', async (req, res) => {
    const { message, chooseOptions } = req.body;
    const prompt = promptOptions[chooseOptions] || "You are a javascript programmer and answer the following question:"
    console.log("message", prompt, message)
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt} ${message}?`,
        max_tokens: 100,
        temperature: 0,
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