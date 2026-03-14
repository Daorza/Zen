import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AtSymbolIcon,
  LockClosedIcon,
  UserCircleIcon,
  ArrowLongLeftIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import useAuth from "../../hooks/useAuth";
import { LoginAnimatedPanel } from "../../components/background/LoginAnimatedPanel";

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
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate1 = () => {
    const newError = {};
    if (!formData.fullname) newError.fullname = "Nama harus diisi";
    if (!formData.email)    newError.email    = "Email harus diisi";
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const validate2 = () => {
    const newError = {};
    if (!formData.password)
      newError.password = "Password harus diisi";
    else if (formData.password.length < 8)
      newError.password = "Password minimal 8 karakter";
    if (formData.confirmPassword !== formData.password)
      newError.confirmPassword = "Password tidak cocok";
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleNext = () => {
    if (validate1()) { setError({}); setStep(2); }
  };

  const handleBack = () => {
    setError({});
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate2()) return;
    setApiError("");
    try {
      await register(formData.fullname, formData.email, formData.password, formData.confirmPassword);
    } catch (err) {
      setApiError(err?.response?.data?.message ?? "Terjadi kesalahan, coba lagi.");
    }
  };

  return (
    <div className="min-h-dvh grid grid-cols-1 lg:grid-cols-2 bg-slate-50 dark:bg-slate-950">
      <LoginAnimatedPanel />

      {/* Form side */}
      <div className="flex items-center justify-center px-6 py-12 bg-white dark:bg-slate-900">
        <div className="w-full max-w-sm space-y-7">

          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/25 text-[11px] font-bold tracking-widest uppercase text-indigo-600 dark:text-indigo-400">
            <span className="size-1.5 rounded-full bg-indigo-500 shadow-[0_0_6px_#6366f1]" />
            Daftar Akun
          </span>

          {/* Heading */}
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 leading-tight">
              {step === 1 ? "Buat Akun Baru ✨" : "Buat Password 🔑"}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {step === 1
                ? "Isi data dirimu untuk memulai."
                : "Pastikan password kamu kuat dan mudah diingat."}
            </p>
          </div>

          {/* Step Indicator */}
          <div className="relative flex items-center justify-between">
            {/* Track background */}
            <div className="absolute top-5 left-5 right-5 h-px bg-slate-200 dark:bg-slate-700" />
            {/* Track active */}
            <div
              className="absolute top-5 left-5 h-px bg-indigo-500 transition-all duration-500"
              style={{ width: step === 1 ? "0%" : "calc(100% - 2.5rem)" }}
            />

            {[
              { num: 1, label: "Data Diri" },
              { num: 2, label: "Password" },
            ].map(({ num, label }) => (
              <div key={num} className="relative z-10 flex flex-col items-center gap-1.5">
                <div className={`size-10 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300
                  ${step >= num
                    ? "bg-indigo-500 text-white shadow-md shadow-indigo-400/40"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {num}
                </div>
                <span className={`text-[11px] font-medium transition-colors
                  ${step >= num ? "text-indigo-500" : "text-slate-400 dark:text-slate-500"}`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* API Error */}
          {apiError && (
            <p className="rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-400/30 px-4 py-3 text-sm text-red-600 dark:text-red-400 text-center">
              {apiError}
            </p>
          )}

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* ── Step 1 ── */}
            {step === 1 && (
              <div className="space-y-5">
                {/* Nama */}
                <div className="space-y-1.5">
                  <label htmlFor="fullname" className="block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <UserCircleIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4.5 text-slate-400 pointer-events-none" />
                    <input
                      id="fullname"
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      placeholder="John Doe"
                      autoComplete="name"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 outline-none focus:border-indigo-400 focus:ring-3 focus:ring-indigo-400/15 transition-all"
                    />
                  </div>
                  {error.fullname && (
                    <p className="text-xs text-red-500">{error.fullname}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                    Alamat Email
                  </label>
                  <div className="relative">
                    <AtSymbolIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4.5 text-slate-400 pointer-events-none" />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@gmail.com"
                      autoComplete="email"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 outline-none focus:border-indigo-400 focus:ring-3 focus:ring-indigo-400/15 transition-all"
                    />
                  </div>
                  {error.email && (
                    <p className="text-xs text-red-500">{error.email}</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full py-3 rounded-xl bg-linear-to-br from-indigo-500 to-indigo-600 text-white text-sm font-semibold tracking-wide shadow-lg shadow-indigo-400/30 hover:-translate-y-px hover:shadow-indigo-400/50 active:translate-y-0 transition-all duration-150 cursor-pointer mt-1"
                >
                  Lanjutkan
                </button>
              </div>
            )}

            {/* ── Step 2 ── */}
            {step === 2 && (
              <div className="space-y-5">
                {/* Password */}
                <div className="space-y-1.5">
                  <label htmlFor="password" className="block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  <div className="relative">
                    <LockClosedIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4.5 text-slate-400 pointer-events-none" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 outline-none focus:border-indigo-400 focus:ring-3 focus:ring-indigo-400/15 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeSlashIcon className="size-4.5" /> : <EyeIcon className="size-4.5" />}
                    </button>
                  </div>
                  {error.password && (
                    <p className="text-xs text-red-500">{error.password}</p>
                  )}
                </div>

                {/* Konfirmasi Password */}
                <div className="space-y-1.5">
                  <label htmlFor="confirmPassword" className="block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                    Konfirmasi Password
                  </label>
                  <div className="relative">
                    <LockClosedIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4.5 text-slate-400 pointer-events-none" />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 outline-none focus:border-indigo-400 focus:ring-3 focus:ring-indigo-400/15 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors cursor-pointer"
                      aria-label="Toggle confirm password visibility"
                    >
                      {showConfirmPassword ? <EyeSlashIcon className="size-4.5" /> : <EyeIcon className="size-4.5" />}
                    </button>
                  </div>
                  {error.confirmPassword && (
                    <p className="text-xs text-red-500">{error.confirmPassword}</p>
                  )}
                </div>

                {/* Tombol Kembali + Daftar */}
                <div className="flex gap-3 mt-1">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:border-indigo-300 hover:text-indigo-500 dark:hover:border-indigo-500 dark:hover:text-indigo-400 transition-all cursor-pointer shrink-0"
                  >
                    <ArrowLongLeftIcon className="size-4.5" />
                    Kembali
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 rounded-xl bg-linear-to-br from-indigo-500 to-indigo-600 text-white text-sm font-semibold tracking-wide shadow-lg shadow-indigo-400/30 hover:-translate-y-px hover:shadow-indigo-400/50 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-150 cursor-pointer"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="size-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                        Memproses...
                      </span>
                    ) : "Daftar"}
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-slate-500 dark:text-slate-400">
            Sudah memiliki akun?{" "}
            <button
              onClick={() => navigate("/auth/login")}
              className="font-semibold text-indigo-500 hover:underline cursor-pointer"
            >
              Masuk
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}