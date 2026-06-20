import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthShell, Button, StepIndicator, TextField } from "../../../shared/ui";
import { DocumentIcon, TrendingUpIcon } from "../../../shared/ui/icons";
import { useRegistration } from "../context/RegistrationContext";
import { registerUser } from "../api/authApi";
import { ROLE_META, UserRole } from "../userRole";
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
  toE164AzPhone,
} from "../../../shared/utils/validators";

const STEPS = ["Rol seç", "Məlumatlar", "Təsdiq"];

const ROLE_ICON = {
  [UserRole.MERCHANT]: <DocumentIcon />,
  [UserRole.INVESTOR]: <TrendingUpIcon />,
};

export function AccountDetailsPage() {
  const navigate = useNavigate();
  const { formData, updateFields } = useRegistration();
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field) => (event) => {
    updateFields({ [field]: event.target.value });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = () => {
    const nextErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(
        formData.password,
        formData.confirmPassword
      ),
    };
    if (!agreed) {
      nextErrors.agreed = "Davam etmək üçün şərtləri qəbul et";
    }
    setErrors(nextErrors);
    return Object.values(nextErrors).every((error) => !error);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setSubmitting(true);
    try {
      await registerUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: toE164AzPhone(formData.phone),
        password: formData.password,
        userRole: formData.userRole,
      });
      navigate("/qeydiyyat/tesdiq");
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell>
      <StepIndicator steps={STEPS} currentStep={2} />

      <h1 className="auth-title">Hesab məlumatların</h1>
      <p className="auth-subtitle">
        Bu məlumatlar profilində və KYC prosesində istifadə olunacaq.
      </p>

      <div className="auth-summary-pill">
        <span className="auth-summary-pill__label">
          {ROLE_ICON[formData.userRole]}
          Hesab növü: {ROLE_META[formData.userRole].label}
        </span>
        <button
          type="button"
          className="auth-summary-pill__change"
          onClick={() => navigate("/qeydiyyat")}
        >
          Dəyiş
        </button>
      </div>

      {submitError ? <div className="form-error-banner">{submitError}</div> : null}

      <form onSubmit={handleSubmit} noValidate>
        <TextField
          label="Ad və soyad"
          placeholder="Elvin Məmmədov"
          value={formData.name}
          onChange={handleChange("name")}
          error={errors.name}
          containerClassName="field--spaced"
          autoComplete="name"
        />

        <TextField
          label="Email"
          type="email"
          placeholder="elvin@example.com"
          value={formData.email}
          onChange={handleChange("email")}
          error={errors.email}
          containerClassName="field--spaced"
          autoComplete="email"
        />

        <TextField
          label="Telefon nömrəsi"
          prefix="+994"
          placeholder="XX XXX XX XX"
          value={formData.phone}
          onChange={handleChange("phone")}
          error={errors.phone}
          containerClassName="field--spaced"
          autoComplete="tel-national"
          inputMode="numeric"
        />

        <div className="field-row field--spaced">
          <TextField
            label="Şifrə"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange("password")}
            error={errors.password}
            autoComplete="new-password"
          />
          <TextField
            label="Şifrəni təkrarla"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange("confirmPassword")}
            error={errors.confirmPassword}
            autoComplete="new-password"
          />
        </div>

        <label className="auth-checkbox">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(event) => {
              setAgreed(event.target.checked);
              if (errors.agreed) {
                setErrors((prev) => ({ ...prev, agreed: undefined }));
              }
            }}
          />
          <span>
            İstifadə şərtlərini və <Link to="/mexfilik">məxfilik siyasətini</Link>{" "}
            qəbul edirəm
          </span>
        </label>
        {errors.agreed ? (
          <p className="field__error" style={{ marginTop: "-12px", marginBottom: "16px" }}>
            {errors.agreed}
          </p>
        ) : null}

        <Button type="submit" fullWidth loading={submitting}>
          Qeydiyyatı tamamla
        </Button>
      </form>

      <p className="auth-footer">
        Artıq hesabın var? <Link to="/daxil-ol">Daxil ol</Link>
      </p>
    </AuthShell>
  );
}
