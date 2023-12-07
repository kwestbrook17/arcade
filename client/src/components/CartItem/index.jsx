import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {
  const [, dispatch] = useStoreContext();

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise("cart", "delete", { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === "0") {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });
      idbPromise("cart", "delete", { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value),
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <div
      className="flex-row"
      style={{
        display: "flex", // Ensure this is a flex container
        justifyContent: "space-between", // Pushes items to start and end of container
        background: "white",
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        padding: "1rem",
        marginBottom: "4px",
      }}
    >
      <div style={{ display: "flex" }}>
        <div
          style={{
            paddingRight: "1rem",
          }}
        >
          <img
            src={`/images/${item.image}`}
            alt={item.name} // Alt text for accessibility
            style={{
              height: "150px",
              width: "auto",
            }}
          />
        </div>
        <div>
          <div>
            {item.name}, ${item.price}
          </div>
          <div>
            <span>Qty:</span>
            <select value={item.purchaseQuantity} onChange={onChange}>
              {[...Array(5).keys()].map((num) => (
                <option key={num} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
            <span
              role="img"
              aria-label="trash"
              onClick={() => removeFromCart(item)}
            >
              🗑️
            </span>
          </div>
        </div>
      </div>
      <div>
        <strong>
          Total: ${(item.price * item.purchaseQuantity).toFixed(2)}
        </strong>
      </div>
    </div>
  );
};

export default CartItem;
