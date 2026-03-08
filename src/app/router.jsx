import { createBrowserRouter, Outlet } from "react-router-dom";
// import { AuthProvider } from "../hooks/useAuth";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegiterPage";
import LandingPage from "../pages/landing/LandingPage";
import AuthLayout from "../components/layouts/AuthLayout";
import AppLayout from "../components/layouts/AppLayout"
import DashboardPage from "../pages/dashboard/DashboardPage"
import SchedulePage from "../pages/schedule/SchedulePage"
import TaskPage from "../pages/task/TaskPage"
import NotesPage from "../pages/notes/NotesPage"
import ChatPage from "../pages/chat/ChatPage"
import SettingLayout from "../components/layouts/SettingLayout";
import ProfilePage from "../pages/settings/Profile";
import PasswordPage from "../pages/settings/Password";
import AppearancePage from "../pages/settings/Appearance";
// const RootWithAuth = () => {
//     return (
//         // auth provider here ..
//          <Outlet/>
//     )
// }
const router = createBrowserRouter([
    {
        // RootWithAuth here ...
        children: [
            {
                element: <AuthLayout />,
                children: [
                    { path: '/auth/login', element: <LoginPage /> },
                    { path: '/auth/register', element: <RegisterPage /> },
                    { path: '/', element: <LandingPage /> },
                ]
            },
            {
                element: <AppLayout />,
                children: [
                    { path: '/dashboard', element: <DashboardPage /> },
                    { path: '/schedule', element: <SchedulePage /> },
                    { path: '/task', element: <TaskPage /> },
                    { path: '/notes', element: <NotesPage /> },
                    { path: '/chat', element: <ChatPage /> },
                    {
                        element: <SettingLayout />,
                        children: [
                            { path: '/profile', element: <ProfilePage /> },
                            { path: '/new-password', element: <PasswordPage /> },
                            { path: '/appearance', element: <AppearancePage /> },
                        ]
                    }
                ]
            }
        ]
    }
])

export default router;





