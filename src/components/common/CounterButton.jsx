import { useDispatch } from "react-redux";
import { setItemQty } from "../../store/orderSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
function CounterButton({ id, quantity }) {
  const [count, setCount] = useState(0);
  const items = useSelector((state) => state.order.orderData);
  const item = items.find((e) => e._id === id);
  const dispatch = useDispatch();
  return (
    <div
      className={`${
        item.quantity == 0 ? "w-8" : "w-24"
      } outline outline-1 outline-gray-400 duration-200 h-8 relative rounded-full grid place-items-center`}
    >
      <div>
        <div
          className=" bg-gray-700 text-white cursor-pointer select-none absolute left-0 grid rounded-full w-8 h-8 place-items-center"
          onClick={() => {
            if (item.quantity >= 1)
              dispatch(setItemQty({ id, quantity: item.quantity - 1 }));
          }}
        >
          -
        </div>

        <div
          className={`${
            item.quantity == 0 ? "bg-red-400 " : "bg-gray-700"
          } text-white duration-100 cursor-pointer select-none absolute right-0 grid p-0 rounded-full w-8 h-8 place-items-center`}
          onClick={() =>
            dispatch(setItemQty({ id, quantity: item.quantity + 1 }))
          }
        >
          +
        </div>
      </div>
      {item.quantity}
    </div>
  );
}
export default CounterButton;
