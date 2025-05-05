//access route parameter

import { notFound } from "next/navigation";

// you can not add this prop to a component that is used on this page
// if on this page, we have a component that needs to know the user id, we have to grab the user id at the page level, and  then pass it as a prop to our component
interface Props {
  params: { id: number };
}
// destructure [params] from [Props]
// destructure [id] from [params]
const UserDetailPage = ({ params: { id } }: Props) => {
  // add not found page if user id is over 10
  // This [id] parameter only works with pages.tsx
  if (id > 10) notFound();
  return <div>UserDetailPage {id}</div>;
};

export default UserDetailPage;
