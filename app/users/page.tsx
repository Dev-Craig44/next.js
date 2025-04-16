// define an interface for the User object

import UserTable from "./UserTable";

const UsersPage = async () => {
  return (
    <>
      <h1>Users</h1>
      {/* change ul to a table */}
      {/* i did not put the UserTable in a general components folder because this component is only being used here*/}
      <UserTable />
    </>
  );
};

export default UsersPage;

// as our application grows perhaps this page is going to get overly complex
// then we might want to exract this table and put it in a separate component like usersTable.tsx
