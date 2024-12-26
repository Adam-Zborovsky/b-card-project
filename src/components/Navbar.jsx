import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function Navbar() {
	const [userData, setUserData] = useState({});
	const token = localStorage.getItem("token");
	if (token) setUserData(jwtDecode(token));

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container">
				<Link className="navbar-brand" to="/">
					<h1 style={{ textShadow: "5px 2px 4px rgba(0, 0, 0, 0.5)" }}>
						B-Card
					</h1>
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item active">
							<Link className="nav-link" to="/about">
								About
							</Link>
						</li>
						{userData.id && (
							<>
								<li className="nav-item">
									<Link className="nav-link" to="/favorites">
										Favorites
									</Link>
								</li>
								{userData.isBusiness && (
									<li className="nav-item">
										<Link className="nav-link" to="/my-cards">
											My Cards
										</Link>
									</li>
								)}
								{userData.isAdmin && (
									<li className="nav-item">
										<Link className="nav-link" to="/sandbox">
											Sandbox
										</Link>
									</li>
								)}
							</>
						)}
					</ul>
					<div className="d-flex align-items-center">
						<button className="btn btn-outline-secondary mx-2" id="themeToggle">
							Light/Dark
						</button>
						<div className="search-container">
							<input
								type="text"
								className="form-control"
								placeholder="Search"
							/>
							<button
								className="btn btn-outline-success search-btn"
								type="submit"
							>
								<FaSearch />
							</button>
						</div>
						<div className="me-3">
							{userData.id ? (
								<>
									<Link
										className="btn btn-outline-primary mx-2"
										to="/profile"
										style={{ textTransform: "capitalize" }}
									>
										<img src="" alt="">
											placeholder
										</img>
									</Link>
									<Link className="btn btn-outline-danger mx-2" to="/logout">
										Logout
									</Link>
								</>
							) : (
								<>
									<Link className="btn btn-outline-primary mx-2" to="/login">
										Login
									</Link>
									<Link className="btn btn-outline-primary mx-2" to="/register">
										Register
									</Link>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
