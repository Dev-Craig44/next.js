// define an interface for the User object
// on this page we can access our query string parameters
import Link from "next/link";
import UserTable from "./UserTable";

interface Props {
  searchParams: {
    sortOrder: string;
  };
}

const UsersPage = async ({ searchParams: { sortOrder } }: Props) => {
  return (
    <>
      <h1>Users</h1>
      {/* change ul to a table */}
      {/* i did not put the UserTable in a general components folder because this component is only being used here*/}
      {/* we can pass the sortOrder to the UserTable component */}
      {/* add link above table */}
      <Link href="/users/new" className="btn btn-primary">
        New User
      </Link>
      <UserTable sortOrder={sortOrder} />
    </>
  );
};

export default UsersPage;

// as our application grows perhaps this page is going to get overly complex
// then we might want to exract this table and put it in a separate component like usersTable.tsx
