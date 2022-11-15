// View documentation at: https://enhance.dev/docs/learn/starter-project/api
import { deleteBook } from '../../../models/books.mjs'


/**
 * @type {import('@enhance/types').EnhanceApiFn}
 */
export async function post (req) {
  const id = req.pathParameters?.id

  const session = req.session
  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, book: removed, ...newSession } = session
  try {
    await deleteBook(id)
    return {
      session: newSession,
      json: null,
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
