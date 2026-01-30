import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [themeMode, setThemeMode] = useState('day'); // day, golden (asr/maghrib), night

    useEffect(() => {
        const updateTheme = () => {
            const hour = new Date().getHours();
            let mode = 'day';
            if (hour >= 17 && hour < 20) {
                mode = 'golden';
            } else if (hour >= 20 || hour < 5) {
                mode = 'night';
            } else {
                mode = 'day';
            }
            setThemeMode(mode);
            document.documentElement.className = `theme-${mode}`;
        };

        updateTheme();
        const interval = setInterval(updateTheme, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    return (
        <ThemeContext.Provider value={{ themeMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
