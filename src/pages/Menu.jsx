import { useEffect, useState } from "react";
import menuService from "../services/config.js";
import { toast } from "react-toastify";
import CounterButton from "../components/common/CounterButton.jsx";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setItems as setOrderItems } from "../store/orderSlice.js";
import FeaturedSection from "../components/common/FeaturedSection.jsx";
import Clock from "../components/common/Icons/Clock.jsx";
function Menu() {
  const [items, setItemss] = useState([]);
  const dispatch = useDispatch();
  const stateData = useSelector((state) => state.order.orderData);
  useEffect(() => {
    const fetchData = async () => {
      let data = undefined;
      if (stateData.length > 0) data = stateData;
      else {
        data = await menuService.getItems().then((data) => data);
        if (!data)
          toast.error("Error while fetching menu", {
            position: "bottom-right",
          });
        dispatch(setOrderItems(data));
      }
      setItemss(data);
    };
    fetchData();
  }, []);
  return (
    <>
      <h1 className="text-white text-center mt-6 text-4xl font-semibold lg:hidden">
        Menu
      </h1>
      <FeaturedSection className="hidden lg:block w-4/5  mx-auto rounded-lg" />
      <div className="flex flex-wrap gap-5 justify-center mb-4 w-4/5 mx-auto">
        {items &&
          items.map((item) => (
            <div
              key={item._id}
              className="h-80 bg-white mt-5 rounded-md flex flex-col items-center"
            >
              <img src={item.image} className="h-40 w-72 rounded-t-md" />
              <div className="w-full">
                <div className="px-2 my-2 text-gray-500 text-sm flex items-center justify-between">
                  <p>{item.canteen}</p>
                  <p>|</p>
                  <div className="flex items-center">
                    <div className="pr-1">
                      <Clock className="h-4 w-4" />
                    </div>
                    <p>{item.time}</p>
                  </div>
                </div>
                <h1 className="text-3xl font-semibold text-black pt-1 pl-2">
                  {item.title}
                </h1>
                <h2 className="text-gray-500 pt-1 pl-2">{item.description}</h2>
                <div className="flex justify-between items-center px-4 mt-2">
                  <h2 className="text-gray-400 text-lg pt-1">₹{item.price}</h2>
                  <div className="h-50 flex justify-center">
                    <CounterButton id={item._id} quantity={0} />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
export default Menu;
