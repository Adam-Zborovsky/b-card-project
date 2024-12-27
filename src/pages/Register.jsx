import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/userService";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Profile.css";

function Register() {
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			name: {},
			phone: "",
			email: "",
			password: "",
			image: {},
			address: {},
			isBusiness: false,
		},
		enableReinitialize: true,
		validationSchema: yup.object({
			name: yup.object().shape({
				first: yup
					.string()
					.min(2, "Must be at least 2 characters")
					.max(256, "Must be less than 256 characters")
					.required("First name is required"),
				middle: yup
					.string()
					.min(2, "Must be at least 2 characters")
					.max(256, "Must be less than 256 characters"),
				last: yup
					.string()
					.min(2, "Must be at least 2 characters")
					.max(256, "Must be less than 256 characters")
					.required("Last name is required"),
			}),
			phone: yup
				.string()
				.matches(/^05\d{8}$/, "Must be a valid Israeli phone number")
				.required("Phone number is required"),
			email: yup.string().required("Email is required").email("Invalid email"),
			password: yup
				.string()
				.required("Password is required")
				.min(9, "Must be at least 9 characters")
				.matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{9,}$/,
					"Password must contain uppercase, lowercase, number, and special character"
				),
			image: yup.object().shape({
				url: yup
					.string()
					.url("Must be a valid URL")
					.min(14, "Must be at least 14 characters"),
				alt: yup
					.string()
					.min(2, "Must be at least 2 characters")
					.max(256, "Must be less than 256 characters"),
			}),
			address: yup.object().shape({
				state: yup
					.string()
					.min(2, "Must be at least 2 characters")
					.max(256, "Must be less than 256 characters"),
				country: yup
					.string()
					.min(2, "Must be at least 2 characters")
					.max(256, "Must be less than 256 characters")
					.required("Country is required"),
				city: yup
					.string()
					.min(2, "Must be at least 2 characters")
					.max(256, "Must be less than 256 characters")
					.required("City is required"),
				street: yup
					.string()
					.min(2, "Must be at least 2 characters")
					.max(256, "Must be less than 256 characters")
					.required("Street is required"),
				houseNumber: yup
					.string()
					.min(2, "Must be at least 2 characters")
					.max(256, "Must be less than 256 characters")
					.required("House number is required"),
				zip: yup
					.string()
					.min(2, "Must be at least 2 characters")
					.max(256, "Must be less than 256 characters")
					.required("ZIP is required"),
			}),
			isBusiness: yup.boolean(),
		}),
		onSubmit: (values) => {
			registerUser(values)
				.then((res) => {
					console.log(res);
					if (res.data) {
						login(res.data);
						navigate("/");
					}
				})
				.catch((err) => console.log(err));
		},
	});

	return (
		<div className="profile-page">
			<form onSubmit={formik.handleSubmit} className="profile-form">
				<h3>Register</h3>

				{/* Name Fields */}
				{["first", "middle", "last"].map((field) => (
					<div key={field}>
						<label>{`${
							field.charAt(0).toUpperCase() + field.slice(1)
						} Name:`}</label>
						<input
							type="text"
							name={`name.${field}`}
							value={formik.values.name[field]}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.name?.[field] && formik.errors.name?.[field] && (
							<div className="error">{formik.errors.name[field]}</div>
						)}
					</div>
				))}

				{/* Phone */}
				<label>Phone:</label>
				<input
					type="tel"
					name="phone"
					value={formik.values.phone}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				{formik.touched.phone && formik.errors.phone && (
					<div className="error">{formik.errors.phone}</div>
				)}

				<label>Email:</label>
				<input
					type="text"
					name="email"
					value={formik.values.email}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				{formik.touched.email && formik.errors.email && (
					<div className="error">{formik.errors.email}</div>
				)}

				<label>Password:</label>
				<input
					type="text"
					name="password"
					value={formik.values.password}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				{formik.touched.password && formik.errors.password && (
					<div className="error">{formik.errors.password}</div>
				)}

				{/* Image Fields */}
				{["url", "alt"].map((field) => (
					<div key={field}>
						<label>{`Image ${field === "url" ? "URL" : "Alt Text"}:`}</label>
						<input
							type={field === "url" ? "url" : "text"}
							name={`image.${field}`}
							value={formik.values.image[field]}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.image?.[field] && formik.errors.image?.[field] && (
							<div className="error">{formik.errors.image[field]}</div>
						)}
					</div>
				))}

				<div className="address-container">
					<h4>Address Details</h4>
					<div className="address-fields">
						{["state", "country", "city", "street", "houseNumber", "zip"].map(
							(field) => (
								<div key={field}>
									<label>{`${
										field.charAt(0).toUpperCase() + field.slice(1)
									}:`}</label>
									<input
										type="text"
										name={`address.${field}`}
										value={formik.values.address[field]}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.address?.[field] &&
										formik.errors.address?.[field] && (
											<div className="error">
												{formik.errors.address[field]}
											</div>
										)}
								</div>
							)
						)}
						<input
							type="checkbox"
							id="isBusiness"
							name="isBusiness"
							className="me-2"
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						<label htmlFor="isBusiness">I Am A Business</label>
					</div>
				</div>

				{/* Buttons */}
				<div className="form-actions">
					<button
						type="submit"
						className="save-btn"
						disabled={!(formik.dirty && formik.isValid)}
					>
						Register
					</button>

					<Link
						to="/login"
						style={{
							color: "var(--secondary)",
						}}
					>
						Already have an account? Login
					</Link>
				</div>
			</form>
		</div>
	);
}

export default Register;
