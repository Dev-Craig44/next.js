
## 📡 Building APIs in Next.js 15

### What You’ll Learn

- Getting objects
- Creating objects
- Updating objects
- Deleting objects
- Validating requests with Zod

---

### 🔁 Summary

- To build APIs, you create a `route.ts` file in a route directory. You cannot have both a `page.tsx` and `route.ts` in the same folder.
- Route files define **route handlers**—functions mapped to HTTP methods like `GET`, `POST`, `PUT`, `PATCH`, or `DELETE`.
- Use **POST** to create resources, **PUT/PATCH** to update, and **DELETE** to remove.
- Use **status codes** to clearly communicate the result:
  - `200 OK` – Success
  - `201 Created` – Resource was created
  - `400 Bad Request` – Validation or client-side issue
  - `404 Not Found` – Resource doesn't exist
  - `500 Internal Server Error` – Server-side issue
- You can test API endpoints using tools like **Postman**.

---

### 🧪 Data Validation with Zod

- Validating input from clients is **non-negotiable**. You can use plain `if` statements for simple structures...
- ...but for **robust, reusable validation**, use [Zod](https://zod.dev/).
- Zod lets you define a schema like:

```ts
const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});
```

- Then validate like:

```ts
const result = userSchema.safeParse(req.body);
if (!result.success) return NextResponse.json(result.error.errors, { status: 400 });
```

---

### 🧠 Concept Reinforcement

- Dynamic segments like `[id]` are used to map API logic to data.
- For CRUD actions, direct your request to the matching endpoint:
  - `GET /api/users` – list users
  - `POST /api/users` – create user
  - `GET /api/users/1` – fetch single user
  - `PUT /api/users/1` – update user
  - `DELETE /api/users/1` – delete user

---

## 🏁 Exercise

- Create `/api/products` that returns a list of objects like `{ id, name, price }`.

---

### 🚀 Final Commit

Use this alias for your last commit:

```bash
sum finished building-api section and updated README
```

Then merge and push:

```bash
mergeback building-api
git push
```
