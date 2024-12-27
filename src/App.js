import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";

function App() {
	return (
		<AuthProvider>
			<ThemeProvider>
				<Router>
					<Navbar />
					<Routes>
						<Route path="/" />
						<Route path="/register" element={<Register />} />
						<Route path="/profile" element={<Profile />} />
					</Routes>
				</Router>
			</ThemeProvider>
		</AuthProvider>
	);
}

export default App;
