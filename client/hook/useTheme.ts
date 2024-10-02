import { useEffect } from "react";
import useThemeStore from "@/lib/store/useThemeStore";
import { applyThemePreference } from "@/lib/utils";
import type { ThemeStore } from "@/lib/store/useThemeStore";


const selector: (state: ThemeStore) => string = (state) => state.theme;
export const useTheme = () => {
  const theme = useThemeStore(selector);
  useEffect(() => {
    applyThemePreference(theme);
  }, [theme]);
};