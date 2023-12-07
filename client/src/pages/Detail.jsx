import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { useStoreContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from "../utils/actions";
import { ADD_REVIEW } from "../utils/mutations";
import { QUERY_PRODUCTS, QUERY_REVIEWS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import spinner from "../assets/spinner.gif";

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();
  //form-post review

  const [reviewContent, setReviewContent] = useState("");
  const [addReview, { error }] = useMutation(ADD_REVIEW);

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise("products", "get").then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise("cart", "delete", { ...currentProduct });
  };
  const formhandler = async (event) => {
    event.preventDefault();
    console.log({ content: reviewContent, product_id: id });
    let review = { content: reviewContent, product_id: id };
    try {
      const { data } = await addReview({
        variables: {
          review,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      {currentProduct && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{" "}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentProduct._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <div className="imgreviews">
            <img
              src={`/images/${currentProduct.image}`}
              alt={currentProduct.name}
              style={{ height: "20px;", width: "300px" }}
            />
            <h4>Add a Review</h4>
            <form id="form" action="POST" onSubmit={formhandler}>
              <textarea
                name="reviewcontent"
                id="reviewbox"
                cols="90"
                onChange={(e) => setReviewContent(e.target.value)}
                rows="10"
              ></textarea>

              <button type="submit">Submit</button>
            </form>
          </div>
          <section className="reviewsection">
            <div>{}</div>
          </section>
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <section className="reviews" id="reviews"></section>
    </>
  );
}

export default Detail;
