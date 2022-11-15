import data from '@begin/data'
import { validator } from '@begin/validator'
import { Book } from './schemas/book.mjs'

const deleteBook = async function (key) {
  return data.destroy({ table: 'books', key })
}

const upsertBook = async function (book) {
  return data.set({ table: 'books', ...book })
}

const getBook = async function (key) {
  return data.get({ table: 'books', key })
}

const getBooks = async function () {
  return data.get({ table: 'books' })
}

const validate = {
  shared (req) {
    return validator(req, Book)
  },
  async create (req) {
    let { valid, problems, data } = validate.shared(req)
    if (req.body.key) {
      problems['key'] = { errors: '<p>should not be included on a create</p>' }
    }
    // Insert your custom validation here
    return !valid ? { problems, book: data } : { book: data }
  },
  async update (req) {
    let { valid, problems, data } = validate.shared(req)
    // Insert your custom validation here
    return !valid ? { problems, book: data } : { book: data }
  }
}

export {
  deleteBook,
  getBook,
  getBooks,
  upsertBook,
  validate
}
