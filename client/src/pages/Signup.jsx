import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

function Signup(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
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
          to="/login"
          style={{
            display: "block",
            textAlign: "center",
            marginBottom: "1rem",
            color: "#c51111",
            textDecoration: "none",
          }}
        >
          ← Go to Login
        </Link>

        <h2 style={{ textAlign: "center", color: "#333" }}>Create Account</h2>
        <div
          style={{ textAlign: "center", color: "#333", marginBottom: "1rem" }}
        >
          Create your GameGo account and start shopping today!
        </div>
        <form
          onSubmit={handleFormSubmit}
          style={{
            width: "100%",
          }}
        >
          <div className="signup-input">
            <div
              className="flex-row space-between my-2"
              style={{ width: "100%" }}
            >
              <input
                placeholder="First"
                name="firstName"
                type="text"
                id="firstName"
                className="inputs"
                style={{ width: "100%" }}
                onChange={handleChange}
              />
            </div>
            <div
              className="flex-row space-between my-2"
              style={{ width: "100%" }}
            >
              <input
                placeholder="Last"
                name="lastName"
                type="text"
                id="lastName"
                className="inputs"
                style={{ width: "100%" }}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex-row space-between my-2">
            <input
              placeholder="Email"
              name="email"
              type="email"
              id="email"
              className="inputs"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <input
              placeholder="Password"
              name="password"
              type="password"
              id="pwd"
              className="inputs"
              onChange={handleChange}
            />
          </div>
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
              Submit
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
          to="/login"
          style={{
            display: "block",
            textAlign: "center",
            textDecoration: "none",
            border: "2px solid #111111",
            borderRadius: "4px",
            padding: "5px 10px",
          }}
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default Signup;
