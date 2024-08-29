import { Link } from "react-router-dom";
import MenuImage from "../../assets/menu-img2-compressed.jpg";
import OrderHistoryImg from "../../assets/order-history-compressed.jpg";
import orderService from "../../services/orders.js";
import { useState, useEffect } from "react";
import Button from "../../components/common/Button.jsx";
function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    async function fetchAllOrders() {
      const response = await orderService.getAllOrders();
      // console.log(response);
      if (response.statusCode === 200) {
        const specificOrders = response.data.filter(
          (order) => order.status === "unverified"
        );
        setOrders(specificOrders);
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
    <div className="mx-3 lg:w-4/5 xl:w-3/4 bg-white rounded-lg flex flex-col xl:flex-row my-4 lg:mx-auto gap-4 p-4 ">
      <div className="w-full xl:w-1/2 rounded-lg bg-gray-300 shadow-md xl:max-h-[790px]">
        {loader ? (
          <div className="text-gray-700 text-4xl text-center p-10">
            Loading...
          </div>
        ) : (
          <div className="bg-white mx-4 my-4 rounded-lg flex flex-col justify-center gap-3 lg:gap-5 py-5 shadow-md xl:justify-normal xl:h-[96%] xl:overflow-y-scroll xl:scroll-pt-4">
            {orders.length > 0 ? (
              orders.map((selectedOrder) => {
                {
                  /* console.log(selectedOrder); */
                }
                return (
                  <div
                    key={selectedOrder._id}
                    className=" shadow-sm flex flex-col gap-2 lg:gap-3 bg-gray-300 rounded-lg p-2 lg:p-4 mx-2 lg:mx-4"
                  >
                    <div className="flex flex-col items-start gap-2 lg:gap-0 lg:flex-row lg:justify-between lg:items-center">
                      <h1 className="font-semibold text-base lg:text-xl">
                        User ID: {selectedOrder.userId} | OTP:{" "}
                        {selectedOrder.otp}
                      </h1>
                      <p
                        className={`${
                          selectedOrder.status === "unverified" && "bg-black"
                        } ${
                          selectedOrder.status === "Done" && "bg-green-500"
                        } ${
                          selectedOrder.status === "Cancelled" && "bg-red-500"
                        } text-white text-sm rounded-2xl px-3 py-2`}
                      >
                        {selectedOrder.status}
                      </p>
                    </div>
                    <div>
                      {selectedOrder.order.map((product) => (
                        <div
                          key={product.item}
                          className="flex justify-between items-center px-4 text-sm lg:text-base text-gray-500"
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
                          className=" w-1/2 bg-green-500 text-white"
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
              })
            ) : (
              <div className="text-center font-semibold">No orders</div>
            )}
          </div>
        )}
      </div>
      <div className="h-32 xl:h-full xl:w-1/2 flex flex-col gap-4">
        <Link
          to="/admin/edit-menu"
          className="h-96 relative bg-black rounded-xl overflow-clip grid place-content-center group shadow-md"
        >
          <img
            src={MenuImage}
            className="absolute opacity-50 group-hover:scale-105 duration-300"
          />
          <h1 className="text-2xl md:text-4xl font-bold text-white z-10">
            Edit Menu
          </h1>
        </Link>
        <Link
          to="/admin/all-orders"
          className="h-96 relative bg-black rounded-xl overflow-clip grid place-content-center group shadow-md"
        >
          <img
            src={OrderHistoryImg}
            className="absolute opacity-50 group-hover:scale-105 duration-300"
          />
          <h1 className="text-2xl md:text-4xl font-bold text-white z-10">
            View Order History
          </h1>
        </Link>
      </div>
    </div>
  );
}
export default Dashboard;
