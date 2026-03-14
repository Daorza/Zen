import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AtSymbolIcon, LockClosedIcon, EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import useAuth from "../../hooks/useAuth";
import { LoginAnimatedPanel } from "../../components/background/LoginAnimatedPanel";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      setApiError(err?.response?.data?.message ?? "Email atau password salah.");
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
            Autentikasi
          </span>

          {/* Heading */}
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 leading-tight">
              Selamat Datang<br />Kembali 👋
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Lanjutkan perjalananmu menuju produktivitas.
            </p>
          </div>

          {/* Error */}
          {apiError && (
            <p className="rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-400/30 px-4 py-3 text-sm text-red-600 dark:text-red-400 text-center">
              {apiError}
            </p>
          )}

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>

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
            </div>

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
                  autoComplete="current-password"
                  required
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
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-linear-to-br from-indigo-500 to-indigo-600 text-white text-sm font-semibold tracking-wide shadow-lg shadow-indigo-400/30 hover:-translate-y-px hover:shadow-indigo-400/50 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-150 cursor-pointer mt-1"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="size-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  Memproses...
                </span>
              ) : "Masuk"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-slate-500 dark:text-slate-400">
            Belum memiliki akun?{" "}
            <button
              onClick={() => navigate("/auth/register")}
              className="font-semibold text-indigo-500 hover:underline cursor-pointer"
            >
              Buat akun
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}