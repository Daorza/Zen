import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Section } from "../../components/ui/Section";
import { Container } from "../../components/ui/Container";
import {
  AtSymbolIcon,
  LockClosedIcon,
  EyeSlashIcon,
  EyeIcon,
  UserCircleIcon,
  ArrowLongLeftIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../../components/ui/Button";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    if (formData.password.length < 8)
      newError.password = "Password minimal 8 karakter";
    if (formData.confirmPassword !== formData.password)
      newError.confirmPassword = "Password tidak cocok";
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleNext = () => {
    if (validate1()) setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate2()) return;

    console.log("Register data:", formData);
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

          <div className="space-y-4">
            <div className="flex items-center justify-between relative">
              {/* Background line */}
              <div className="absolute top-1/4 left-2 w-11/12 h-1 bg-slate-200 -translate-y-1/2 z-0" />

              {/* Active progress line */}
              <div
                className={`absolute top-1/4 left-2 w-11/12 h-1 bg-indigo-600 -translate-y-1/2 z-0 transition-all duration-500`}
                style={{ width: step === 1 ? "0%" : "90%" }}
              />
              <div className="z-10 flex flex-col items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all
                  ${
                    step >= 1
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  1
                </div>
                <span className="text-xs mt-2">Data Diri</span>
              </div>

              {/* Step 2 */}
              <div className="z-10 flex flex-col items-center ">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all
                  ${
                    step === 2
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  2
                </div>
                <span className="text-xs mt-2">Password</span>
              </div>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300"
                  >
                    Nama Lengkap
                  </label>

                  <div className="group mt-2 flex items-center gap-3 rounded-xl border border-slate-300/50 dark:border-slate-100/20 bg-slate-900/20 dark:bg-slate-400/20 px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500 transition">
                    <UserCircleIcon className="size-5 text-slate-500 transition group-focus-within:text-indigo-500" />
                    <input
                      id="username"
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      required
                      autoComplete="username"
                      placeholder="John Doe"
                      className="w-full bg-transparent text-sm focus:outline-none placeholder:text-slate-400"
                    />
                    {error.fullName && (
                      <p className="text-red-500 text-xs mt-1">
                        {error.fullName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300"
                  >
                    Alamat Email
                  </label>

                  <div className="group mt-2 flex items-center gap-3 rounded-xl border border-slate-300/50 dark:border-slate-100/20 bg-slate-900/20 dark:bg-slate-400/20 px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500 transition">
                    <AtSymbolIcon className="size-5 text-slate-500 transition group-focus-within:text-indigo-500" />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      placeholder="example@gmail.com"
                      className="w-full bg-transparent text-sm focus:outline-none placeholder:text-slate-400"
                    />
                    {error.email && (
                      <p className="text-red-500 text-xs mt-1">{error.email}</p>
                    )}
                  </div>
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
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300"
                  >
                    Password
                  </label>

                  <div className="mt-2 group flex items-center gap-3 rounded-xl border border-slate-300/50 dark:border-slate-100/20 bg-slate-900/20 dark:bg-slate-400/20 px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500 transition">
                    <LockClosedIcon className="size-5 text-slate-500 transition group-focus-within:text-indigo-500" />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="********"
                      className="w-full bg-transparent text-sm focus:outline-none placeholder:text-slate-400"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-500 transition hover:text-indigo-500"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="size-5" />
                      ) : (
                        <EyeIcon className="size-5" />
                      )}
                    </button>
                  </div>

                  {error.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {error.password}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300"
                  >
                    Konfirmasi Password
                  </label>

                  <div className="mt-2 group flex items-center gap-3 rounded-xl border border-slate-300/50 dark:border-slate-100/20 bg-slate-900/20 dark:bg-slate-400/20 px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500 transition">
                    <LockClosedIcon className="size-5 text-slate-500 transition group-focus-within:text-indigo-500" />

                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="********"
                      className="w-full bg-transparent text-sm focus:outline-none placeholder:text-slate-400"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="text-slate-500 transition hover:text-indigo-500"
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="size-5" />
                      ) : (
                        <EyeIcon className="size-5" />
                      )}
                    </button>
                  </div>

                  {error.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {error.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="flex gap-4 pt-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setStep(1)}
                    className="flex items-center justify-center w-full gap-2 rounded-2xl border border-indigo-200/40 py-3 font-semibold transition-all hover:scale-[1.02] hover:shadow-md hover:shadow-indigo-300 hover:text-slate-900 mt-4"  >
                    <ArrowLongLeftIcon className="size-5" />
                    Kembali
                  </Button>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-full rounded-2xl border border-indigo-300/40 py-3 font-semibold transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500 hover:bg-indigo-600 mt-4">
                    Daftar
                  </Button>
                </div>
              </>
            )}{" "}
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
