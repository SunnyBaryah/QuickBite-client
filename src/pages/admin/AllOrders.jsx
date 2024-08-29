import { useEffect, useState } from "react";
import orderService from "../../services/orders";
import Button from "../../components/common/Button";
export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    async function fetchAllOrders() {
      const response = await orderService.getAllOrders();
      // console.log(response);
      if (response.statusCode === 200) {
        setOrders(response.data);
        setLoader(false);
      }
    }
    fetchAllOrders();
  }, []);
  async function updateOrderInfo(order, status) {
    const response = await orderService.updateOrder(order);
    if (response.status === 200) {
      orders.map((selectedOrder) => {
        if (selectedOrder._id === order._id) {
          order = { ...order, status };
        }
      });
    }
  }
  return (
    <>
      {loader ? (
        <div className="text-white text-4xl text-center p-10">Loading...</div>
      ) : (
        <div className="h-full bg-white mx-3 lg:mx-32 xl:mx-56 my-10 rounded-lg flex flex-col gap-5 p-5">
          {orders.length > 0 &&
            orders.map((selectedOrder) => {
              {
                /* console.log(selectedOrder); */
              }
              return (
                <div
                  key={selectedOrder._id}
                  className="shadow-sm flex flex-col gap-3 bg-gray-300 rounded-lg p-4"
                >
                  <div className="flex flex-col lg:flex-row gap-2 lg:gap-0 justify-between items-start lg:items-center">
                    <h1 className="font-semibold text-base lg:text-xl">
                      User ID: {selectedOrder.userId} | OTP: {selectedOrder.otp}
                    </h1>
                    <p
                      className={`${
                        selectedOrder.status === "unverified" && "bg-black"
                      } ${selectedOrder.status === "Done" && "bg-green-500"} ${
                        selectedOrder.status === "Cancelled" && "bg-red-500"
                      } text-white text-xs lg:text-sm rounded-2xl px-3 py-2`}
                    >
                      {selectedOrder.status}
                    </p>
                  </div>
                  <div>
                    {selectedOrder.order.map((product) => (
                      <div
                        key={product.item}
                        className="flex justify-between items-center px-4 text-gray-500 text-sm lg:text-base"
                      >
                        <div>{product.item}</div>
                        <div>
                          {product.quantity} X ₹{product.price}
                        </div>
                      </div>
                    ))}
                  </div>
                  {selectedOrder.status === "unverified" && (
                    <div className="flex gap-4">
                      <Button
                        className="w-1/2 bg-green-500 text-white"
                        onClick={() =>
                          updateOrderInfo(
                            { id: selectedOrder._id, status: "Done" },
                            "Done"
                          )
                        }
                      >
                        Verify payment
                      </Button>
                      <Button
                        className="w-1/2 bg-red-500 text-white"
                        onClick={() =>
                          updateOrderInfo(
                            { id: selectedOrder._id, status: "Cancelled" },
                            "Cancelled"
                          )
                        }
                      >
                        Payment not received
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </>
  );
}
