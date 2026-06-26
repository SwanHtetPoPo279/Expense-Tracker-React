import { FiSun, FiMoon } from "react-icons/fi";


export default function ThemeToggle({
  darkMode,
  setDarkMode,
}) {
  return (
    <button className="text-2xl" onClick={() =>
        setDarkMode(!darkMode)}
    >
      {darkMode ? <FiSun /> : <FiMoon />}
    </button>
  );
}