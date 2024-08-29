import { Link } from "react-router-dom";
import Logo from "../common/Icons/Logo";
import HomeIcon from "../common/Icons/HomeIcon";
import EditMenu from "../common/Icons/EditMenu";
import OrderHistory from "../common/Icons/OrderHistory";
import Button from "../common/Button";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";
function Header() {
  const status = useSelector((state) => state.admin.status);
  return (
    <div className="bg-red-400 flex px-2 lg:px-28 xl:px-56 items-center justify-center">
      <div>
        <Logo className="h-10" />
      </div>
      <nav className="ml-auto">
        <ul className="flex items-center lg:gap-1">
          <li>
            <Button>
              <Link to="/admin">
                <HomeIcon className="h-10" />
              </Link>
            </Button>
          </li>
          <li>
            <Button>
              <Link to="/admin/edit-menu">
                <EditMenu className="h-10 w-10" />
              </Link>
            </Button>
          </li>
          <li>
            <Button>
              <Link to="/admin/all-orders">
                <OrderHistory className="h-10 w-10" />
              </Link>
            </Button>
          </li>
          {status && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
export default Header;
