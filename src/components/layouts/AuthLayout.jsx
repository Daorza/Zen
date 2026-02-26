import { Outlet } from "react-router-dom"
import {Navbar} from "../layouts/Navbar"
export default function AuthLayout () {
    return (
        <>
         <Navbar />
         <Outlet/>
         {/* <Footer /> */}
        </>
    )
}
