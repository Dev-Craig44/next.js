s# NEXT.js

## Overview

Next.js is a framework for building fast and search-engine-friendly applications. It enables full-stack development by providing:

- A compiler for transforming and minifying JavaScript code.
- A Command-line Interface (CLI) for building and starting applications.
- A Node.js runtime for running backend code.

With Next.js, we can render components on the server and return their content to the client, a technique called **Server-side Rendering (SSR)**. This makes applications search-engine friendly. Additionally, we can pre-render pages and components with static data during the build process, a technique called **Static Site Generation (SSG)**, to further improve performance.

---

## Key Features

### App Router vs. Pages Router

- The **new app router** in Next.js 13 simplifies route creation by allowing route segments to be defined as directories. To make a route public, add a `page.js`, `page.jsx`, or `page.tsx` file in the corresponding directory.
- In the **pages router**, files like `test.css` in the same directory as `page.tsx` would be publicly accessible (e.g., `/test.css`).

### Improved SEO with the App Router

- Most components in the app router are **server components**, rendered on the server and sent to the client as HTML. This allows search engines to crawl the content more easily, improving SEO.
- The pages router relies more on **client-side rendering**, which can make it harder for search engines to index content.

### Rendering Options

Rendering can happen on the **client side** or the **server side**:

- **Client-side Rendering (CSR)**: Always dynamic, rendered in the browser.
- **Server-side Rendering (SSR)**: Rendered on the server, either:
  - **Static Rendering**: At build time, served as static HTML.
  - **Dynamic Rendering**: At request time, served as dynamic HTML.

### Static Rendering

- Static pages are cached during production and do not re-render on the client side.
- Use `cache: "no-store"` to force re-rendering on the client side.

---

## Key Terms

- **Client Components**: Rendered on the client within a web browser.
- **Client-side Rendering (CSR)**: Traditional React rendering in the browser.
- **Dynamic Rendering**: Rendering at request time.
- **Node.js Runtime**: Environment for running server-side code.
- **Server Components**: Rendered on the server within a Node.js runtime.
- **Server-side Rendering (SSR)**: Rendering on the server.
- **Static Rendering**: Rendering at build time.
- **Static Site Generation (SSG)**: Pre-rendering static pages during the build process.

---

## Summary

- Next.js provides **client** and **server components** introduced in React 18.
  - **Client Components**: Handle browser events, access browser APIs, and use state or effect hooks.
  - **Server Components**: Reduce bundle sizes, improve performance, enhance SEO, and increase security. However, they cannot handle browser events or use state/effect hooks.
- By default, all components and pages in the `/app` directory are **server components**. To make a component a client component, add the `'use client'` directive at the top of the file.
- Next.js enhances the `fetch()` function with automatic caching, improving performance and reducing redundant data retrieval.
- Components can be rendered at **build time** (Static Rendering) or **request time** (Dynamic Rendering).

---

## Getting Started with Next.js

### Creating a New Project

```bash
npx create-next-app
```

### Running the Development Server

```bash
npm run dev
```

### Building the Application

```bash
npm run build
```

### Starting the Application in Production Mode

```bash
npm start
```

---

## Additional Notes

- **Client-side Navigation**: Next.js provides the `Link` component for smooth client-side navigation, enabling quick content loading without full page reloads.
- **Data Fetching**: Server components are ideal for fetching data as they avoid extra server trips, making applications faster and more search-engine friendly.

---

## Styling in Next.js

I'm learning global styles, CSS modules, Tailwind CSS, and DaisyUI in Next.js. I will add more information about these topics later.

This project uses a tool called PostCSS for transforming our CSS class names.  
For example: `ProductCard` becomes `ProductCard_Kyhe2`.

### Tailwind CSS Utilities

- **Spacing**: `px`, `py`, `pt`, `pb`, `pl`, `pr`, `mx`, `my`, `mt`, `mb`, `ml`, `mr`
- **Size**: `text-sm`, `text-lg`, `text-2xl`
- **Colors**: `text-red-500`, `bg-blue-200`
- **Thickness**: `font-thin`, `font-light`, `font-normal`, `font-medium`, `font-semibold`, `font-bold`

### Why Use Tailwind CSS?

Some believe inline styling violates the separation of concerns principle. However, the principle is about organizing code into distinct sections or modules, each with its own concerns. Tailwind CSS helps by only including the utility classes used in the final bundle, improving performance.

While CSS files can grow messy as projects scale, Tailwind CSS avoids this by keeping styles modular and scoped to the markup.

## Database Integration with Prisma

- Setting up Prisma
- Defining data models
- Creating migrations
- Performing CRUD operations
