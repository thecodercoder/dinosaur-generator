
const API_KEY = process.env.API_KEY;
const { fetchWrapper, objToQueryParamString } = require('../../services/fetch.service')

async function getDinoName(queryParams) {

  try {
    const BASE_URL = 'https://alexnormand-dino-ipsum.p.rapidapi.com/?' + objToQueryParamString(queryParams)
    const [response, error] = await fetchWrapper(BASE_URL, null, 'GET', {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'alexnormand-dino-ipsum.p.rapidapi.com',
    })
    if (error) throw new Error(error)
    return { response }
  } catch (error) {
    return { error }
  }
}

async function getDinoImage(queryParams) {
  try {
    const BASE_URL = 'https://bing-image-search1.p.rapidapi.com/images/search?' + objToQueryParamString(queryParams)
    console.log("🚀 ~ file: dino.service.js ~ line 23 ~ getDinoImage ~ BASE_URL", BASE_URL)
    const [response, error] = await fetchWrapper(BASE_URL, null, 'GET', {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'bing-image-search1.p.rapidapi.com',
    })
    if (error) throw new Error(error)
    return { response: response.value.map(entry => entry.contentUrl) }
  } catch (error) {
    return { error }
  }
}

module.exports = {
  getDinoName,
  getDinoImage
}