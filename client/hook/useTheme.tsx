import { useEffect } from "react";
import useThemeStore from "@/lib/store/useThemeStore";
import { applyThemePreference } from "@/lib/utils";
import type { ThemeState } from "@/lib/store/useThemeStore";


const selector: (state: ThemeState) => string = (state) => state.theme;
export const useTheme = () => {
  const theme = useThemeStore(selector);
  useEffect(() => {
    applyThemePreference(theme);
  }, [theme]);
};