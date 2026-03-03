import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";

function animateThemeTransition(event, toggleTheme) {
  const button = event.currentTarget;
  const rect = button.getBoundingClientRect();

  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  const maxRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.background = document.documentElement.classList.contains("dark")
    ? "#ffffff4d"
    : "#0000004d";
  overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`;
  overlay.style.zIndex = "9999";

  document.body.appendChild(overlay);

  overlay.animate(
    {
      clipPath: [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${maxRadius}px at ${x}px ${y}px)`,
      ],
    },
    {
      duration: 700,
      easing: "ease-in-out",
      fill: "forwards",
    },
  ).onfinish = () => {
    toggleTheme();
    overlay.remove();
  };
}

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  return (
    // desktop mode
    <header className="sticky top-0 z-50 bg-indigo-50/10 backdrop-blur-sm shadow-md">
      <Container>
        <div className="hidden md:flex items-center justify-between h-16">
          <nav
            onClick={() => navigate("/")}
            className="text-lg font-bold capitalize text-indigo-950 dark:text-mist-50 cursor-pointer"
          >
            Genzen
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              onClick={() => navigate("/auth/login")}
              className="font-bold hover:shadow-lg hover:shadow-indigo-50 hover:scale-105 transition-transform duration-200 border border-indigo-200 rounded-2xl"
            >
              Get Started
            </Button>

            <button
              onClick={(e) =>
                animateThemeTransition(e, () =>
                  setTheme(theme === "dark" ? "light" : "dark"),
                )
              }
              className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700"
            >
              {theme === "dark" ? "☀ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
