import { createBrowserRouter, Outlet } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
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
import { AuthProvider } from "../hooks/useAuth";
import RequireAuth from "../components/layouts/RequireAuth";
import GeneralLayout from "../components/layouts/GeneralLayout";

function RootWithAuth() {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    )
}

const router = createBrowserRouter([
    {
        element: <RootWithAuth />,
        children: [
            {
                element: <GeneralLayout />,
                children: [
                    { path: '/', element: <LandingPage /> },
                ]
            },
            {
                element: <AuthLayout />,
                children: [
                    { path: '/auth/login', element: <LoginPage /> },
                    { path: '/auth/register', element: <RegisterPage /> },
                    { path: '/', element: <LandingPage /> },
                ]
            },
            {
                element: <RequireAuth />,
                children: [
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
                    },
                ]
            },
            { path: '*', element: <NotFoundPage /> }
        ]
    }
])

export default router;
