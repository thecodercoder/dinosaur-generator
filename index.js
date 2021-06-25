if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const port = 3000;
const fetch = require('node-fetch');

app.use(express.static('public'));

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

const api_key = process.env.API_KEY;

app.get('/dinoname', async (request, response) => {
	const fetchApi = await fetch(
		'https://alexnormand-dino-ipsum.p.rapidapi.com/?paragraphs=1&words=2&format=json',
		{
			method: 'GET',
			headers: {
				'x-rapidapi-key': api_key,
				'x-rapidapi-host': 'alexnormand-dino-ipsum.p.rapidapi.com',
			},
		}
	);
	const dinoNameResponse = await fetchApi.json();
	console.log(dinoNameResponse);
	response.json(dinoNameResponse);
});

app.get('/dinoimage', async (request, response) => {
	const fetchApi = await fetch(
		'https://bing-image-search1.p.rapidapi.com/images/search?q=dinosaur&count=20',
		{
			method: 'GET',
			headers: {
				'x-rapidapi-key': api_key,
				'x-rapidapi-host': 'bing-image-search1.p.rapidapi.com',
			},
		}
	);
	const dinoImageResponse = await fetchApi.json();
	console.log(dinoImageResponse);
	response.json(dinoImageResponse);
});
