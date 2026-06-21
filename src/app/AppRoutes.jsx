import { Routes, Route, Navigate } from "react-router-dom";
import { RegistrationProvider } from "../features/auth/context/RegistrationContext";
import { RoleSelectPage } from "../features/auth/pages/RoleSelectPage";
import { AccountDetailsPage } from "../features/auth/pages/AccountDetailsPage";
import { VerifyPage } from "../features/auth/pages/VerifyPage";
import { SignInPage } from "../features/auth/pages/SignInPage";
import { RequireRegistrationEmail } from "../features/auth/RequireRegistrationEmail";
import { DashboardPage } from "../features/dashboard/pages/DashboardPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { useAuth } from "../shared/context/AuthContext";

function RegistrationFlow() {
    return (
        <RegistrationProvider>
            <Routes>
                <Route index element={<RoleSelectPage />} />
                <Route path="profile" element={<AccountDetailsPage />} />
                <Route
                    path="verify"
                    element={
                        <RequireRegistrationEmail>
                            <VerifyPage />
                        </RequireRegistrationEmail>
                    }
                />
            </Routes>
        </RegistrationProvider>
    );
}

export function AppRoutes() {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Navigate to={isAuthenticated ? "/dashboard" : "/sign-in"} replace />
                }
            />
            <Route path="/register/*" element={<RegistrationFlow />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}