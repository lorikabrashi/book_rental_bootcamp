const Books = require('../models/model.books')
module.exports = {
  addBook: async (body) => {
    const { title, author, genre, price } = body

    const book = await Books.create({
      title: title,
      author: author,
      genre: genre,
      price: price,
    })
    return book
  },
}
