import orderSlice from "../../store/orderSlice";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import Clock from "./Icons/Clock";
function FeaturedSection({ className }) {
  const items = useSelector((state) => state.order.orderData);
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const delay = 2500;
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === items.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className={`${className} overflow-hidden mt-10`}>
      <div
        className="slideshowSlider whitespace-nowrap duration-700 "
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {items.map((item, index) => (
          <div className="h-96 w-full inline-block" key={index}>
            <img
              className="h-full w-full object-cover opacity-50 absolute rounded-lg"
              src={item.image}
            />
            <div className="flex flex-col p-10 gap-3 relative z-0">
              <h1 className="text-white text-3xl font-semibold mt-auto">
                {item.title}
              </h1>
              <div className="flex text-white gap-3">
                <h2 className="text-white">₹{item.price}</h2>
                <h2 className="text-white">|</h2>
                <div className="flex gap-2 items-center">
                  <Clock className="h-6 w-6 fill-white" />
                  <h2>{item.time}</h2>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default FeaturedSection;
