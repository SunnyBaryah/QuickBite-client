import chef from "../assets/Pizza maker-pana.png";
import Logo from "../components/common/Icons/Logo.jsx";
import adminImage from "../assets/Admin-amico.png";
import Button from "../components/common/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Home() {
  const navigate = useNavigate();
  const isloggedIn = useSelector((state) => state.auth.status);
  return (
    <div>
      <div className="flex justify-center items-center my-10 gap-2 lg:gap-5">
        <Logo className="h-20 w-20 lg:h-32 lg:w-32 xl:h-36 xl:w-36 fill-white" />
        <div className="flex">
          <h1 className="text-5xl lg:text-7xl xl:text-8xl text-white text-center font-semibold">
            Quick
          </h1>
          <h1 className="text-5xl lg:text-7xl xl:text-8xl text-red-400 text-center font-semibold">
            Bite
          </h1>
        </div>
      </div>
      <div className="flex flex-col items-center xl:justify-between xl:flex-row xl:px-60 xl:mt-28 md:px-0 ">
        <img className="h-80 w-80 xl:h-96 xl:w-96" src={chef} />
        <div className="flex flex-col justify-center mt-4 xl:mt-0">
          <h2 className="text-center text-2xl md:text-3xl lg:text-5xl xl:text-6xl text-white font-bold">
            Instant bites<span className="text-red-400">,</span> endless delight
            <span className="text-red-400">.</span>
          </h2>
          <div className="mt-4 mb-2 xl:mb-0 xl:mt-12 flex justify-evenly">
            <Button
              onClick={() => navigate("/menu")}
              className="text-white bg-red-400 w-5/12"
            >
              View Menu
            </Button>
            {!isloggedIn && (
              <Button
                onClick={() => navigate("/sign-up")}
                className="text-red-400 bg-white w-5/12"
              >
                Sign Up
              </Button>
            )}
          </div>
        </div>
      </div>
      {!isloggedIn && (
        <div className="flex flex-col my-6 lg:flex-row justify-evenly items-center lg:gap-20 xl:px-60 lg:my-28 ">
          <div className="flex flex-col gap-4 items-center lg:gap-5 xl:gap-7">
            <h2 className="text-2xl lg:text-5xl xl:text-7xl text-white font-bold">
              Admin Portal<span className="text-red-400">.</span>
            </h2>
            <Button
              onClick={() => navigate("/admin/signin")}
              className=" text-white bg-red-400 w-full"
            >
              Admin Portal
            </Button>
          </div>
          <img src={adminImage} className="h-80 lg:h-96" />
        </div>
      )}
    </div>
  );
}
export default Home;
