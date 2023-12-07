import React from "react";
import { useStoreContext } from "../utils/GlobalState";
import CartItem from "../components/CartItem";
import Auth from "../utils/auth";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import { Link } from "react-router-dom";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const FullPageCart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  React.useEffect(() => {
    // Save the current background color
    const originalBackground = document.body.style.backgroundColor;

    // Change the background color when the component mounts
    document.body.style.backgroundColor = "#f2f4f7"; // replace with your desired color

    // Reset the background color when the component unmounts
    return () => {
      document.body.style.backgroundColor = originalBackground;
    };
  }, []);

  React.useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  const calculateTotal = () => {
    return state.cart
      .reduce((sum, item) => sum + item.price * item.purchaseQuantity, 0)
      .toFixed(2);
  };

  const submitCheckout = () => {
    getCheckout({
      variables: { products: state.cart },
    });
  };

  if (state.cart.length === 0) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <h3 style={{ fontWeight: "bold", textAlign: "center" }}>
            Your cart is empty!
          </h3>
          <Link
            to="/"
            style={{
              display: "inline-block",
              textAlign: "center",
              marginBottom: "1rem",
              color: "#c51111",
              textDecoration: "none",
            }}
          >
            ← Go Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="full-page-cart container">
        <div className="cart-container">
          <div
            id="cart"
            style={{
              flex: "2",
              marginTop: "2rem",
              padding: "2rem",
            }}
          >
            <h2
              style={{
                padding: "1rem",
                background: "var(--primary)",
                color: "white",
              }}
            >
              Shopping Cart
            </h2>
            {state.cart.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>
          <div className="order-summary">
            <h3
              style={{
                textAlign: "center",
                paddingBottom: "1rem",
              }}
            >
              Order Summary
            </h3>
            <div className="total">
              <strong>Estimated Total: ${calculateTotal()}</strong>
            </div>
            {Auth.loggedIn() ? (
              <button
                onClick={submitCheckout}
                style={{
                  width: "100%",
                  backgroundColor: "#c51111",
                  borderRadius: "4px",
                  color: "white",
                }}
              >
                Checkout
              </button>
            ) : (
              <span>(Log in to check out)</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPageCart;
