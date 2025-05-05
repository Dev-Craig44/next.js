### Routing and Navigation — Final Summary

Here’s what I learned in this section:

- define dynamic routes  
- access route and query string parameters  
- create layouts  
- show loading UIs  
- handle not-found and unexpected errors

#### Special Files in App Router

To make a route publicly accessible, Next.js looks for **special files** inside the `app/` folder:

- `page.tsx` – Defines the content of a page
- `layout.tsx` – Shared UI between pages (e.g., navbars, sidebars)
- `loading.tsx` – UI shown while the page or data is loading
- `route.tsx` – Used to define API routes
- `not-found.tsx` – Renders when `notFound()` is called or a route doesn’t exist
- `error.tsx` – Handles unexpected errors within a page
- `global-error.tsx` – Handles unexpected errors inside root layout

---

### Dynamic Routes

To create routes like `/users/1` or `/photos/2`, use bracket folders:

```
app/users/[id]/page.tsx
app/users/[id]/photos/[photoId]/page.tsx
```

---

### Catch-All & Optional Catch-All Routes

To match varying segment lengths:

- `app/products/[...slug]/page.tsx` → `/products/milk` and `/products/grocery/dairy/milk`
- `app/products/[[...slug]]/page.tsx` → Same as above, but also matches `/products`

---

### Accessing Query String Parameters

Query strings like `?sortOrder=email` are passed via `searchParams`.

---

### Layouts

Layouts define shared structure across pages.

- `/app/layout.tsx` → Global layout
- `/app/admin/layout.tsx` → Admin-specific layout

---

### Global Styles

Tailwind renders elements unstyled by default. Use `@layer base` and `@apply` to create global heading styles like:

```css
@layer base {
  h1 {
    @apply text-3xl font-extrabold mb-3;
  }
}
```

---

### Using the Link Component

Benefits of `<Link>`:

- Prefetches pages in viewport
- Loads content without full page reload
- Uses client cache to avoid refetching

---

### Programmatic Navigation

Use `useRouter().push("/some-page")` to redirect users after events like button clicks or form submissions.

---

### Showing Loading UIs

Add `loading.tsx` to the same folder as your `page.tsx`. Next.js will show this component during data fetching.

Tip: Use the Components tab in React Dev Tools → Suspense stopwatch icon to simulate loading states.

---

### Handling Not Found Errors

Use `notFound()` from `next/navigation` to programmatically trigger a 404.

- `app/not-found.tsx` → Global 404 page
- `app/users/not-found.tsx` → Users-specific not-found page

---

### Handling Unexpected Errors

- `app/error.tsx` → Catches unexpected errors in route segments
- `app/global-error.tsx` → Catches layout-level or uncaught global errors
- Important: Layout errors require a separate `global-error.tsx` file

---

### ⚠️ Breaking Change in Next.js 15

**Params and searchParams are now Promises.**

**Old Behavior:**

```ts
function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
}
```

**New Behavior:**

```ts
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
    <div>
      ProductPage {slug?.join("/")} - Sorted by {sortOrder ?? "default"}
    </div>
  );
}
```

#### Summary

If you see an error like:

```
Type '{ slug?: string[] }' is missing the following properties from type 'Promise<any>': then, catch, finally, [Symbol.toStringTag]
```

It means you're treating `params` like a plain object instead of a Promise.

✅ **Fix**:
- Make your component `async`
- `await` both `params` and `searchParams`

This change enables React Server Component streaming, which improves performance but requires updated syntax.
