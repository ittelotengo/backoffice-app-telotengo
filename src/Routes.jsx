import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
  } from "react-router-dom";
import Payment from "./pages/payment/Payment";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: Payment,
    },
  ]);