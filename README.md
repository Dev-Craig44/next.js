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

### 8. 🗄️ **Database Integration with Prisma**

_From commits: Prisma intro, MySQL setup, database connection configuration_

#### Current Learning Progress

Setting up Prisma ORM with MySQL for database operations.

#### Installation & Setup

```bash
npm install prisma @prisma/client
npx prisma init
```

#### Database Connection Configuration

```bash
# .env file setup
DATABASE_URL="mysql://root:password@localhost:3306/mydb"
```

**Key Points:**

- **Connection String Format**: `mysql://username:password@host:port/database`
- **Local MySQL**: Connects to MySQL running on localhost:3306
- **Environment Variables**: Stored in `.env` for security
- **No Schema Parameter**: Unlike PostgreSQL, MySQL doesn't use `?schema=public`

#### Supported Databases

- **MySQL** - Currently learning (popular relational database)
- **PostgreSQL** - Advanced relational database
- **MongoDB** - NoSQL document database
- **SQLite** - Lightweight file-based database

#### Next Steps

1. Add `.env` to `.gitignore` for security
2. Define data models in `schema.prisma`
3. Create database migrations
4. Generate Prisma client
5. Implement CRUD operations with type safety

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

- Typing in `npm prisma` will give you commands related to Prisma, such as initializing a new Prisma project, generating the Prisma client, and running migrations.

- After npm installing Prisma and the Prisma Client in your project, you can initialize Prisma in your project by running `npx prisma init`. This command creates a new `prisma` directory with a `schema.prisma` file where you can define your data models and configure your database connection.

- This will create a prisma folder that has the schema.prisma file inside it, and it also adds an environment variable in your .env file for, in this case, a MySQL database connection string.

- If you google `prisma connection string`, you will find examples of how to format the connection string for different databases like MySQL, PostgreSQL, etc.

---

## 📝 **Recent Development Notes**

### Database Connection Configuration

_Latest commit: "🔧 configure MySQL database connection string in .env"_

**What was accomplished:**

- Configured MySQL database connection in `.env` file
- Set up proper connection string format: `mysql://username:password@host:port/database`
- Removed PostgreSQL-specific `?schema=public` parameter (not needed for MySQL)
- Ready for Prisma schema initialization and database operations

**Key learning points:**

- MySQL connection strings don't use schema parameters like PostgreSQL
- Environment variables in `.env` keep sensitive credentials secure
- Connection format: `mysql://root:password@localhost:3306/mydb`
- MySQL service running at `/usr/local/mysql/` (installed via official MySQL installer)

### Next Steps

_Upcoming commit: "🔒 add .env to .gitignore for security"_

**What needs to be done:**

- Add `.env` file to `.gitignore` to prevent committing sensitive database credentials
- Ensure environment variables remain local and secure
- Continue with Prisma schema definition and migrations

### 10. Defining Data Models

_Latest commit: "📊 define User model in Prisma schema with validation rules"_

**What was accomplished:**

- Defined User model in `schema.prisma` with proper field types and constraints
- Added validation rules: `@db.VarChar(255)` for name and email fields
- Set up primary key with `@id @default(autoincrement())` for auto-incrementing IDs
- Configured email field as unique to prevent duplicate accounts
- Established foundation for user management system

**Prisma Schema Structure:**

```prisma
// prisma/schema.prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String @db.VarChar(255)
  email String @unique @db.VarChar(255)
}
```

**Key learning points:**

- Models represent database tables in Prisma
- Field types map to database column types
- `@unique` constraint prevents duplicate values
- `@db.VarChar(255)` specifies exact database column type
- Auto-incrementing primary keys are standard for relational databasesj

## 11. Creating Migrations

- As we define or change our models, we have to create migrations. These migrations are used to keep our database schema in sync with our Prisma schema.

- In the terminal, we're going to run the command `npx prisma migrate dev`. This command will create a new migration based on the changes in our Prisma schema and apply it to the database.

