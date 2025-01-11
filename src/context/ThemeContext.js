import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(() => {
		return localStorage.getItem("theme") || "light";
	});

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";

		// Delay applying the new theme slightly to let CSS transition kick in
		document.documentElement.classList.add("theme-fade");
		setTimeout(() => {
			setTheme(newTheme);
			localStorage.setItem("theme", newTheme);
			document.documentElement.classList.remove("theme-fade");
		}, 50); // Small delay ensures smoother transition
	};

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
