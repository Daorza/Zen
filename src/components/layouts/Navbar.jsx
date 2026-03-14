import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { ThemeSwitch } from "../ui/ThemeSwitch";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  return (
    // desktop mode
    <header className="sticky top-0 z-50 bg-slate-300/50 dark:bg-indigo-50/10 backdrop-blur-sm shadow-md">
      <Container>
        <div className="hidden md:flex items-center justify-between h-16">
          <nav
            onClick={() => navigate("/")}
            className="text-lg font-bold capitalize text-indigo-950 dark:text-mist-50 cursor-pointer"
          >
            Genzen
          </nav>

          <div className="flex items-center gap-6">
            <ThemeSwitch />

            <Button
              variant="secondary"
              onClick={() => navigate("/auth/login")}
              className="font-bold hover:shadow-lg hover:shadow-indigo-300 dark:hover:shadow-indigo-50 hover:scale-105 transition-transform duration-200 border border-indigo-200 rounded-2xl"
            >
              Get Started
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
