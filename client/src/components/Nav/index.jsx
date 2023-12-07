import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import logo from "../../../public/images/GameGoText.png";
import cartIcon from "../../assets/icons/cartIcon.png";
import login from "../../assets/icons/login.png";
import logout from "../../assets/icons/logoutIcon.png";

function Nav() {
  const [state] = useStoreContext();
  const { cart } = state;

  // Calculate total items in the cart
  const totalItems = cart.reduce(
    (total, item) => total + item.purchaseQuantity,
    0
  );

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li
            className="mx-1"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Link to="/orderHistory">Order History</Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a
              href="/"
              onClick={() => Auth.logout()}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <img
                src={logout}
                style={{ width: "27px", height: "auto", marginBottom: "4px" }}
              ></img>
              <div
                style={{
                  fontSize: "14px",
                  lineHeight: "1",
                }}
              >
                Logout
              </div>
            </a>
          </li>
          <li className="mx-1" style={{ position: "relative" }}>
            <Link
              to="/cart"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <img
                src={cartIcon}
                style={{ width: "30px", height: "auto" }}
              ></img>
              <div
                style={{
                  fontSize: "14px",
                  lineHeight: "1",
                }}
              >
                Cart
                {totalItems > 0 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "15px",
                      height: "15px",
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "50%",
                      fontSize: "12px",
                      position: "absolute",
                      top: "-5px",
                      right: "-5px",
                    }}
                  >
                    {totalItems}
                  </div>
                )}
              </div>
            </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link
                to="/login"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <img
                  src={login}
                  style={{ width: "30px", height: "auto" }}
                ></img>
                <div
                  style={{
                    fontSize: "14px",
                    lineHeight: "1",
                  }}
                >
                  Login
                </div>
              </Link>
            </div>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          <img
            src={logo}
            alt="GameGo Logo"
            style={{ width: "150px", height: "auto" }}
          ></img>
        </Link>
      </h1>

      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Nav;
