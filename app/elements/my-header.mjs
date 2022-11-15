// View documentation at: https://enhance.dev/docs/learn/starter-project/elements
/**
 * @type {import('@enhance/types').EnhanceElemFn}
 */
export default function Element({ html }) {
  return html` <header>
    <a rel="home" href="/">Neat!</a>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  </header>`;
}
