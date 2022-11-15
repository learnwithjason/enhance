// View documentation at: https://enhance.dev/docs/learn/starter-project/api
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getBooks, upsertBook, validate } from '../models/books.mjs'


/**
 * @type {EnhanceApiFn}
 */
export async function get (req) {
  const books = await getBooks()
  if (req.session.problems) {
    let { problems, book, ...session } = req.session
    return {
      session,
      json: { problems, books, book }
    }
  }

  return {
    json: { books }
  }
}

/**
 * @type {EnhanceApiFn}
 */
export async function post (req) {
  const session = req.session
  // Validate
  let { problems, book } = await validate.create(req)
  if (problems) {
    return {
      session: { ...session, problems, book },
      json: { problems, book },
      location: '/books'
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, book: removed, ...newSession } = session
  try {
    const result = await upsertBook(book)
    return {
      session: newSession,
      json: { book: result },
      location: '/books'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/books'
    }
  }
}
