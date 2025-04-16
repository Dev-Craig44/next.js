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
