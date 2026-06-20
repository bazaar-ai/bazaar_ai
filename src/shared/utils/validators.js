const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Azerbaijani mobile numbers: 9 digits after +994, starting with valid operator codes.
const AZ_PHONE_RE = /^(10|50|51|55|70|77|99)\d{7}$/;

export function validateName(name) {
  if (!name.trim()) return "Ad və soyad boş ola bilməz";
  if (name.trim().length < 2) return "Ad və soyad çox qısadır";
  return null;
}

export function validateEmail(email) {
  if (!email.trim()) return "Email boş ola bilməz";
  if (!EMAIL_RE.test(email.trim())) return "Email düzgün formatda deyil";
  return null;
}

export function validatePhone(phone) {
  const digits = phone.replace(/\s/g, "");
  if (!digits) return "Telefon nömrəsi boş ola bilməz";
  if (!AZ_PHONE_RE.test(digits)) return "Telefon nömrəsi düzgün formatda deyil";
  return null;
}

export function validatePassword(password) {
  if (!password) return "Şifrə boş ola bilməz";
  if (password.length < 8) return "Şifrə ən azı 8 simvol olmalıdır";
  return null;
}

export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return "Şifrəni təkrar daxil edin";
  if (password !== confirmPassword) return "Şifrələr uyğun gəlmir";
  return null;
}

export function validateCode(code) {
  if (!/^\d{6}$/.test(code)) return "Kod 6 rəqəmdən ibarət olmalıdır";
  return null;
}

export function toE164AzPhone(localDigits) {
  return `+994${localDigits.replace(/\s/g, "")}`;
}
