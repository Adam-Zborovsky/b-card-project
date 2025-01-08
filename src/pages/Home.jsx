import { useState, useEffect, useContext } from "react";
import { FaHeart, FaEdit, FaPhone } from "react-icons/fa";
import { getAllCards } from "../services/cardService";
import { ThemeContext } from "../context/ThemeContext";

function Home() {
	const [cards, setCards] = useState([]);
	const { theme } = useContext(ThemeContext);

	useEffect(() => {
		getAllCards()
			.then((res) => setCards(res.data))
			.catch((err) => console.error(err));
	}, []);

	return (
		<div className="container py-5">
			<div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
				{cards.map((card) => (
					<div key={card._id} className="col">
						<div
							className="card h-100 shadow-lg border-0"
							style={{
								borderRadius: "20px",
								maxWidth: "325px",
								margin: "auto",
								background: theme === "dark" ? "#2c3e50" : "#ffffff",
								color: theme === "dark" ? "#ecf0f1" : "#2c3e50",
							}}
						>
							<img
								src={card.image.url}
								alt={card.image.alt}
								className="card-img-top"
								style={{
									height: "200px",
									objectFit: "cover",
									borderTopLeftRadius: "20px",
									borderTopRightRadius: "20px",
								}}
							/>
							<div className="card-body d-flex flex-column">
								<h5 className="card-title fw-bold">{card.title}</h5>
								<p className="card-text text-muted small">{card.subtitle}</p>
								<ul className="list-unstyled flex-grow-1">
									<li>
										<strong>📞 Phone:</strong> {card.phone}
									</li>
									<li>
										<strong>📍 Address:</strong> {card.address.street},{" "}
										{card.address.city}
									</li>
									<li>
										<strong>🔢 Card Number:</strong> {card.bizNumber}
									</li>
								</ul>
							</div>
							<div
								className="card-footer d-flex justify-content-between border-0"
								style={{
									borderBottomLeftRadius: "20px",
									borderBottomRightRadius: "20px",
									background: theme === "dark" ? "#34495e" : "#f8f9fa",
								}}
							>
								<button className="btn btn-outline-primary rounded-circle">
									<FaEdit />
								</button>

								<div>
									<button className="card-btn btn btn-outline-primary rounded-circle">
										<FaPhone />
									</button>
									<button className="card-btn btn btn-outline-danger rounded-circle">
										<FaHeart />
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Home;
