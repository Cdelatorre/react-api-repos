import { createContext, useCallback, useState } from "react";

const ThemeContext = createContext();

const ThemeProviderWrapper = (props) => {
  const [theme, setTheme] = useState('light')

  const handleColorTheme = useCallback(() => {
    setTheme((color) => {
      return color === 'light' ? 'dark' : 'light';
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, handleColorTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProviderWrapper };
