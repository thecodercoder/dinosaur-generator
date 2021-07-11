console.log('script.js loaded');

const wrapperEl = document.querySelector('#dinoWrapper')
const BASE_API_URL = './api/dino'

document.querySelector('#btnLoad').addEventListener('click', async () => {
	// if (document.querySelector('#dinoName') !== null) {
	// 	document.querySelector('#dinoName').remove();
	// }
	// if (document.querySelector('#dinoImage') !== null) {
	// 	document.querySelector('#dinoImage').remove();
	// }

	wrapperEl.innerHTML = ""
	await getDinoName();
	await getDinoImage();
});

async function getDinoName() {
	const response = await fetch(BASE_API_URL + '/name');
	const data = await response.json();
	console.log("🚀 ~ file: script.js ~ line 21 ~ getDinoName ~ data", data)
	return
	let dinoName = data[0].join(' ');
	console.log(dinoName);

	let dinoNameDiv = document.createElement('div');
	dinoNameDiv.id = 'dinoName';
	dinoNameDiv.textContent = dinoName;
	document.querySelector('#dinoWrapper').appendChild(dinoNameDiv);
}

async function getDinoImage() {
	const response = await fetch(BASE_API_URL + '/image');
	const data = await response.json();
	console.log("🚀 ~ file: script.js ~ line 35 ~ getDinoImage ~ data", data)
	return
	let dinoImage = data.value[Math.floor(Math.random() * data.value.length)];
	let dinoImageUrl = dinoImage.thumbnailUrl;
	let dinoAlt = dinoImage.name;
	console.log(dinoImage);

	let img = document.createElement('img');
	img.id = 'dinoImage';
	img.src = dinoImageUrl;
	img.alt = dinoAlt;
	document.querySelector('#dinoWrapper').appendChild(img);
}

async function _fetchData(url) {
	try {
		const response = await fetch(url);
		const { status, statusText } = response
		const data = await response.json();
		if (status > 200) throw new Error({ status, statusText, data });

		return data;
	} catch (error) {
		alert(error)
	}
}
