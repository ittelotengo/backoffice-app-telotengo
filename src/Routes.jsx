import {
    createBrowserRouter
  } from "react-router-dom";
import Payment from "./pages/payment/Payment";
import VideoLink from "./pages/video-link/VideoLink";

  export const router = createBrowserRouter([
    {
      path: "/comprafinalizada/:control",
      element: <Payment />,
    },
    {
      path: "/video-link",
      element: <VideoLink />,
    },
  ]);