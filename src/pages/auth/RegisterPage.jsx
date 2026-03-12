import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Section } from "../../components/ui/Section";
import { Container } from "../../components/ui/Container";
import {
  AtSymbolIcon,
  LockClosedIcon,
  UserCircleIcon,
  ArrowLongLeftIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../../components/ui/Button";
import { FormInput } from "../../components/ui/FormInput"; // sesuaikan path-nya
import useAuth from "../../hooks/useAuth";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({});
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate1 = () => {
    const newError = {};
    if (!formData.fullname) newError.fullname = "Nama harus diisi";
    if (!formData.email) newError.email = "Email harus diisi";
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const validate2 = () => {
    const newError = {};
    if (!formData.password) newError.password = "Password harus diisi";
    else if (formData.password.length < 8)
      newError.password = "Password minimal 8 karakter";
    if (formData.confirmPassword !== formData.password)
      newError.confirmPassword = "Password tidak cocok";
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleNext = () => {
    if (validate1()) {
      setError({});
      setStep(2);
    }
  };

  const handleBack = () => {
    setError({});
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate2()) return;
    setApiError('');
    try {
      await register(formData.fullname, formData.email, formData.password, formData.confirmPassword);
    } catch (err) {
      setApiError(err?.response?.data?.message ?? 'Terjadi kesalahan, coba lagi.');
    }
  };

  return (
    <Section className="min-h-dvh flex items-center justify-center px-4">
      <Container>
        <div className="w-full max-w-md mx-auto space-y-8 rounded-2xl border border-slate-300/50 dark:border-slate-100/20 bg-slate-900/20 dark:bg-slate-500/20 p-8 backdrop-blur-xl">
          <div className="text-center">
            <h1 className="text-2xl font-bold">
              {step === 1 ? "Buat akun" : "Buat password"}
            </h1>
          </div>

          {/* Step Indicator */}
          <div className="space-y-4">
            <div className="flex items-center justify-between relative">
              {/* Background line */}
              <div className="absolute top-1/4 left-2 w-11/12 h-1 bg-slate-200 -translate-y-1/2 z-0" />

              {/* Active progress line */}
              <div
                className="absolute top-1/4 left-2 h-1 bg-indigo-600 -translate-y-1/2 z-0 transition-all duration-500"
                style={{ width: step === 1 ? "0%" : "90%" }}
              />

              {/* Step 1 */}
              <div className="z-10 flex flex-col items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all
                  ${step >= 1 ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500"}`}
                >
                  1
                </div>
                <span className="text-xs mt-2">Data Diri</span>
              </div>

              {/* Step 2 */}
              <div className="z-10 flex flex-col items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all
                  ${step === 2 ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500"}`}
                >
                  2
                </div>
                <span className="text-xs mt-2">Password</span>
              </div>
            </div>
          </div>

          {apiError && (
            <p className="rounded-xl bg-red-500/10 border border-red-400/30 px-4 py-3 text-sm text-red-500 text-center">
              {apiError}
            </p>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <div className="space-y-4">
                  <FormInput
                    id="username"
                    label="Nama Lengkap"
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                    autoComplete="username"
                    placeholder="John Doe"
                    icon={<UserCircleIcon className="size-5" />}
                  />
                  {error.fullname && (
                    <p className="text-red-500 text-xs -mt-2">{error.fullname}</p>
                  )}

                  <FormInput
                    id="email"
                    label="Alamat Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    placeholder="example@gmail.com"
                    icon={<AtSymbolIcon className="size-5" />}
                  />
                  {error.email && (
                    <p className="text-red-500 text-xs -mt-2">{error.email}</p>
                  )}
                </div>

                <Button
                  onClick={handleNext}
                  type="button"
                  variant="secondary"
                  className="w-full rounded-2xl border border-indigo-200 py-3 font-semibold transition hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-300 mt-4"
                >
                  Lanjutkan
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-4">
                  <FormInput
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="********"
                    icon={<LockClosedIcon className="size-5" />}
                  />
                  {error.password && (
                    <p className="text-red-500 text-xs -mt-2">{error.password}</p>
                  )}

                  <FormInput
                    id="confirmPassword"
                    label="Konfirmasi Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="********"
                    icon={<LockClosedIcon className="size-5" />}
                  />
                  {error.confirmPassword && (
                    <p className="text-red-500 text-xs -mt-2">{error.confirmPassword}</p>
                  )}
                </div>

                <div className="flex gap-4 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="flex items-center justify-center w-full gap-2 rounded-2xl border border-indigo-200/40 py-3 font-semibold transition-all hover:scale-[1.02] hover:shadow-md hover:shadow-indigo-300 hover:text-slate-900 mt-4"
                  >
                    <ArrowLongLeftIcon className="size-5" />
                    Kembali
                  </Button>

                  <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-2xl border border-indigo-300/40 py-3 font-semibold transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500 hover:bg-indigo-600 mt-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? "Memproses..." : "Daftar"}
                  </Button>
                </div>
              </>
            )}
          </form>

          <p className="text-center text-xs font-medium text-slate-600 dark:text-slate-300">
            Sudah memiliki akun?
            <button
              onClick={() => navigate("/auth/login")}
              className="font-semibold text-indigo-500 hover:underline cursor-pointer ml-1"
            >
              Masuk
            </button>
          </p>
        </div>
      </Container>
    </Section>
  );
}