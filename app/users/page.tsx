// define an interface for the User object
interface User {
  id: number;
  name: string;
  email: string;
}

const UsersPage = async () => {
  // give the [data url] to the {fetch} function. await it and put it in a [res] variable
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });
  // cache: "no store" for when you have fast changing data
  // to keep data fresh for a certain amount of time you set next: { revalidate: 10 } which means it get infoomation every 10 seconds
  // this caching behavior is only acessible in the {fetch} function

  // use the [res] {json} method to convert the response to JSON and put it in a [users] variable.
  const users: User[] = await res.json();

  return (
    <>
      <h1>Users</h1>
      <p>{new Date().toLocaleTimeString()}</p>
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
