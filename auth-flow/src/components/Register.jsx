import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import api from "../api/user";
import Loading from "./Loading";

const Register = () => {
  const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_-]{3,14}$/;
  const PWD_REGEX =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%&])[A-Za-z\d!@#$%&]{8,23}$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [username, setUsername] = useState("");
  const [validateUsername, setValidateUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(true);

  const [email, setEmail] = useState("");
  const [validateEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [confirmPassword, setconfirmPassword] = useState("");
  const [isMatch, setIsMatched] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setValidateUsername(USERNAME_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidatePassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setIsMatched(confirmPassword === password);
  }, [confirmPassword, password]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const data = { username, email, password };
    api
      .post("/", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        setIsLoading(false);
        setError("");
        navigate("/");
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
            message: error.response.data.detail,
          });
        }
      });
  }

  return !isLoading ? (
    <section className="sign-up">
      <h1>Sign Up</h1>
      {error ? (
        <div className="error">{`${error.status}: ${error.message}`}</div>
      ) : (
        ""
      )}
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            placeholder="john_doe123"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            autoFocus
            autoComplete="off"
            onFocus={() => setUsernameFocus(true)}
            onBlur={() => setUsernameFocus(false)}
          />
          {!validateUsername && usernameFocus ? (
            <ul className="field-hint">
              <li>Character length should be between 4 and 15</li>
              <li>
                Special characters permitted: underscore (_) and hyphen (-)
              </li>
            </ul>
          ) : (
            ""
          )}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            autoComplete="off"
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
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <FontAwesomeIcon
              className="show-password-icon"
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          {!validatePassword && passwordFocus ? (
            <ul className="field-hint">
              <li>Password characters must be in the range 8 - 23.</li>
              <li>Must contain at least one lowercase letter.</li>
              <li>Must contain at least one uppercase letter.</li>
              <li>Must contain at least one digit.</li>
              <li>Must contain at least one special character (!@#$%&).</li>
            </ul>
          ) : (
            ""
          )}
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <div className="password">
            <input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              required
              onFocus={() => setConfirmPasswordFocus(true)}
              onBlur={() => setConfirmPasswordFocus(false)}
            />
            <FontAwesomeIcon
              className="show-password-icon"
              icon={showConfirmPassword ? faEyeSlash : faEye}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>
          {!isMatch && confirmPasswordFocus ? (
            <ul className="field-hint">
              <li>Passwords mismatch!</li>
            </ul>
          ) : (
            ""
          )}
        </div>
        <button
          style={
            validatePassword && validateUsername && email && isMatch
              ? { cursor: "pointer" }
              : { cursor: "not-allowed" }
          }
          disabled={
            validatePassword && validateUsername && email && isMatch
              ? false
              : true
          }
        >
          Sign up
        </button>
      </form>
      <p>
        Already have an account? Sign in <Link to="/sign-in">here</Link>
      </p>
    </section>
  ) : (
    <Loading />
  );
};

export default Register;
