import { Link } from "react-router-dom";

function Navbar() {
	return (
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<div class="container-fluid">
				<Link class="navbar-brand" to="/">
					<h1>B-Card</h1>
				</Link>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
						<li class="nav-item">
							<Link class="nav-link" to="/">
								Home
							</Link>
							<Link class="nav-link" to="/">
								Home
							</Link>
							<Link class="nav-link" to="/">
								Home
							</Link>
							<Link class="nav-link" to="/">
								Home
							</Link>
						</li>
					</ul>
					<form class="d-flex" role="search">
						<input
							class="form-control me-2"
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
						<button class="btn btn-outline-success" type="submit">
							Search
						</button>
					</form>
					<button class="btn btn-outline-secondary ms-2" id="themeToggle">
						Light/Dark
					</button>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
