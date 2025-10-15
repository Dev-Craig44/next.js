// ✅ we must use async and await because both params and searchParams are passed as promises in Next.js 15
import Link from "next/link";
import UserTable from "./UserTable";

// ✅ export the page component as an async function
export default async function UsersPage({
  // ✅ searchParams is a promise we must await
  searchParams,
}: {
  searchParams: Promise<{ sortOrder?: string }>;
}) {
  // ✅ await the promise to extract the actual value
  const { sortOrder } = await searchParams;

  return (
    <>
      <h1>Users</h1>
      {/* change ul to a table */}
      {/* i did not put the UserTable in a general components folder because this component is only being used here */}
      {/* we can pass the sortOrder to the UserTable component */}
      {/* add link above table */}
      <Link href="/users/new" className="btn btn-primary">
        New User
      </Link>

      {/* create suspense component to put the UserTable in  */}
      {/* <Suspense fallback={<p>Loading...</p>}> */}
      <UserTable sortOrder={sortOrder ?? "name"} />
      {/* </Suspense> */}
    </>
  );
}

// as our application grows perhaps this page is going to get overly complex
// then we might want to extract this table and put it in a separate component like usersTable.tsx
