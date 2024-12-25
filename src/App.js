import Navbar from "./components/Navbar";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" />
				<Route path="/login" />
				<Route path="/dashboard" />
			</Routes>
		</Router>
	);
}

export default App;
