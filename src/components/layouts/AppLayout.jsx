import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";
import BottomBar from "./BottomBar";
import AppBar from "./AppBar";

export default function AppLayout() {
    return (
        <div className="w-full h-screen flex bg-linear-to-tr to-indigo-100 via-zinc-200 from-indigo-300 dark:from-indigo-950 dark:via-gray-900 dark:to-slate-900 transition-all duration-300 ease-in-out">

            <div className="hidden md:block">
                <SideBar />
            </div>

            <AppBar onLogout={() => { }} />

            <div className="w-full h-full overflow-y-auto pt-14 md:pt-0">
                <Outlet />
            </div>

            <BottomBar />
        </div>
    );
}