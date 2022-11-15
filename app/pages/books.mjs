// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html ({ html, state }) {
  const { store } = state
  let books = store.books || []
  const book = store.book || {}
  const problems = store.problems || {}

  return html`<enhance-page-container>
  <main>
    <h1 class="mb1 font-semibold text3">Books page</h1>
    ${books.map(item => `<article class="mb2">
<div class="mb0">
  <p class="pb-2"><strong class="capitalize">title: </strong>${item?.title || ''}</p>
  <p class="pb-2"><strong class="capitalize">author: </strong>${item?.author || ''}</p>
  <p class="pb-2"><strong class="capitalize">publication_year: </strong>${item?.publication_year || ''}</p>
  <p class="pb-2"><strong class="capitalize">key: </strong>${item?.key || ''}</p>
</div>
<p class="mb-1">
  <enhance-link href="/books/${item.key}">Edit this book</enhance-link>
</p>
<form action="/books/${item.key}/delete" method="POST" class="mb-1">
  <enhance-submit-button><span slot="label">Delete this book</span></enhance-submit-button>
</form>
</article>`).join('\n')}
<details class="mb0" ${Object.keys(problems).length ? 'open' : ''}>
    <summary>New book</summary>
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
</details>
</main>
</enhance-page-container>
  `
}
