import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WebsiteMain from "./Pages/Website/Main";
import Home from "./Pages/Website/Home";
import Store from "./Pages/Website/Store";
import Cart from "./Pages/Website/Cart";
import Dashboard from "./Pages/Admin/Dashboard";
import AdminMain from "./Pages/Admin/Main";
import CategorytAdd from "./Pages/Admin/Category/Add";
import CategorytView from "./Pages/Admin/Category/View";
import CategorytEdit from "./Pages/Admin/Category/Edit";
import ColorEdit from "./Pages/Admin/Color/Edit";
// import Login from "./Pages/Website/Login";

import ColorView from "./Pages/Admin/Color/View";
import ColorAdd from "./Pages/Admin/Color/Add";

import ProductAdd from "./Pages/Admin/Product/Add";
import ProductView from "./Pages/Admin/Product/View";
import NotFound from "./Pages/Admin/Product/NotFound";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { lsToCart } from "./reducers/cart";
import Login from "./Pages/Website/Login";
import Register from "./Pages/Website/Register";
import { lsToUser } from "./reducers/user";
import Checkout from "./Pages/Website/Checkout";
import Ordersummart from "./Pages/Website/Ordersummart";
import Transaction from "./Pages/Admin/Transaction";
import Order from "./Pages/Admin/Order";
import AdminLogin from "./Pages/Admin/Login";
function App() {
  const dispath=useDispatch();


  useEffect(
    ()=>{
     dispath(lsToCart());
     dispath(lsToUser());

    },
    []
  )
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <WebsiteMain />, // Added a comma here
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "store/:category_slug?",
          element: <Store />
        },
        {
          path: "cart",
          element: <Cart />
        },
        {
          path:"checkout",
          element:<Checkout/>
        },
        {
          path:"order-summary/:order_id",
          element:<Ordersummart/>
        }
      ]
    },
    {
      path: '/admin',
      element: <AdminMain />,
      children: [
        {
          path: "",
          element: <Dashboard />
        },
        {
          path: "transaction",
          element: <Transaction/>
        },
        {
          path: "order",
          element: <Order/>
        },
        {
          path: "category",
          children: [
            {
              path: "add",
              element: <CategorytAdd />
            },
            {
              path: "view",
              element: <CategorytView />
            },
            {
              path: "edit/:c_id",
              element: <CategorytEdit />
            }
          ]

        },
        {
          path: "product",
          children: [
            {
              path: "add",
              element: <ProductAdd />
            },
            {
              path: "view",
              element: <ProductView />
            }
          ]

        },

        {
          path: "color",
          children: [
            {
              path: "add",
              element: <ColorAdd />
            },
            {
              path: "view",
              element: <ColorView />
            },
            {
              path: "edit/:c_id",
              element: <ColorEdit />
            }
          ]

        },
        {
          path: "*",
          element: <NotFound />
        }
      ]
    },
     {
      path:"/admin/login",
      element:<AdminLogin/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/signup",
      element:<Register/>
    }
  ]);

  return (
    <RouterProvider router={routes} />
  );
}

export default App;
