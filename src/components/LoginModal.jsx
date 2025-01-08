import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/userService";
import { AuthContext } from "../context/AuthContext";

const LoginModal = () => {
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = () => setIsModalOpen(!isModalOpen);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: yup.object({
			email: yup.string().required("Email is required").email("Invalid email"),
			password: yup
				.string()
				.required("Password is required")
				.min(9, "Must be at least 9 characters")
				.matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{9,}$/,
					"Password must contain uppercase, lowercase, number, and special character"
				),
		}),
		onSubmit: (values) => {
			loginUser(values)
				.then((res) => {
					if (res.data.length) {
						login(res.data);
						toggleModal();
						navigate("/");
					}
				})
				.catch((err) => console.log(err));
		},
	});

	return (
		<div>
			{/* Button to Trigger Modal */}
			<button className="btn btn-outline-primary mx-2" onClick={toggleModal}>
				Login
			</button>

			{/* Modal */}
			<div
				className={`modal fade ${isModalOpen ? "show d-block" : ""}`}
				tabIndex="-1"
				style={{
					backgroundColor: "rgba(0, 0, 0, 0.5)",
					color: "var(--text)",
				}}
				onClick={toggleModal}
			>
				<div
					className="modal-dialog modal-dialog-centered mt-5"
					style={{
						maxWidth: "90vw",
						width: "400px",
					}}
					onClick={(e) => e.stopPropagation()}
				>
					<div
						className="modal-content rounded-3"
						style={{
							backgroundColor: "var(--background)",
							color: "var(--text)",
						}}
					>
						{/* Modal Header */}
						<div
							className="modal-header sticky-top"
							style={{
								backgroundColor: "var(--background)",
								color: "var(--text)",
								zIndex: 1050,
								padding: "10px 15px",
							}}
						>
							<h5 className="modal-title">Login</h5>
							<button
								type="button"
								className="btn-close"
								onClick={toggleModal}
								style={{
									backgroundColor: "var(--error)",
								}}
								aria-label="Close"
							></button>
						</div>

						{/* Modal Body */}
						<div
							className="modal-body p-4"
							style={{
								backgroundColor: "var(--background)",
								color: "var(--text)",
							}}
						>
							<form onSubmit={formik.handleSubmit} className="px-2">
								<div className="form-group mb-3">
									<label htmlFor="email">Email</label>
									<input
										type="email"
										className={`form-control w-100 ${
											formik.touched.email && formik.errors.email
												? "is-invalid"
												: ""
										}`}
										id="email"
										placeholder="name@example.com"
										value={formik.values.email}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										style={{
											backgroundColor: "var(--background)",
											color: "var(--text)",
											borderColor: "var(--secondary)",
										}}
									/>
									{formik.touched.email && formik.errors.email && (
										<div className="invalid-feedback">
											{formik.errors.email}
										</div>
									)}
								</div>

								<div className="form-group mb-3">
									<label htmlFor="password">Password</label>
									<input
										type="password"
										className={`form-control w-100 ${
											formik.touched.password && formik.errors.password
												? "is-invalid"
												: ""
										}`}
										id="password"
										placeholder="Password"
										value={formik.values.password}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										style={{
											backgroundColor: "var(--background)",
											color: "var(--text)",
											borderColor: "var(--secondary)",
										}}
									/>
									{formik.touched.password && formik.errors.password && (
										<div className="invalid-feedback">
											{formik.errors.password}
										</div>
									)}
								</div>

								<button
									type="submit"
									className="btn w-100 py-2"
									style={{
										backgroundColor: "var(--success)",
										color: "var(--text)",
									}}
									disabled={!formik.dirty || !formik.isValid}
								>
									Login
								</button>

								<div className="text-center mt-3">
									<Link
										to="/register"
										style={{
											color: "var(--secondary)",
										}}
									>
										New User? Register Now!
									</Link>
								</div>
							</form>
						</div>

						{/* Modal Footer */}
						<div className="modal-footer border-0">
							<button className="btn btn-secondary w-100" onClick={toggleModal}>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginModal;
