import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./Sidebar";
import BottomBar from "./BottomBar";
import AppBar from "./AppBar";
import ChatFAB from "../ui/ChatFAB";
import useAuth from "../../hooks/useAuth";

export default function AppLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <div className="w-full h-screen flex">
      <div className="hidden md:block">
        <SideBar onLogout={handleLogout} />
      </div>

      <AppBar onLogout={handleLogout} />

      <div className="w-full h-full overflow-y-auto pt-14 md:pt-0">
        <Outlet />
      </div>

      <ChatFAB />
      <BottomBar />
    </div>
  );
}
