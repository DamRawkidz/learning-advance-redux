import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = fetch(
        "https://react-8a5db-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
      );

      if (!(await response).ok) {
        throw new Error("could not  featch cart Data");
      }
      const data = (await response).json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.showNotication({
          state: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotication({
        state: "success",
        title: "Success!",
        message: "Sent cart data successfully!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-8a5db-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotication({
          state: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotication({
          state: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
