import { useNavigate } from "react-router-dom";
import { Logo, Button } from "../../../shared/ui";
import { useAuth } from "../../../shared/context/AuthContext";
import "./DashboardPage.css";

export function DashboardPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/qeydiyyat", { replace: true });
  };

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <Logo size="sm" />
        <Button variant="ghost" onClick={handleLogout}>
          Çıxış et
        </Button>
      </header>

      <main className="dashboard__main">
        <h1 className="dashboard__greeting">Salam! 👋</h1>
        <p className="dashboard__subtext">
          Hesabın hazırdır. Tezliklə bura sənin idarə paneli olacaq.
        </p>
      </main>
    </div>
  );
}
