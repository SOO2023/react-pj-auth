import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="layout-main">
      <Outlet />
    </main>
  );
};

export default Layout;
