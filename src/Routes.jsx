import { createBrowserRouter } from "react-router-dom";
import Payment from "./pages/payment/Payment";
import VideoLink from "./pages/video-link/VideoLink";
import Login from "./pages/auth/Login";
import AuthGuard from './components/templates/auth/AuthGuard'
import DashboardLayout from "./components/templates/dashboard/DashboardLayout";
import ListSellers from "./pages/app/sellers/ListSellers";
import CreateSeller from "./pages/app/sellers/CreateSeller";

export const router = createBrowserRouter([
  {
    path: "auth",
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: 'sellers',
        children: [
          {
            path: 'list',
            element: <ListSellers />
          },
          {
            path: 'create',
            element: <CreateSeller />
          },
        ]
        
      }
    ],
  },
  {
    path: "/comprafinalizada/:control",
    element: <Payment />,
  },
  {
    path: "/video-link",
    element: <VideoLink />,
  },
]);
