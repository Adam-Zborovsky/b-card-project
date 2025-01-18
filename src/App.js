import { Bounce, ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import "./styles/App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyCards from "./pages/MyCards";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import Footer from "./components/Footer";
import Sandbox from "./pages/Sandbox";
import CardDetails from "./pages/CardDetails";
import { SearchProvider } from "./context/SearchContext";

function App() {
	return (
		<AuthProvider>
			<ThemeProvider>
				<SearchProvider>
					<ToastContainer
						position="top-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick={false}
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="colored"
						transition={Bounce}
					/>
					<Router>
						<Navbar />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/card-details/:id" element={<CardDetails />} />
							<Route path="/about" element={<About />} />
							<Route path="/favorites" element={<Favorites />} />
							<Route path="/my-cards" element={<MyCards />} />
							<Route path="/sandbox" element={<Sandbox />} />
							<Route path="/register" element={<Register />} />
							<Route path="/profile" element={<Profile />} />
							<Route
								path="*"
								element={
									<h1
										className="container d-flex justify-content-center vh-100"
										style={{ color: "var(--error)" }}
									>
										Page Not Found
									</h1>
								}
							/>
						</Routes>
						<Footer />
					</Router>
				</SearchProvider>
			</ThemeProvider>
		</AuthProvider>
	);
}

export default App;
