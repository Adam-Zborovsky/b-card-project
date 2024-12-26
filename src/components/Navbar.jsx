import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
	const [userData, setUserData] = useState({});
	const token = localStorage.getItem("token");
	if (token) setUserData(jwtDecode(token));

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container">
				<Link className="navbar-brand" to="/">
					<h1 style={{ textShadow: "10px black" }}>B-Card</h1>
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
							<Link className="nav-link" to="/home">
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/about">
								About
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/contact">
								Contact
							</Link>
						</li>
						{userData && (
							<>
								{userData.role === "admin" && (
									<li className="nav-item">
										<Link className="nav-link" to="/admin">
											Admin
										</Link>
									</li>
								)}
								<li className="nav-item">
									<Link className="nav-link" to="/my-cards">
										My Cards
									</Link>
								</li>
							</>
						)}
					</ul>
					<div className="d-flex align-items-center">
						<button className="btn btn-outline-secondary mx-2" id="themeToggle">
							Light/Dark
						</button>
						<form className="d-flex" role="search">
							<input
								className="form-control me-2"
								type="search"
								placeholder="Search"
								aria-label="Search"
							/>
							<button className="btn btn-outline-success" type="submit">
								Search
							</button>
						</form>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
