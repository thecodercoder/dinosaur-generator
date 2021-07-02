console.log('script.js loaded');

const wrapperEl = document.querySelector('#dinoWrapper')
const BASE_API_URL = './api/dino'

document.querySelector('#btnLoad').addEventListener('click', async () => {
	wrapperEl.innerHTML = ""
	render();
});

async function render() {
	const nameArr = await _fetchData(BASE_API_URL + '/name?words=2&paragraphs=1');
	const dinoName = nameArr.join(' ');
	console.log(dinoName);

	const imageArr = await _fetchData(BASE_API_URL + '/image?count=1');
	const imageUrl = imageArr[0]
	const imageAlt = imageUrl.split('/')[imageUrl.length - 1]

	var img = new Image();
	img.onload = function () {
		const dinoNameDiv = `<div id="dinoName">${dinoName}</div>`;
		wrapperEl.insertAdjacentHTML('beforeend', dinoNameDiv);

		const dinoImageEl = `<img id="dinoImage" src="${imageUrl}" alt="${imageAlt}"/>`;
		wrapperEl.insertAdjacentHTML('beforeend', dinoImageEl);
	}
	img.src = imageUrl;
}

async function _fetchData(url) {
	try {
		const response = await fetch(url);
		const { status, statusText } = response
		const data = await response.json();
		if (status > 200) throw { error: true, url, status, statusText, data };

		return data;
	} catch (error) {
		console.error("🚀 ~ file: script.js ~ line 48 ~ _fetchData ~ error", error)
		return null
	}
}