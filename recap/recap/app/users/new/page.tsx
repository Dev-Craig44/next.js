"use client";
// this is part of our old pages router
// import { useRouter } from "next/router";

// make sure you import from next/navigation
import { useRouter } from "next/navigation";

const NewUserPage = () => {
  // this is how we get access to the router object
  const router = useRouter();

  return (
    <div>
      {/* to handle the click of this button we are going to have to turn this into a client component because we can not handle broswer events in a server component */}
      <button
        className="btn btn-primary"
        onClick={
          // in this function we cannot use the link component, this is where we need programmatic navigation
          // pass the users path into the {push} function on the router object
          () => router.push("/users")
        }
      >
        Create
      </button>
    </div>
  );
};

export default NewUserPage;
