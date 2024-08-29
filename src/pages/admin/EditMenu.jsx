import { useState, useEffect } from "react";
import Button from "../../components/common/Button.jsx";
import menuService from "../../services/config.js";
import { useForm } from "react-hook-form";
import Input from "../../components/common/Input.jsx";
import Cross from "../../components/common/Icons/Cross.jsx";
export default function EditMenu() {
  const { register, handleSubmit } = useForm();
  const [menu, setMenu] = useState([]);
  const [popUp, setPopUp] = useState(false);
  useEffect(() => {
    async function fetchMenuItems() {
      const response = await menuService.getItems();
      setMenu(response);
    }
    fetchMenuItems();
  }, [popUp]);
  async function create(data) {
    try {
      const response = await menuService.updateMenu(data);
      setPopUp(false);
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteMenu(data) {
    try {
      const response = await menuService.deleteMenu(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="bg-red-400 mx-2 lg:mx-40 xl:mx-72 my-10 p-3 lg:p-5 rounded-lg flex flex-col gap-4">
        <div className="bg-white flex justify-between items-center rounded-lg border shadow-lg border-gray-600 p-5">
          <h1 className="font-semibold text-3xl lg:text-4xl">Menu</h1>
          <Button
            className="bg-gray-600 text-white"
            onClick={() => setPopUp(true)}
          >
            Add Item
          </Button>
        </div>
        {menu.length > 0 &&
          menu.map((item) => (
            <div className="bg-white gap-3 lg:gap-0 flex justify-between items-center rounded-lg border shadow-lg border-gray-600 p-5">
              <h2 className="font-semibold text-base lg:text-xl">
                Item : {item.title} | Price : ₹{item.price}
              </h2>
              <Button
                className="bg-red-600 text-white"
                onClick={() => deleteMenu(item)}
              >
                Delete Item
              </Button>
            </div>
          ))}
      </div>
      {popUp && (
        <div className="backdrop-blur duration-200 fixed top-0 left-0 w-full h-full flex justify-center items-center shadow-lg bg-gray-600">
          <div className="w-5/6 lg:w-1/2 xl:w-1/4 bg-white shadow-md rounded-md flex flex-col items-start gap-2 px-4">
            <div className="w-full flex justify-between items-center">
              <h1 className="font-semibold text-3xl pl-2">Add Item</h1>
              <Button onClick={() => setPopUp(false)}>
                <Cross className="w-8 h-8" />
              </Button>
            </div>
            <form onSubmit={handleSubmit(create)} className="w-full">
              <Input
                label="Title: "
                placeholder="Enter title"
                {...register("title", {
                  required: true,
                })}
              />
              <Input
                label="Canteen: "
                placeholder="Enter canteen name"
                {...register("canteen", {
                  required: true,
                })}
              />
              <Input
                label="Price:"
                placeholder="Price excluding unit"
                {...register("price", {
                  required: true,
                })}
              />
              <Input
                label="Description:"
                placeholder="A short description"
                {...register("description", {
                  required: true,
                })}
              />
              <Input
                label="Time:"
                placeholder="Delivery Time (e.g., 2 minutes)"
                {...register("time", {
                  required: true,
                })}
              />
              <Input
                label="Image:"
                placeholder="Image URL"
                {...register("image", {
                  required: true,
                })}
              />
              <Button
                type="submit"
                className="my-4 w-full bg-red-400 text-white"
              >
                Add Item
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
