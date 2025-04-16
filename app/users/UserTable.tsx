// import [sort] from "fast-sort"
import { sort } from "fast-sort";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  email: string;
}

// define an interface for the UserTable component
interface Props {
  sortOrder: string;
}
// add the sortOrder prop to the UserTable component
const UserTable = async ({ sortOrder }: Props) => {
  // give the [data url] to the {fetch} function. await it and put it in a [res] variable
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });
  // cache: "no store" for when you have fast changing data
  // to keep data fresh for a certain amount of time you set next: { revalidate: 10 } which means it get infoomation every 10 seconds
  // this caching behavior is only acessible in the {fetch} function

  // use the [res] {json} method to convert the response to JSON and put it in a [users] variable.
  const users: User[] = await res.json();

  // pass tenary operator [sortOrder === 'email' ? user => user.email : user => user.name] to the {asc} method after you pass the [users] array to the {sort} function and put this in a [sortedUsers] variable
  const sortedUsers = sort(users).asc(
    sortOrder === "email" ? (user) => user.email : (user) => user.name
  );

  // add the ability to sort the list by name or email
  // so when we click on the name, we should see sortOrder in the query string and the table should be sorted by name
  // look up "fast sort npm" (https://www.npmjs.com/package/fast-sort) and install it
  // we need to access query string parameters, and we can not do that in our components so anytime we need to access URL parameters we need to do it in the page.tsx file and pass it down to the component
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          {/* switch name and email to a link component cause this gives us client-side navigation */}
          {/* with this approach we are doing everything on the server */}
          {/* we are not using any client-side javascript */}
          {/* this is a way to pass state on the server */}
          <th>
            <Link href="/users?sortOrder=name">Name</Link>
          </th>
          <th>
            <Link href="/users?sortOrder=email">Email</Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((user) => (
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
