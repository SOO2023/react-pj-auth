import Layout from "./components/Layout";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import "./styles/base.css";
import AdminPage from "./components/AdminPage";
import UserPage from "./components/UserPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/admin"
            element={<ProtectedRoute allowedRole={"admin"} />}
          >
            <Route index element={<AdminPage />} />
          </Route>
          <Route path="/user" element={<ProtectedRoute allowedRole={"user"} />}>
            <Route index element={<UserPage />} />
          </Route>
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
