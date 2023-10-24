import { createBrowserRouter } from "react-router-dom";
import Payment from "./pages/payment/Payment";
import VideoLink from "./pages/video-link/VideoLink";
import Login from "./pages/auth/Login";
import AuthGuard from './components/templates/auth/AuthGuard'
import DashboardLayout from "./components/templates/dashboard/DashboardLayout";
import ListSellers from "./pages/app/sellers/ListSellers";
import CreateSeller from "./pages/app/sellers/CreateSeller";
import ListBanners from "./pages/app/banners/ListBanners";
import CreateBanner from "./pages/app/banners/CreateBanner";

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
        path: 'banners',
        children: [
          {
            path: 'list',
            element: <ListBanners />
          },
          {
            path: 'create',
            element: <CreateBanner />
          },
          {
            path: 'update/:id',
            element: <CreateBanner />
          },
        ]
        
      },
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
          {
            path: 'update/:id',
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
