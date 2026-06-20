import { useNavigate, Link } from "react-router-dom";
import { AuthShell, Button, StepIndicator } from "../../../shared/ui";
import { DocumentIcon, TrendingUpIcon, InfoIcon } from "../../../shared/ui/icons";
import { RoleCard } from "../components/RoleCard";
import { useRegistration } from "../context/RegistrationContext";
import { ROLE_META, UserRole } from "../userRole";

const STEPS = ["Rol seç", "Məlumatlar", "Təsdiq"];

export function RoleSelectPage() {
  const navigate = useNavigate();
  const { formData, updateFields } = useRegistration();

  const handleContinue = () => {
    navigate("/qeydiyyat/melumatlar");
  };

  return (
    <AuthShell>
      <StepIndicator steps={STEPS} currentStep={1} />

      <h1 className="auth-title">Bazaar AI-da necə iştirak etmək istəyirsən?</h1>
      <p className="auth-subtitle">
        Seçimin sonradan hesab tənzimləmələrindən dəyişdirilə bilməz — düzgün seç.
      </p>

      <div className="role-grid">
        <RoleCard
          icon={<DocumentIcon />}
          title={ROLE_META[UserRole.MERCHANT].label}
          description={ROLE_META[UserRole.MERCHANT].description}
          selected={formData.userRole === UserRole.MERCHANT}
          onSelect={() => updateFields({ userRole: UserRole.MERCHANT })}
        />
        <RoleCard
          icon={<TrendingUpIcon />}
          title={ROLE_META[UserRole.INVESTOR].label}
          description={ROLE_META[UserRole.INVESTOR].description}
          selected={formData.userRole === UserRole.INVESTOR}
          onSelect={() => updateFields({ userRole: UserRole.INVESTOR })}
        />
      </div>

      <div className="auth-note">
        <InfoIcon />
        <p>
          Admin və Compliance Officer hesabları ictimai qeydiyyatdan keçmir —
          komanda tərəfindən daxili dəvətlə yaradılır.
        </p>
      </div>

      <Button fullWidth onClick={handleContinue}>
        Davam et
      </Button>

      <p className="auth-footer">
        Artıq hesabın var? <Link to="/daxil-ol">Daxil ol</Link>
      </p>
    </AuthShell>
  );
}
