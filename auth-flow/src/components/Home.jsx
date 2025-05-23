import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthCxt from "../hooks/useAuthCxt";

const Home = () => {
  const { auth } = useAuthCxt();
  const authLength = Object.entries(auth).length;

  return (
    <main>
      <div>Home</div>
      <br />
      {authLength > 0 ? (
        <div>{`Hi! Welcome ${auth?.user?.username} 👋🏽`}</div>
      ) : (
        ""
      )}
      <br />
      <div>
        <Link to="/admin">Admin Page</Link>
      </div>
      <div>
        <Link to="/user">User Page</Link>
      </div>
      <div>
        {authLength > 0 ? (
          <Link onClick={() => setAuth({})} to="/sign-in">
            Log Out
          </Link>
        ) : (
          <Link to="/sign-in">Login In</Link>
        )}
      </div>
      {authLength > 0 ? (
        ""
      ) : (
        <div>
          <Link to="/sign-up">Register</Link>
        </div>
      )}
    </main>
  );
};

export default Home;
