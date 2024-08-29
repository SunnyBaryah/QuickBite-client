import Input from "../../components/common/Input.jsx";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import adminService from "../../services/admin.js";
import { login as authLogin } from "../../store/adminSlice.js";
import Button from "../../components/common/Button.jsx";
import { useNavigate } from "react-router-dom";
function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { handleSubmit, register } = useForm();
  const login = async (data) => {
    setError("");
    try {
      const session = await adminService.login(data);
      if (session) {
        const adminData = await adminService.getCurrentAdmin();
        if (adminData) dispatch(authLogin(adminData));
        navigate("/admin");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-full my-44 gap-5 lg:gap-8">
      <div
        className={`mx-3 lg:mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your admin account
        </h2>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email: "
              type="email"
              {...register("email", {
                required: true,
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="bg-gray-600 text-white w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
      <Button
        onClick={() => navigate("/")}
        className="w-3/6 lg:w-2/6 xl:w-1/6 bg-red-400 text-white"
      >
        Home Page
      </Button>
    </div>
  );
}
export default SignIn;
