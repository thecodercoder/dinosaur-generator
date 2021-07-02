const { getDinoName, getDinoImage } = require('./dino.service')

async function dinoName(req, res, next) {
  try {
    const defaultQuery = {
      paragraphs: 1,
      words: 2,
      format: 'json'
    }
    let { paragraphs, words } = req.query
    paragraphs = +paragraphs
    words = + words
    if (!(paragraphs >= 1 && words >= 1)) {
      throw new Error(JSON.stringify({ message: 'invalid or missing params', params: req.query }))
    }

    defaultQuery.paragraphs = +paragraphs
    defaultQuery.words = +words
    const output = await getDinoName(defaultQuery)
    if (output.error) return next(output.error)
    return res.json(output)
  } catch (error) {
    next(error)
  }
}
async function dinoImage(req, res, next) {
  try {

    const defaultQuery = {
      q: 'dinosaur',
      count: 20,
    }
    let { count } = req.query
    count = + count
    if (!count >= 1) {
      throw new Error(JSON.stringify({ message: 'invalid or missing params', params: req.query }))
    }
    defaultQuery.count = +count
    const output = await getDinoImage(defaultQuery)
    return res.json(output)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  dinoName,
  dinoImage
}