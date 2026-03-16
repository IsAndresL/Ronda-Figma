import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { TableLanding } from "./pages/TableLanding";
import { Onboarding } from "./pages/Onboarding";
import { VirtualTable } from "./pages/VirtualTable";
import { Menu } from "./pages/Menu";
import { Account } from "./pages/Account";
import { Payment } from "./pages/Payment";
import { PaymentSuccess } from "./pages/PaymentSuccess";
import { AdminDashboard } from "./pages/AdminDashboard";
import { WaiterDashboard } from "./pages/WaiterDashboard";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, Component: Home },
      { path: "m/:qrCode", Component: TableLanding },
      { path: "onboarding/:qrCode", Component: Onboarding },
      { path: "table/:qrCode", Component: VirtualTable },
      { path: "menu/:qrCode", Component: Menu },
      { path: "account/:qrCode", Component: Account },
      { path: "payment/:qrCode", Component: Payment },
      { path: "success/:qrCode", Component: PaymentSuccess },
      { path: "admin", Component: AdminDashboard },
      { path: "waiter", Component: WaiterDashboard },
      { path: "*", Component: NotFound },
    ],
  },
]);