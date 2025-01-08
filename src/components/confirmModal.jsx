import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../services/userService";
import "../styles/index.css";
import { ThemeContext } from "../context/ThemeContext";

const ConfirmModal = ({ userId, logout }) => {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { theme } = useContext(ThemeContext);
	const toggleModal = () => setIsModalOpen(!isModalOpen);

	const handleDelete = () => {
		deleteUser(userId)
			.then(() => {
				logout();
				navigate("/");
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			{/* Button to Trigger Delete Confirmation */}
			<button className="btn btn-dark" onClick={toggleModal}>
				Delete Account
			</button>

			{/* Confirmation Modal */}
			{isModalOpen && (
				<div
					className="modal fade show d-block"
					tabIndex="-1"
					style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
					onClick={toggleModal}
				>
					<div
						className="modal-dialog modal-dialog-centered"
						onClick={(e) => e.stopPropagation()} // Prevent closing modal on inside click
					>
						<div
							className={`modal-content ${
								theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
							}`}
						>
							<div className="modal-header">
								<h5 className="modal-title">Confirm Deletion</h5>
								<button
									type="button"
									className="btn-close"
									onClick={toggleModal}
									aria-label="Close"
								></button>
							</div>
							<div className="modal-body">
								<p>Are you sure you want to delete your account?</p>
							</div>
							<div className="modal-footer">
								<button className="btn btn-danger" onClick={toggleModal}>
									Cancel
								</button>
								<button
									className="btn btn-dark"
									onClick={() => {
										handleDelete();
										toggleModal();
									}}
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ConfirmModal;
