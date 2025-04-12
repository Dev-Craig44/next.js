// define an interface for the User object
interface User {
  id: number;
  name: string;
  email: string;
}

const UsersPage = async () => {
  // give the [data url] to the {fetch} function. await it and put it in a [res] variable
  const res = await fetch("https://jsonplaceholder.typicode.com/users");

  // use the [res] {json} method to convert the response to JSON and put it in a [users] variable.
  const users: User[] = await res.json();

  return (
    <>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <h2>{user.name}</h2>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UsersPage;
