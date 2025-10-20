# Next.js Learning Repository

> A comprehensive collection of Next.js projects, tutorials, and documentation following my learning journey from basics to advanced concepts.

## 📁 Project Structure

This repository contains multiple Next.js projects and learning materials:

- **`next-app/`** - Main Next.js application with practical implementations
- **`recap/`** - Comprehensive tutorial materials and examples
- **`routingAndNavigation/`** - Routing and navigation examples

---

## 🚀 Getting Started

Next.js is a React framework for building fast and search-engine-friendly applications. It provides:

- **Compiler**: Transforms and minifies JavaScript code
- **CLI**: Command-line interface for building applications
- **Node.js Runtime**: Environment for running backend code
- **Server-Side Rendering (SSR)**: Better SEO and performance
- **Static Site Generation (SSG)**: Pre-rendered pages for speed

### Quick Setup

```bash
# Create new Next.js project
npx create-next-app@latest my-app
cd my-app

# Development server
npm run dev          # Start development at http://localhost:3000
npm run build        # Build for production
npm start           # Start production server
```

---

## 📚 Learning Journey

### 1. 🏁 **Fundamentals & Setup**

_From commits: Initial setup, Hello World_

#### Project Creation

```bash
npx create-next-app@latest
```

#### Basic Page Structure

```jsx
// app/page.tsx - Hello World
export default function Home() {
  return <h1>Hello World</h1>;
}
```

#### Key Concepts

- **App Router**: Modern file-based routing (Next.js 13+)
- **Server Components**: Default rendering on server
- **Client Components**: Use `'use client'` for interactivity

---

### 2. 🔗 **Components & Navigation**

_From commits: Link component, client components_

#### Link Component

```jsx
import Link from "next/link";

export default function Navigation() {
  return (
    <nav>
      <Link href="/users">Users</Link>
      <Link href="/products">Products</Link>
    </nav>
  );
}
```

#### Client vs Server Components

```jsx
// Server Component (default) - for static content
export default function ServerComponent() {
  return <h1>Static Content</h1>
}

// Client Component - for interactivity
'use client'
import { useState } from 'react'

export default function ClientComponent() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

---

### 3. 📊 **Data Fetching & Caching**

_From commits: Server components, caching options_

#### Server Component Data Fetching

```jsx
// Cached by default
async function UsersPage() {
  const users = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await users.json();

  return (
    <div>
      {data.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}

// Force fresh data
async function DynamicUsersPage() {
  const users = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store", // No caching
  });
  const data = await users.json();

  return (
    <div>
      {data.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}
```

#### Caching Options

- `cache: 'force-cache'` - Default, cache forever
- `cache: 'no-store'` - No caching, always fetch fresh
- `next: { revalidate: 60 }` - Revalidate every 60 seconds

---

### 4. 🎨 **Styling Approaches**

_From commits: Global styles, CSS modules, Tailwind, DaisyUI_

#### Global Styles

```css
/* app/globals.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h1 {
  color: blue;
}
```

#### CSS Modules

```css
/* ProductCard.module.css */
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
}
```

```jsx
// ProductCard.tsx
import styles from "./ProductCard.module.css";

export default function ProductCard() {
  return <div className={styles.card}>Product</div>;
}
```

#### Tailwind CSS

```jsx
// Utility-first approach
export default function TailwindCard() {
  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-md">
      <h2 className="text-xl font-bold text-gray-800">Product Title</h2>
      <p className="text-gray-600 mt-2">Product description</p>
    </div>
  );
}
```

#### DaisyUI Integration

```javascript
// tailwind.config.js
module.exports = {
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
};
```

```jsx
// Using DaisyUI components
export default function DaisyCard() {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Card title!</h2>
        <p>Description here</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
```

---

### 5. 🧭 **Routing & Navigation**

_From commits: Dynamic routes, catch-all segments, query parameters_

#### File-Based Routing Structure

```
app/
├── page.tsx              # /
├── users/
│   ├── page.tsx          # /users
│   ├── [id]/
│   │   ├── page.tsx      # /users/123
│   │   └── photos/
│   │       └── [photoId]/
│   │           └── page.tsx  # /users/123/photos/456
│   └── new/
│       └── page.tsx      # /users/new
└── products/
    └── [[...slug]]/
        └── page.tsx      # /products, /products/electronics, /products/electronics/phones
```

#### Dynamic Routes

```jsx
// app/users/[id]/page.tsx
interface Props {
  params: { id: string };
}

export default function UserDetail({ params }: Props) {
  return <h1>User {params.id}</h1>;
}
```

#### Catch-All Routes

```jsx
// app/products/[[...slug]]/page.tsx
interface Props {
  params: { slug?: string[] };
}

export default function ProductPage({ params }: Props) {
  const { slug = [] } = params;

  if (slug.length === 0) return <h1>All Products</h1>;
  if (slug.length === 1) return <h1>Category: {slug[0]}</h1>;
  if (slug.length === 2)
    return (
      <h1>
        Product: {slug[1]} in {slug[0]}
      </h1>
    );

  return <h1>Not Found</h1>;
}
```

#### Query Parameters & Sorting

```jsx
// app/users/page.tsx
interface Props {
  searchParams: { sortOrder?: string };
}

export default function UsersPage({ searchParams }: Props) {
  const { sortOrder } = searchParams;

  return (
    <div>
      <Link href="/users?sortOrder=name">Sort by Name</Link>
      <Link href="/users?sortOrder=email">Sort by Email</Link>
      <UserTable sortOrder={sortOrder} />
    </div>
  );
}
```

#### Programmatic Navigation

```jsx
"use client";
import { useRouter } from "next/navigation";

export default function NavigationExample() {
  const router = useRouter();

  const handleSubmit = () => {
    // After form submission
    router.push("/users");
  };

  return <button onClick={handleSubmit}>Go to Users</button>;
}
```

---

### 6. 🏗️ **Layouts & Error Handling**

_From commits: Custom layouts, loading UIs, error handling, not-found pages_

#### Custom Layouts

```jsx
// app/admin/layout.tsx
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <div>
      <h1>Admin Panel</h1>
      <nav>Admin Navigation</nav>
      {children}
    </div>
  );
}
```

#### Loading UI

```jsx
// app/users/loading.tsx
export default function Loading() {
  return <p>Loading users...</p>;
}
```

#### Error Handling

```jsx
// app/error.tsx
'use client'

