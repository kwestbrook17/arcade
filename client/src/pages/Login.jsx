import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="responsive-container">
        <Link
          to="/signup"
          style={{
            display: "block",
            textAlign: "center",
            marginBottom: "1rem",
            color: "#c51111",
            textDecoration: "none",
          }}
        >
          ← Go to Signup
        </Link>

        <h2 style={{ textAlign: "center", color: "#333" }}>
          Welcome to GameGo
        </h2>
        <div
          style={{ textAlign: "center", color: "#333", marginBottom: "1rem" }}
        >
          Sign into your GameGo account
        </div>
        <form
          onSubmit={handleFormSubmit}
          style={{
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <input
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              placeholder="Email"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <input
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              placeholder="Password"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
            />
          </div>
          {error && (
            <div>
              <p
                style={{ color: "red", marginTop: "1rem", textAlign: "center" }}
              >
                The provided credentials are incorrect
              </p>
            </div>
          )}
          <div
            style={{
              display: "flex",
              width: "100%",
            }}
          >
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                backgroundColor: "#c51111",
                color: "white",
                width: "100%",
              }}
            >
              Sign In
            </button>
          </div>
          <div
            style={{
              display: "flex",
            }}
          ></div>
        </form>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            margin: "10px 0",
          }}
        >
          <div
            style={{ flexGrow: 1, height: "1px", backgroundColor: "#ccc" }}
          ></div>
          <span style={{ padding: "0 10px" }}>or</span>
          <div
            style={{ flexGrow: 1, height: "1px", backgroundColor: "#ccc" }}
          ></div>
        </div>

        <Link
          to="/signup"
          style={{
            display: "block",
            textAlign: "center",
            textDecoration: "none",
            border: "2px solid #111111",
            borderRadius: "4px",
            padding: "5px 10px",
          }}
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}

export default Login;
