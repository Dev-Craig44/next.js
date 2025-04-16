here I'm going to learn
-define dynamic routes
-access route and query string parameters
-create layouts
-show loading UIs
-handle errors

-to make a route publicly accessible we have to put a special page in that folder

special files

- page.tsx (that next.js router looks for)
- layout.tsx (defining a common layout for all pages in the folder)
- loading.tsx (for showing loading UIs)
- route.tsx (creating API routes)
- not-found.tsx (for showing custom arrows)
- error.tsx (for showing genereal custom errors)

Dynamic Routes

- create dynamic routes for users and photos

Catch-all Segments

- sometimes we need varying number of parameters in a route.
- for example, you might want to go to /products/grocery/dairy/milk

|create products folder and a [...slug] folder|

- we call is slug because it can contain any value

| create a page.tsx (ProductPage) file [...slug] |

- we should be able to pass atleast one parameter into the slug
- to make the slug optional we can use double brackets
- for example, [[...slug]]

Accessing Query String Parameters

| add a link to our table headers |

- so when we click on the link sortorder is set in the query string

Layouts

- layouts are used to create UIs that are shared between multiple pages

- the root layout that we have in the app folder defines the common UI for all our pages, whereas the layout that we have in the admin folder defines the common UI for all our admin pages

#Exercise - add a navigation bar to all our pages

-our h1 element is rendered without any styles because by default, when we use tailwind, our elements are unstyled

- to fix this we need to add a global style to our app

Link

- you'll learn how to navigate between pages in your app using the Link component

# 3 things you should know

- only downloads the content of the target page
- prefetches links that are in the viewport
- caches pages on the client (so next time we go to a page that we have seen before, Next.js is not going to make a request to the backend, it's going to pull out that page from its client cache)

Programmatic Navigation

- sometimes we need to take the user to a new page as a result of clicking a button or submitting a form
