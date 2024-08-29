import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../common/Button";
import LogoutBtn from "./LogoutBtn";
import OrderHistory from "../common/Icons/OrderHistory";
import { Link } from "react-router-dom";
import Logo from "../common/Icons/Logo";
import CartIcon from "../common/Icons/CartIcon.jsx";
function Header() {
  const navigate = useNavigate();
  const status = useSelector((state) => state.auth.status);
  const navItems = [
    {
      name: "Login",
      slug: "/login",
      class: "border text-white",
      active: !status,
    },
    {
      name: "Sign up",
      slug: "/sign-up",
      class: "bg-white text-red-400",
      active: !status,
    },
  ];

  return (
    <div className="bg-red-400 flex px-2 lg:px-56 items-center justify-center ">
      <div className=" hover:cursor-pointer" onClick={() => navigate("/")}>
        <Logo className="h-10" />
      </div>
      <nav className="ml-auto">
        <ul className="flex items-center gap-2 lg:gap-4">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name} onClick={() => navigate(item.slug)}>
                <Button className={`${item.class}`}>{item.name}</Button>
              </li>
            ) : null
          )}
          {status && (
            <Link to="/orders">
              <OrderHistory className="h-10" />
            </Link>
          )}
          <li onClick={() => navigate("/cart")}>
            <Button>
              <CartIcon className="h-10 w-10" />
            </Button>
          </li>

          {status && <LogoutBtn />}
        </ul>
      </nav>
    </div>
  );
}
export default Header;
