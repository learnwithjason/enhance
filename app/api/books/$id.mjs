// View documentation at: https://enhance.dev/docs/learn/starter-project/api
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getBook, upsertBook, validate } from '../../models/books.mjs'


/**
 * @type {EnhanceApiFn}
 */
export async function get (req) {
  if (req.session.problems) {
    let { problems, book, ...session } = req.session
    return {
      session,
      json: { problems, book }
    }
  }

  const id = req.pathParameters?.id
  const result = await getBook(id)
  return {
    json: { book: result }
  }
}

/**
 * @type {EnhanceApiFn}
 */
export async function post (req) {
  const id = req.pathParameters?.id

  const session = req.session
  // Validate
  let { problems, book } = await validate.update(req)
  if (problems) {
    return {
      session: {...session, problems, book },
      json: { problems, book },
      location: `/books/${book.key}`
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, book: removed, ...newSession } = session
  try {
    const result = await upsertBook({ key: id, ...book })
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
