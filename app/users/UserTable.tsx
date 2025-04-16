interface User {
  id: number;
  name: string;
  email: string;
}

const UserTable = async () => {
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
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
