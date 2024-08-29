import { useEffect, useState } from "react";
import orderService from "../services/orders";
import NoOrders from "../components/common/Icons/NoOrders";
function Orders() {
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const response = await orderService.getOrder();
      console.log(response);
      if (response.statusCode === 200) {
        setOrders(response.data);
        setLoader(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {loader ? (
        <div className="text-white text-4xl text-center p-10">Loading...</div>
      ) : (
        <div className="flex flex-col gap-4 items-center pt-5 mb-4">
          {orders.length > 0 && (
            <h1 className="text-white text-4xl p-6">Order History</h1>
          )}
          {orders.length > 0 ? (
            orders.map((item) => {
              let totalamt = 0;
              let products = item.order;
              totalamt = products.reduce((acc, ele) => {
                acc += ele.price * ele.quantity;
                return acc;
              }, 0);
              return (
                <div className="bg-white w-6/7 mx-4 lg:mx-0 lg:w-1/3 py-2 flex flex-col gap-3 rounded-md">
                  <div className="flex justify-between items-center px-5 font-semibold gap-4 xl:gap-0">
                    <div className="xl:text-lg">
                      Otp : {item.otp} | Total Amount : ₹{totalamt}
                    </div>
                    <div
                      className={`${
                        item.status === "unverified" && "bg-black"
                      } ${item.status === "Done" && "bg-green-500"} ${
                        item.status === "Cancelled" && "bg-red-500"
                      } text-white text-sm rounded-xl px-2 py-1`}
                    >
                      {item.status}
                    </div>
                  </div>
                  <div className="flex flex-col px-5">
                    {products.map((product) => (
                      <div className="flex justify-between items-center px-5 text-sm lg:text-base text-gray-500">
                        <div>{product.item}</div>
                        <div>
                          {product.quantity} X ₹{product.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center gap-9 py-9">
              <NoOrders className="h-2/3 w-2/3" />
              <div className="text-white text-5xl">No orders</div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Orders;
