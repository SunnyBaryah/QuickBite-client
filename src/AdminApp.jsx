import Header from "./components/Admin/Header";
import Footer from "./components/Admin/Footer";
import { Outlet } from "react-router-dom";
function AdminApp() {
  return (
    <div className="bg-gray-700 h-auto font-['Manrope']">
      <div className="w-full flex flex-col min-h-screen">
        <div className="">
          <Header />
        </div>
        <main className="grow">
          <Outlet />
        </main>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
export default AdminApp;
