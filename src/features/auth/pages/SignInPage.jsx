import { Link } from "react-router-dom";
import { AuthShell, Button, TextField } from "../../../shared/ui";

export function SignInPage() {
  return (
    <AuthShell maxWidth={480}>
      <h1 className="auth-title">Daxil ol</h1>
      <p className="auth-subtitle">
        Bu səhifə hələ backend ilə inteqrasiya olunmayıb.
      </p>

      <form onSubmit={(event) => event.preventDefault()}>
        <TextField
          label="Email"
          type="email"
          placeholder="elvin@example.com"
          containerClassName="field--spaced"
          autoComplete="email"
        />
        <TextField
          label="Şifrə"
          type="password"
          placeholder="••••••••"
          containerClassName="field--spaced"
          autoComplete="current-password"
        />
        <Button type="submit" fullWidth disabled>
          Daxil ol
        </Button>
      </form>

      <p className="auth-footer">
        Hesabın yoxdur? <Link to="/register">Qeydiyyatdan keç</Link>
      </p>
    </AuthShell>
  );
}
