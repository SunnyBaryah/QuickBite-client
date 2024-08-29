import { useSelector } from "react-redux";
import CounterButton from "../components/common/CounterButton.jsx";
import Button from "../components/common/Button.jsx";
import { useState } from "react";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";
import orderService from "../services/orders.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { clearItems } from "../store/orderSlice.js";
import EmptyCart from "../components/common/Icons/EmptyCart.jsx";
import Clock from "../components/common/Icons/Clock.jsx";
import FilledCart from "../components/common/Icons/FilledCart.jsx";
function Cart() {
  const dispatch = useDispatch();
  const [popUp, setPopUp] = useState(false);
  const [payLink, setPayLink] = useState("");
  const items = useSelector((state) => state.order.orderData);
  const selectedItems = items.filter((item) => item.quantity > 0);
  async function saveOrderInfo(receivedItems) {
    const response = await orderService.saveOrder(receivedItems);
    if (response.statusCode === 200) {
      setPayLink(response.data.paymentLink);
      dispatch(clearItems());
    } else {
      toast.error("Error while saving the order", {
        position: "bottom-right",
      });
    }
  }
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2">
      {selectedItems.length > 0 && (
        <div className="col-start-1 col-end-2 grid place-items-center content-center">
          <FilledCart className="h-60 lg:h-72" />
          <h1 className="font-semibold text-4xl text-white mt-3">
            Selected Items
          </h1>
        </div>
      )}
      <div className="col-start-2 col-end-3 flex flex-col gap-5 items-center justify-start mt-10">
        {selectedItems.length > 0 &&
          selectedItems.map((item) => (
            <div key={item._id} className="w-3/4 bg-white mt-5 rounded-md flex">
              <img
                src={item.image}
                className="w-20 xl:w-72 rounded-tl-md rounded-bl-md object-cover object-center"
              />
              <div className="w-full">
                <div className="px-1 lg:px-8 my-2 text-gray-500 text-xs lg:text-sm flex items-center justify-between">
                  <p>{item.canteen}</p>
                  <p>|</p>
                  <div className="flex items-center">
                    <div className="pr-1">
                      <Clock className="h-4 w-4 lg:h-5 lg:w-5" />
                    </div>
                    <p>{item.time}</p>
                  </div>
                </div>
                <h1 className="text-3xl font-semibold text-black lg:pt-1 pl-1 lg:pl-8">
                  {item.title}
                </h1>
                <h2 className="text-gray-500 pt-1 pl-2 lg:pl-8">
                  {item.description}
                </h2>
                <div className="flex justify-between items-center px-2 py-2 xl:py-0 lg:px-8 mt-2">
                  <h2 className="text-gray-400 text-lg pt-1">₹{item.price}</h2>
                  <div className="h-50 flex justify-center">
                    <CounterButton id={item._id} quantity={0} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        {selectedItems.length > 0 && (
          <Button
            className="bg-red-400 text-white w-3/4 mb-3 lg:mb-0"
            onClick={() => {
              setPopUp(true);
              saveOrderInfo({ order: selectedItems });
            }}
          >
            Proceed to Checkout
          </Button>
        )}
        {popUp && (
          <div className="backdrop-blur duration-200 fixed top-0 left-0 w-full h-full rounded-xl flex justify-center items-center">
            <div className="w-3/4 lg:w-1/2 h-1/2 lg:h-3/4 bg-white shadow-md rounded-md flex flex-col items-center gap-2 lg:gap-14">
              <h1 className="text-xl lg:text-3xl font-semibold text-center py-2 xl:py-8">
                Please pay to confirm your order
              </h1>
              {payLink.length > 0 && (
                <QRCode className="h-1/2 w-1/2" value={payLink} />
              )}
              <div className="flex gap-6 pt-5 my-2 xl:my-0 w-full items-center justify-center">
                <Link to="/orders">
                  <Button className="ml-2 lg:ml-0 bg-red-400 text-white">
                    Go to your orders
                  </Button>
                </Link>
                <Link to="/">
                  <Button className="mr-2 lg:mr-0 bg-red-400 text-white">
                    Copy Payment URL
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      {selectedItems.length == 0 && (
        <div className="-col-start-3 col-span-3 flex flex-col gap-5 items-center justify-center mt-52 font-semibold text-3xl xl:text-4xl text-white">
          <div>
            <EmptyCart className="h-36 lg:h-56 xl:h-72" />
          </div>
          <h1>Cart is Empty!</h1>
        </div>
      )}
    </div>
  );
}
export default Cart;
