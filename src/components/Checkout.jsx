import { useContext } from "react";
import useHttp from "../hooks/useHttp";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { currencyFormatter } from "../util/formatting";
import Error from "./Error";
import Button from "./UI/Button";
import Input from "./UI/Input";
import Modal from "./UI/Modal";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );
  const { data, isLoading, errorMessage, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );
  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleClearCart() {
    cartCtx.clearCart();
    userProgressCtx.hideCheckout();
    clearData();
  }
  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }
  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );
  if (isLoading) {
    actions = <span>Sending order data...</span>;
  }
  // console.log(data);
  if (data && !errorMessage) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleClearCart}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>Please check your email for more details.</p>
        <p className="modal-actions">
          <Button onClick={handleClearCart}>Okay</Button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="Email address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {errorMessage && (
          <Error title="Failed to submit the order!" message={errorMessage} />
        )}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
