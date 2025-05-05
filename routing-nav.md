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

Showing Loading UIs

- when we navigate to a new page, we want to show a loading UI
- a good way to toggle the suspending state is to use the components tab in the dev tools, find the suspense coponent and click the stopwatch button is see how the client is going to look like when the data is being fetched
- you would think that because the client sees the loading UI, the server should also see it, but that's not the case. it doesn't close the connection, it will wait for the data to be fetched and then send the response to the client. This is called streaming.

- what if we wanted to put every page inside a suspense component?
  1.) we could go to the root layout component and wrap the children with a suspense component
  2.) we could add a loading.tsx file to the app folder

Handling Not Found Errors

- if you go to page that doesn't exist, you get a 404 error, but we can always customize it.
- we can create a not-found.tsx file in the app folder and add our custom error message
- you can also create a not-found.tsx file in the users folder and add a custom error message for the users page

Handling Unexpected Errors

- we can create a error.tsx file in the app folder and add our custom error messages
- we also can create a error.tsx file in the users folder and add a custom error message for the users page
- one thing we should know is that we can not capture errors that happen in our route layout
- the route layout in simple right now, but in complex applications, if you have some logic here that could potentially cause an error, you need to create a separate error for capturing errors in this layout. which is called global-error.tsx

  🔄 ⚠️ New Breaking Change in Next.js 15 – params and searchParams Are Now Promises

In Next.js 15, when building pages with Dynamic Routes, both params and searchParams are now Promises by default. Here’s what you need to know:
• params must be awaited, because it’s no longer a plain object.
• searchParams, if used, should also be awaited.
• Your route component must be declared as an async function.

✅ Updated Syntax for Dynamic Route Pages in Next.js 15

export default async function ProductPage({
params,
searchParams,
}: {
params: Promise<{ slug?: string[] }>;
searchParams?: Promise<{ sortOrder?: string }>;
}) {
const { slug } = await params;
const { sortOrder } = (await searchParams) ?? {};

return (

ProductPage {slug?.join(”/”)} - Sorted by {sortOrder ?? “default”}

);
}

🧠 Summary

If you encounter build errors like:

Type ‘{ slug?: string[] }’ is missing the following properties from type ‘Promise’: then, catch, finally, [Symbol.toStringTag]

…it means you’re treating params as a regular object instead of a Promise.

✅ Fix:
• Mark the component async
• Await both params and searchParams

This change aligns with Next.js 15’s Server Component streaming model and enables more efficient routing, but it’s a breaking change if you’re coming from version 14 or earlier.
