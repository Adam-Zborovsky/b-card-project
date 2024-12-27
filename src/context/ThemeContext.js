import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(() => {
		const initialTheme = localStorage.getItem("theme") || "light";

		const style = document.createElement("style");
		style.innerHTML = `* { transition: none !important; }`;
		document.head.appendChild(style);

		document.documentElement.setAttribute("data-theme", initialTheme);
		localStorage.setItem("theme", initialTheme);

		setTimeout(() => {
			style.parentNode.removeChild(style);
		}, 0);

		return initialTheme === "light" ? "light" : "dark";
	});

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
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
