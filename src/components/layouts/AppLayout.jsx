import { Outlet } from "react-router-dom"
import SideBar from "./Sidebar"
import BottomBar from "./BottomBar"
export default function AppLayout() {
    return (
        <div className="w-full h-screen flex bg-linear-to-tr to-indigo-100 from-indigo-300 bg-radial mask-circle  dark:from-indigo-950 dark:to-slate-900 transition-all duration-300 ease-in-out">
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
