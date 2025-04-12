NEXT.js

What's the differeces?

What's the differences between the new app router and old pages router?

if you put a test.css file in the same directory as the page.tsx file, it would be publicly accessible at /test.css if this was a pages directory.

Why can ship little pieces ofo the component to the client instead of the whole, when using Next.js?

Why does the app router have better SEO support than the pages router?

// most of the components are server components, so they are rendered on the server and sent to the client as HTML. This means that search engines can crawl the content of the page more easily, which can improve SEO. In contrast, the pages router relies more on client-side rendering, which can make it harder for search engines to index the content of the page.
