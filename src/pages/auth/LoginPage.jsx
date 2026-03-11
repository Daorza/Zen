import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Section } from "../../components/ui/Section";
import { Container } from "../../components/ui/Container";
import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Button } from "../../components/ui/Button";
import { FormInput } from "../../components/ui/FormInput";
import useAuth from "../../hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [apiError, setApiError] = useState("");

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
    <Section className="min-h-dvh flex items-center justify-center px-4">
      <Container>
        <div className="w-full max-w-md mx-auto space-y-8 rounded-2xl border border-slate-300/50 dark:border-slate-100/20 bg-slate-900/20 dark:bg-slate-500/20 p-8 backdrop-blur-xl">

          <div className="mx-auto w-fit rounded-2xl border border-indigo-400/40 bg-indigo-600/20 px-6 py-2 text-center backdrop-blur-lg">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
              Autentikasi
            </p>
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-slate-950 dark:text-slate-50">
              Selamat Datang Kembali
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Lanjutkan perjalananmu menuju produktivitas.
            </p>
          </div>

          {apiError && (
            <p className="rounded-xl bg-red-500/10 border border-red-400/30 px-4 py-3 text-sm text-red-500 text-center">
              {apiError}
            </p>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <FormInput
              id="email"
              label="Alamat Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              autoComplete="email"
              required
              icon={<AtSymbolIcon className="size-5" />}
            />

            <FormInput
              id="password"
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              autoComplete="current-password"
              required
              icon={<LockClosedIcon className="size-5" />}
            />

            <Button
              type="submit"
              variant="secondary"
              disabled={loading}
              className="w-full rounded-2xl border border-indigo-200 py-3 font-semibold transition hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-300 mt-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? "Memproses..." : "Masuk"}
            </Button>
          </form>

          <p className="text-center text-xs font-medium text-slate-600 dark:text-slate-300">
            Belum memiliki akun?
            <button
              onClick={() => navigate("/auth/register")}
              className="font-semibold text-indigo-500 hover:underline cursor-pointer ml-1"
            >
              Buat akun
            </button>
          </p>

        </div>
      </Container>
    </Section>
  );
}