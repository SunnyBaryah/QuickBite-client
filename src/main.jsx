import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import "./index.css";
import Login from "./components/authentication/Login.jsx";
import SignUp from "./components/authentication/SignUp.jsx";
import AuthLayout from "./components/common/AuthLayout.jsx";
import App from "./App.jsx";
import Menu from "./pages/Menu.jsx";
import Cart from "./pages/Cart.jsx";
import Home from "./pages/Home.jsx";
import Orders from "./pages/Orders.jsx";
import AdminApp from "./AdminApp.jsx";
import AdminAuthLayout from "./components/Admin/AdminAuthLayout.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import EditMenu from "./pages/admin/EditMenu.jsx";
import AllOrders from "./pages/admin/AllOrders.jsx";
import SignIn from "./pages/admin/SignIn.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/menu", element: <Menu /> },
      {
        path: "/cart",
        element: (
          <AuthLayout authentication={true}>
            <Cart />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/sign-up",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        ),
      },
      {
        path: "/orders",
        element: (
          <AuthLayout authentication={true}>
            <Orders />
          </AuthLayout>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminApp />,
    children: [
      {
        path: "/admin",
        element: (
          <AdminAuthLayout authentication={true}>
            <Dashboard />
          </AdminAuthLayout>
        ),
      },
      {
        path: "/admin/signin",
        element: <SignIn />,
      },
      {
        path: "/admin/edit-menu",
        element: (
          <AdminAuthLayout authentication={true}>
            <EditMenu />
          </AdminAuthLayout>
        ),
      },
      {
        path: "/admin/all-orders",
        element: (
          <AdminAuthLayout authentication={true}>
            <AllOrders />
          </AdminAuthLayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
