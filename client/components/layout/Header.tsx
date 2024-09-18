import React from 'react';
import { useTheme } from '@/hook/useTheme';
import useThemeStore from '@/lib/store/useThemeStore';

const Header = () => {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  useTheme();
  return (
    <header>
      <button onClick={toggleTheme}>Toogle Theme</button>
    </header>
  );
};

export default Header;