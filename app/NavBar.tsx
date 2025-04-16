import Link from "next/link";

const NavBar = () => {
  return (
    <div className="flex bg-slate-900 p-5 ">
      {/* this is usually where they put the Logo */}
      <Link href="/" className="mr-5">
        Next.js
      </Link>
      <Link href="/users">Users</Link>
    </div>
  );
};

export default NavBar;
