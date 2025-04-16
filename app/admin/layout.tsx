import { ReactNode } from "react";

// a layout component should have children of type react node.
interface Props {
  children: ReactNode;
}

// destructe it right away
const AdminLayout = ({ children }: Props) => {
  {
    /* possible sidebar for admin */
  }
  return (
    // [flex] defaults to rows
    <div className="flex">
      <aside className="bg-slate-200 p-5 mr-5">Admin Sidebar</aside>
      <div> {children} </div>
    </div>
  );
};

export default AdminLayout;
