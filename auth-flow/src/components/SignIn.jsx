import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/signUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import api from "../api/auth";
import Loading from "./Loading";
import useAuthCxt from "../hooks/useAuthCxt";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuthCxt();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const data = new URLSearchParams();
    data.append("username", email);
    data.append("password", password);

    api
      .post("/", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      })
      .then((response) => {
        setIsLoading(false);
        setAuth(response.data);
        setError("");
        navigate(from, {replace: true});
      })
      .catch((error) => {
        setIsLoading(false);
        if (!error.response) {
          setError({
            status: 503,
            message: "Server might be temporarily unavailable.",
          });
        } else {
          setError({
            status: error.response.status,
            message: typeof error.response.data.detail === "string"
              ? error.response.data.detail
                : error.message,
          });
        }
      });
  }

  return !isLoading ? (
    <section className="sign-up">
      <h1>Login</h1>
      {error ? (
        <div className="error">{`${error.status}: ${error.message}`}</div>
      ) : (
        ""
      )}
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            autoComplete="off"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            placeholder="john_doe123@example.com"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <div className="password">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              className="show-password-icon"
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>
        <button
          style={
            email && password
              ? { cursor: "pointer" }
              : { cursor: "not-allowed" }
          }
          disabled={email && password ? false : true}
        >
          Sign In
        </button>
      </form>
      <p>
        Don't have an account? Register <Link to="/sign-up">here</Link>
      </p>
    </section>
  ) : (
    <Loading />
  );
};

export default SignIn;
