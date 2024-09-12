import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/common/Footer.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <div className="bg-gray-700 h-auto font-['Manrope']">
        <div className="w-full flex flex-col min-h-screen">
          <div className="flex-none">
            <Header />
          </div>
          <main className="grow ">
            <Outlet />
            <ToastContainer />
          </main>
          <div className="flex-none">
            <Footer>
              <a
                className="text-sm text-gray-200"
                href="https://storyset.com/people"
              >
                People illustrations by Storyset
              </a>
            </Footer>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
