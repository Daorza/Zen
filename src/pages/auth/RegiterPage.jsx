import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Section } from "../../components/ui/Section";
import { Container } from "../../components/ui/Container";
import { AtSymbolIcon, LockClosedIcon, EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { Button } from "../../components/ui/Button";

export default function RegisterPage() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  
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
              Buat akun
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Tambahkan detail untuk memulai.
            </p>
          </div>

          <form className="space-y-6">

            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300"
              >
                Nama Lengkap
              </label>

              <div className="group mt-2 flex items-center gap-3 rounded-xl border border-slate-300/50 dark:border-slate-100/20 bg-slate-900/20 dark:bg-slate-400/20 px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500 transition">
                <AtSymbolIcon className="size-5 text-slate-500 transition group-focus-within:text-indigo-500" />
                <input
                  id="username"
                  type="text"
                  name="username"
                  required
                  autoComplete="username"
                  placeholder="John Doe"
                  className="w-full bg-transparent text-sm focus:outline-none placeholder:text-slate-400"
                />
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
                  required
                  autoComplete="email"
                  placeholder="example@gmail.com"
                  className="w-full bg-transparent text-sm focus:outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="secondary"
              className="w-full rounded-2xl border border-indigo-200 py-3 font-semibold transition hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-300 mt-4"
            >
              Lanjutkan
            </Button>
          </form>

          <p className="text-center text-xs font-medium text-slate-600 dark:text-slate-300">
            Sudah memiliki akun?
            <button onClick={() => navigate("/auth/login")}
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