---

## 📝 **Recent Development Notes**

### Prisma Migrations & Database Management

_Latest commits: "🗄️ create initial database migration", "🔄 add registered_at field to User model"_

**What was accomplished:**

- Successfully created and ran initial Prisma migration (`20251021045753_intitial`)
- Added `registered_at` field to User model with second migration (`20251021051822_add_registered_at`)
- Established MySQL database (`nextapp`) using MySQL Workbench
- Set up proper database connection with credentials: `mysql://root:MyP@ssw0d@localhost:3306/nextapp`
- Downloaded and configured DataGrip as additional database management tool

**Migration Commands Used:**

```bash
# Create and apply migration
npx prisma migrate dev --name initial

# Push schema changes without formal migration
npx prisma db push
```

**Database Tools Setup:**

- **MySQL Workbench**: Primary GUI tool for MySQL database management
  - Successfully connected to local MySQL instance
  - Created `nextapp` database through SQL commands
  - Verified table creation and schema structure
- **DataGrip**: Professional database IDE by JetBrains
  - Downloaded for enhanced database development experience
  - Provides advanced SQL editing and debugging capabilities
  - Better integration with development workflow

**Key learning points:**

- Migrations track database schema changes over time
- `migrate dev` creates formal migration files for version control
- `db push` is faster for development but doesn't create migration history
- Multiple database tools can be used simultaneously for different purposes
- MySQL Workbench is great for visual database management
- DataGrip offers more powerful development features

**Current Database Schema:**

```sql
-- User table with registered_at field
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `registered_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Next Steps

- Continue with Prisma Client generation and usage
- Implement CRUD operations in Next.js API routes
- Explore advanced Prisma features (relations, querying)
- Set up proper development vs production database environments

## 12. Creating a Prisma Client

- After creating our migrations, we need to create a Prisma client to interact with our database from our Next.js application.

- We create a `prisma/client.ts` file to centralize our Prisma client instance and ensure we follow Next.js best practices.

**Next.js Optimized Client Pattern:**

```typescript
// prisma/client.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

**Key Benefits:**

- **Singleton Pattern**: Ensures only one PrismaClient instance exists
- **Fast Refresh Support**: Prevents multiple client instances during Next.js development
- **Global Caching**: Uses global object to cache client across module reloads
- **Production Safety**: Only caches in development environment

**Why This Pattern:**

- Next.js Fast Refresh can cause modules to reload during development
- Without global caching, each reload would create a new PrismaClient instance
- Multiple instances can cause database connection issues and memory leaks
- This pattern follows official Prisma + Next.js documentation recommendations

## Getting Data

_From commits: Building API routes, User management endpoints_

Successfully implemented API routes for data retrieval using Prisma ORM:

### 13. **API Route Handlers**

Created RESTful API endpoints for user management:

- **`/api/users`** - GET all users from database
- **`/api/users/[id]`** - GET, PUT, DELETE individual users
- **URL Parameter Handling** - Updated type definitions from `{id: number}` to `{id: string}` since URL parameters are always strings
- **Prisma Integration** - Used `prisma.user.findUnique()` and `prisma.user.findMany()` for database queries
- **Error Handling** - Implemented proper 404 responses for non-existent users
- **Data Validation** - Integrated Zod schemas for request validation

### Key Implementation Details:

```typescript
// Type-safe parameter handling
{ params }: { params: { id: string } }

// Database queries with Prisma
const user = await prisma.user.findUnique({
  where: { id: params.id }
});