interface Props {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  return (
    <div>
      <h1>An unexpected error occurred</h1>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

#### Custom Not Found

```jsx
// app/users/[id]/not-found.tsx
export default function UserNotFound() {
  return <h1>This user does not exist</h1>
}

// Usage in page component
import { notFound } from 'next/navigation'

export default function UserPage({ params }: { params: { id: string } }) {
  if (parseInt(params.id) > 10) notFound()

  return <h1>User {params.id}</h1>
}
```

---

### 7. � **API Development & CRUD**

_From commits: API routes, CRUD operations, Zod validation_

#### API Route Structure

```
app/api/
├── users/
│   ├── route.tsx         # GET /api/users, POST /api/users
│   └── [id]/
│       └── route.tsx     # GET, PUT, DELETE /api/users/123
└── products/
    ├── route.tsx
    └── [id]/
        └── route.tsx
```

#### Basic API Routes

```jsx
// app/api/users/route.tsx
import { NextRequest, NextResponse } from "next/server";

// GET /api/users
export async function GET() {
  return NextResponse.json([
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
  ]);
}

// POST /api/users
export async function POST(request: NextRequest) {
  const body = await request.json();

  return NextResponse.json({ id: 3, name: body.name }, { status: 201 });
}
```

#### Dynamic API Routes

```jsx
// app/api/users/[id]/route.tsx
interface Props {
  params: { id: string };
}

// GET /api/users/123
export async function GET(request: NextRequest, { params }: Props) {
  const user = { id: params.id, name: "John" };

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

// PUT /api/users/123
export async function PUT(request: NextRequest, { params }: Props) {
  const body = await request.json();

  return NextResponse.json({ id: params.id, ...body });
}

// DELETE /api/users/123
export async function DELETE(request: NextRequest, { params }: Props) {
  return NextResponse.json({}, { status: 200 });
}
```

#### Validation with Zod

```jsx
// schemas/userSchema.ts
import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  age: z.number().min(18, "Must be at least 18"),
});

// app/api/users/route.tsx
import { userSchema } from "@/schemas/userSchema";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = userSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  // Process valid data
  return NextResponse.json(validation.data, { status: 201 });
}
```

---

### 8. �️ **Database Integration with Prisma**

_From commits: Prisma intro, MySQL setup_

#### Current Learning Focus

Setting up Prisma ORM with MySQL for database operations.

#### Installation & Setup

```bash
npm install prisma @prisma/client
npx prisma init
```

#### Supported Databases

- **MySQL** - Currently learning (popular relational database)
- **PostgreSQL** - Advanced relational database
- **MongoDB** - NoSQL document database
- **SQLite** - Lightweight file-based database

#### Next Steps

1. Define data models in `schema.prisma`
2. Create database migrations
3. Generate Prisma client
4. Implement CRUD operations with type safety

---

## 🔧 **Development Tools & Tips**

### Essential VS Code Extensions

- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prisma extension
- Auto Rename Tag

### Performance Tips

- Use Server Components by default
- Client Components only when needed (interactivity)
- Implement proper caching strategies
- Optimize images with Next.js Image component

### Common Issues & Solutions

- **Next.js 15 Breaking Changes**: Always await `params` and `searchParams`
- **DaisyUI Setup**: Ensure proper PostCSS configuration
- **&apos; Issue**: Handle apostrophes in not-found files correctly

---

## � **Learning Progress Tracking**

### ✅ **Completed (Based on Commits)**

- [x] Project setup and Hello World
- [x] Link component and navigation
- [x] Client vs Server components
- [x] Data fetching and caching
- [x] Global styles and CSS modules
- [x] Tailwind CSS and DaisyUI integration
- [x] File-based routing and dynamic routes
- [x] Query parameters and programmatic navigation
- [x] Custom layouts and error handling
- [x] Loading UIs and not-found pages
- [x] API routes and CRUD operations
- [x] Request validation with Zod

### 🚧 **Currently Learning**

- [ ] Database integration with Prisma
- [ ] MySQL setup and configuration
- [ ] Database migrations and schema design

### 📋 **Upcoming Topics**

- [ ] Authentication and authorization
- [ ] File uploads and image handling
- [ ] Real-time features with WebSockets
- [ ] Testing strategies (Jest, Cypress)
- [ ] Deployment and optimization
- [ ] Internationalization (i18n)

---

## 🔗 **Resources**

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [DaisyUI Components](https://daisyui.com/components/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Zod Validation](https://zod.dev/)

## 9. Setting Up Prisma

- Prisma is a popular ORM (Object-Relational Mapping) tool that simplifies database interactions in Node.js and TypeScript applications.
