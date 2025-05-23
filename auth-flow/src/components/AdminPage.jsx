import React from "react";
import UserList from "./UserList";
import { Link } from "react-router-dom";

const AdminPage = () => {
  return (
    <>
      <div>AdminPage</div>
      <div>
        <UserList />
      </div>
      <Link to="/">Home</Link>
    </>
  );
};

export default AdminPage;
