import { useThemeStore } from "../store/ThemeStore";
import { lightTheme, darkTheme } from "../data/Colors";

export const useTheme = () => {
    const isDarkMode = useThemeStore((state) => state.isDarkMode);
    return isDarkMode ? darkTheme : lightTheme;
};
