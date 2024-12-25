const toggleButton = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme") || "light";

document.documentElement.setAttribute("data-theme", currentTheme);

toggleButton.addEventListener("click", () => {
	const newTheme = currentTheme === "light" ? "dark" : "light";
	document.documentElement.setAttribute("data-theme", newTheme);
	localStorage.setItem("theme", newTheme);
});
