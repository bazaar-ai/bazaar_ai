import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthShell, Button, StepIndicator } from "../../../shared/ui";
import { CodeInput } from "../components/CodeInput";
import { useRegistration } from "../context/RegistrationContext";
import { useAuth } from "../../../shared/context/AuthContext";
import { verifyUser } from "../api/authApi";
import { useCountdown } from "../../../shared/hooks/useCountdown";
import { validateCode } from "../../../shared/utils/validators";

const STEPS = ["Rol seç", "Məlumatlar", "Təsdiq"];
const RESEND_SECONDS = 42;

export function VerifyPage() {
  const navigate = useNavigate();
  const { formData, reset } = useRegistration();
  const { login } = useAuth();
  const { formatted, isExpired, restart } = useCountdown(RESEND_SECONDS);

  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const email = formData.email;

  const handleVerify = async () => {
    const codeError = validateCode(code);
    if (codeError) {
      setError(codeError);
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      const result = await verifyUser({ email, code });
      login(result.accessToken);
      reset();
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = () => {
    if (!isExpired) return;
    // TODO: wire to a real "resend code" endpoint once it exists on the backend.
    restart();
  };

  const handleWhatsAppVerify = () => {
    // TODO: wire to a WhatsApp-based verification flow once the backend supports it.
  };

  return (
    <AuthShell>
      <StepIndicator steps={STEPS} currentStep={3} />

      <h1 className="auth-title">Emailini təsdiqlə</h1>
      <p className="auth-subtitle">
        <strong>{email || "email ünvanına"}</strong> göndərilən 6 rəqəmli kodu daxil
        et.
      </p>

      <CodeInput value={code} onChange={setCode} error={error} />

      <p className="resend-row">
        {isExpired ? (
          <button type="button" className="resend-row__link" onClick={handleResend}>
            Kodu yenidən göndər
          </button>
        ) : (
          <>
            <span className="resend-row__muted">Kodu yenidən göndər</span>
            <span className="resend-row__timer">· {formatted}</span>
          </>
        )}
      </p>

      <Button fullWidth variant="navy" loading={submitting} onClick={handleVerify}>
        Hesabı yarat
      </Button>

      <div className="auth-divider">VƏ YA</div>

      <Button fullWidth variant="ghost" onClick={handleWhatsAppVerify}>
        WhatsApp ilə təsdiqlə
      </Button>
    </AuthShell>
  );
}
