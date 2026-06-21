import { useNavigate } from "react-router-dom";
import { Logo, Button } from "../../../shared/ui";
import { useAuth } from "../../../shared/context/AuthContext";
import "./DashboardPage.css";

export function DashboardPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/sign-in", { replace: true });
  };

  return (
      <div className="dashboard">
        <header className="dashboard__header">
          <Logo size="sm" />
          <Button variant="ghost" onClick={handleLogout}>
            Sign out
          </Button>
        </header>

        <main className="dashboard__main">
          <h1 className="dashboard__greeting">Welcome! 👋</h1>
          <p className="dashboard__subtext">
            Your account is ready. This will soon be your dashboard.
          </p>
        </main>
      </div>
  );
}