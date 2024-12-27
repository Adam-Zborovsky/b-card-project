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
					className="modal-dialog modal-dialog-centered"
					onClick={(e) => e.stopPropagation()}
				>
					<div
						className="modal-content"
						style={{
							backgroundColor: "var(--background)",
							color: "var(--text)",
							transform: "translateY(-25vh)",
						}}
					>
						<div
							className="modal-header"
							style={{
								backgroundColor: "var(--background)",
								color: "var(--text)",
							}}
						>
							<h5 className="modal-title">Login</h5>
							<button
								type="button"
								className="btn-close"
								onClick={toggleModal}
								style={{
									backgroundColor: "var(--error	)",
								}}
								aria-label="Close"
							></button>
						</div>
						<div
							className="modal-body"
							style={{
								backgroundColor: "var(--background)",
								color: "var(--text)",
							}}
						>
							<form onSubmit={formik.handleSubmit}>
								<div className="form-group mb-3">
									<label htmlFor="email">Email</label>
									<input
										type="email"
										className={`form-control ${
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
										className={`form-control ${
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
									className="btn w-100 mb-3"
									style={{
										backgroundColor: "var(--success)",
										color: "var(--text)",
									}}
									disabled={!formik.dirty || !formik.isValid}
								>
									Login
								</button>
								<div className="text-center">
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
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginModal;
