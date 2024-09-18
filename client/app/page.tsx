"use client";
import useThemeStore from "@/lib/store/useThemeStore";
import { useTheme } from "../hook/useTheme";


function App() {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  useTheme();

  return (
    <div>
    
    </div>
  );
}

export default App;