// Proper error responses
if (!user) {
  return NextResponse.json({ error: "User not found" }, { status: 404 });
}
```

---

## 🗄️ Database Integration

_From commits: Prisma setup, MySQL integration, Database schema design_

Successfully integrated MySQL database with Prisma ORM for persistent data storage and management.

### 14. **Database Fundamentals**

**Core Concepts:**

- **Databases** - Permanent data storage systems (MySQL, PostgreSQL, MongoDB)
- **Database Engines** - Software that manages database operations and storage
- **Migrations** - Version-controlled database schema changes
- **Models** - Entity definitions representing application domain objects
- **Object-Relational Mapper (ORM)** - Tool mapping database records to application objects

**Why Prisma:**

- Most widely-used ORM for Next.js and Node.js applications
- Type-safe database operations with TypeScript
- Automatic migration generation and management
- Excellent developer experience with Prisma Studio

### 15. **Prisma Setup & Configuration**

**Key Commands:**

```bash
# Initialize Prisma in project
npx prisma init

# Format schema file
npx prisma format

# Generate and apply migrations
npx prisma migrate dev
```

**Database Connection:**

- Configured MySQL 9.4.0 with MySQL Workbench
- Environment variables for secure connection strings
- Connection string format: `mysql://user:password@localhost:3306/database`

### 16. **Data Models & Schema Design**

**User Model Implementation:**

```prisma
model User {
  id           Int      @id @default(autoincrement())
  email        String   @unique
  name         String
  followers    Int      @default(0)
  isActive     Boolean  @default(true)
  registeredAt DateTime @default(now())
}
```

**Product Model Implementation:**

```prisma
model Product {
  id    Int    @id @default(autoincrement())
  name  String
  price Float
}
```

### 17. **Prisma Client Operations**

**Core Database Operations:**

```typescript
// Query all records
await prisma.user.findMany();

// Find specific record
await prisma.user.findUnique({ where: { email: "user@example.com" } });

// Create new record
await prisma.user.create({ data: { name: "John", email: "john@example.com" } });

// Update existing record
await prisma.user.update({
  where: { email: "user@example.com" },
  data: { email: "new@example.com" },
});
```

**Client Optimization for Next.js:**

- Global singleton pattern prevents multiple client instances
- Fast Refresh compatibility with development hot reloading
- Connection pooling for production performance

### 18. **API Integration & Data Validation**

**Complete CRUD Implementation:**

- **GET `/api/users`** - Retrieve all users with `prisma.user.findMany()`
- **POST `/api/users`** - Create users with validation and `prisma.user.create()`
- **GET `/api/users/[id]`** - Get individual user with `prisma.user.findUnique()`
- **PUT `/api/users/[id]`** - Update user data with proper validation
- **DELETE `/api/users/[id]`** - Remove users from database

**Data Security & Validation:**

- Zod schema validation for all incoming requests
- Selective data mapping to prevent malicious property injection
- Proper HTTP status codes (200, 201, 400, 404)
- Type-safe URL parameter handling with string conversion

### Key Achievements:

✅ **Database Setup** - MySQL server with Prisma ORM integration  
✅ **Schema Design** - User and Product models with proper relationships  
✅ **Migration Management** - Version-controlled database changes  
✅ **Type Safety** - Full TypeScript integration with auto-generated types  
✅ **API Security** - Request validation and error handling  
✅ **Production Ready** - Optimized client configuration and connection management

## Uploading Files

- In this section we will be learning how to allow users to upload files to our Next.js application.

### 1. Choosing a Cloud Platform

- Amazon S3
- Google Cloud
- Microsoft Azure

This one that we're going to us is:

- **Cloudinary** - Because it has perfect integration with Next.js and it has a free tier that allows us to get started without any cost.

### 2. Setting Up Cloudinary

1. Create a Cloudinary account at [cloudinary.com](https://cloudinary.com/)
2. `npm i next-cloudinary` to install the Next.js Cloudinary SDK
3. Go to google and search `next cloudinary`
4. Follow the instructions to set up your Cloudinary account and get your cloud name, API key, and API secret.

### 3. Uploading Files to Cloudinary

1. Go to the upload tab in settings
2. Enable unsigned uploads because it's easier to get started with
3. Leave the folder name blank for now
