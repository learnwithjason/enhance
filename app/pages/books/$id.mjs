// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html ({ html, state }) {
  const { store } = state
  const book = store.book || {}
  const problems = store.problems || {}

  return html`<enhance-page-container>
  <enhance-form
  action="/books/${book.key}"
  method="POST">
  <div class="${problems.form ? 'block' : 'hidden'}">
    <p>Found some problems!</p>
    <ul>${problems.form}</ul>
  </div>
  <enhance-fieldset legend="Book">
  <enhance-text-input label="Title" type="text" id="title" name="title" value="${book?.title}" errors="${problems?.title?.errors}"></enhance-text-input>
  <enhance-text-input label="Author" type="text" id="author" name="author" value="${book?.author}" errors="${problems?.author?.errors}"></enhance-text-input>
  <enhance-text-input label="Publication_year" type="number" id="publication_year" name="publication_year" value="${book?.publication_year}" errors="${problems?.publication_year?.errors}"></enhance-text-input>
  <input type="hidden" id="key" name="key" value="${book?.key}" />
  <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
  </enhance-fieldset>
</enhance-form>
</enhance-page-container>`
}
