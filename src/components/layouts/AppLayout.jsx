import { Outlet } from "react-router-dom"
import SideBar from "./Sidebar"
import BottomBar from "./BottomBar"
export default function AppLayout() {
    return (
        <div className="w-full h-screen flex gap-4 bg-indigo-100 dark:bg-slate-900">
            <div className="hidden md:block">
                <SideBar/>
            </div>
            <div className="w-full h-full overflow-y-auto">
                <Outlet />
            </div>
            <BottomBar/>
        </div>
    )
}
