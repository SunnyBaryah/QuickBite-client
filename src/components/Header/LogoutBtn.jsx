import authService from "../../services/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import Button from "../common/Button.jsx";
import { toast } from "react-toastify";
function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutFunction = async () => {
    try {
      const response = await authService.logout();
      if (response.status === 200) {
        dispatch(logout());
        navigate("/");
        toast.success("Logged out successfully", { position: "bottom-right" });
      }
    } catch (e) {
      console.log("Error while logout process : ", e);
    }
  };
  return (
    <Button className="bg-white text-red-400" onClick={logoutFunction}>
      Logout
    </Button>
  );
}
export default LogoutBtn;
