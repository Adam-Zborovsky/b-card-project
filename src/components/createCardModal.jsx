import { useFormik } from "formik";
import * as Yup from "yup";

function CreateCardModal({ action, show, setShowModal, theme, currentCard }) {
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			image: {
				url: currentCard?.image?.url || "",
				alt: currentCard?.image?.alt || "",
			},
			title: currentCard?.title || "",
			description: currentCard?.description || "",
			subtitle: currentCard?.subtitle || "",
			phone: currentCard?.phone || "",
			email: currentCard?.email || "",
			web: currentCard?.web || "",
			address: {
				state: currentCard?.address?.state || "",
				country: currentCard?.address?.country || "",
				city: currentCard?.address?.city || "",
				street: currentCard?.address?.street || "",
				houseNumber: currentCard?.address?.houseNumber || null,
				zip: currentCard?.address?.zip || null,
			},
		},
		validationSchema: Yup.object({
			image: Yup.object().shape({
				url: Yup.string()
					.url("Must be a valid URL")
					.required("Image URL is required"),
				alt: Yup.string().max(256),
			}),
			title: Yup.string().min(2).max(256).required("Title is required"),
			subtitle: Yup.string().min(2).max(256).required("Subtitle is required"),
			phone: Yup.string().min(9).max(11).required("Phone is required"),
			address: Yup.object().shape({
				street: Yup.string().required("Street is required"),
				country: Yup.string().required("Country is required"),
				city: Yup.string().required("City is required"),
			}),
		}),
		onSubmit: (values) => {
			formik.resetForm({ values: formik.initialValues });
			action(values);
		},
	});

	const onClose = () => {
		formik.resetForm({ values: formik.initialValues });
		setShowModal(false);
	};

	if (!show) return null;

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
				backgroundColor: "rgba(0,0,0,0.5)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				zIndex: 9999,
			}}
			onClick={onClose}
		>
			<div onClick={(e) => e.stopPropagation()}>
				<form onSubmit={formik.handleSubmit}>
					<div
						className="card h-100 shadow-lg border-0"
						style={{
							transform: "none",
							willChange: "auto",
							borderRadius: "20px",
							maxWidth: "650px",
							margin: "auto",
							background: theme === "dark" ? "#2c3e50" : "#ffffff",
							color: theme === "dark" ? "#ecf0f1" : "#2c3e50",
						}}
					>
						{/* --- Image Preview Section --- */}
						<div
							style={{
								position: "relative",
								height: "200px",
								borderTopLeftRadius: "20px",
								borderTopRightRadius: "20px",
								overflow: "hidden",
								backgroundColor: "#ddd",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							{formik.values.image.url ? (
								<img
									src={formik.values.image.url}
									alt={formik.values.image.alt || "preview"}
									style={{
										width: "100%",
										height: "100%",
										objectFit: "cover",
									}}
								/>
							) : (
								<div style={{ color: "#888" }}>No image selected</div>
							)}
						</div>

						<div className="card-body d-flex flex-column">
							{/* Input for the image URL */}
							<div className="mb-2">
								<label className="form-label">Image URL</label>
								<input
									name="image.url"
									type="text"
									className="form-control form-control-sm"
									placeholder="https://example.com/image.jpg"
									value={formik.values.image.url}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								{formik.touched.image?.url && formik.errors.image?.url && (
									<div style={{ color: "red", fontSize: "0.8rem" }}>
										{formik.errors.image.url}
									</div>
								)}
							</div>

							<div className="mb-2">
								<input
									name="image.alt"
									type="text"
									className="form-control form-control-sm"
									placeholder="Describe the image"
									value={formik.values.image.alt}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</div>

							<h5 className="card-title fw-bold">
								<label className="form-label">Title</label>
								<input
									id="title"
									name="title"
									type="text"
									className="form-control"
									placeholder="Title"
									style={{ fontWeight: "bold" }}
									value={formik.values.title}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</h5>
							{formik.errors.title && formik.touched.title && (
								<div style={{ color: "red", fontSize: "0.8rem" }}>
									{formik.errors.title}
								</div>
							)}

							{/* Description */}
							<div className="mb-2">
								<label className="form-label">Description</label>
								<textarea
									id="description"
									name="description"
									className="form-control form-control-sm"
									rows={2}
									placeholder="Enter card description"
									value={formik.values.description}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								{/* If you want to validate description, add a rule in Yup */}
								{formik.errors.description && formik.touched.description && (
									<div style={{ color: "red", fontSize: "0.8rem" }}>
										{formik.errors.description}
									</div>
								)}
							</div>

							{/* Subtitle */}
							<p className="card-text text-muted small">
								<input
									id="subtitle"
									name="subtitle"
									type="text"
									className="form-control form-control-sm"
									placeholder="Subtitle"
									value={formik.values.subtitle}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</p>
							{formik.errors.subtitle && formik.touched.subtitle && (
								<div style={{ color: "red", fontSize: "0.8rem" }}>
									{formik.errors.subtitle}
								</div>
							)}

							{/* Phone */}
							<ul
								className="list-unstyled flex-grow-1"
								style={{ marginBottom: 0 }}
							>
								<li className="mb-1">
									<strong>📞 Phone:</strong>{" "}
									<input
										id="phone"
										name="phone"
										type="text"
										className="form-control form-control-sm d-inline-block"
										style={{ width: "auto" }}
										placeholder="(123) 456-7890"
										value={formik.values.phone}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
								</li>
							</ul>
							{formik.errors.phone && formik.touched.phone && (
								<div style={{ color: "red", fontSize: "0.8rem" }}>
									{formik.errors.phone}
								</div>
							)}

							{/* Email */}
							<div className="mb-2">
								<label className="form-label">Email</label>
								<input
									id="email"
									name="email"
									type="email"
									className="form-control form-control-sm"
									placeholder="example@domain.com"
									value={formik.values.email}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								{formik.errors.email && formik.touched.email && (
									<div style={{ color: "red", fontSize: "0.8rem" }}>
										{formik.errors.email}
									</div>
								)}
							</div>

							{/* Website */}
							<div className="mb-2">
								<label className="form-label">Website</label>
								<input
									id="web"
									name="web"
									type="text"
									className="form-control form-control-sm"
									placeholder="https://..."
									value={formik.values.web}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								{formik.errors.web && formik.touched.web && (
									<div style={{ color: "red", fontSize: "0.8rem" }}>
										{formik.errors.web}
									</div>
								)}
							</div>

							{/* Address Fields */}
							<p className="card-text text-muted small mt-2 mb-1">
								<strong>📍 Address</strong>
							</p>
							<div className="d-flex mb-2">
								<input
									id="address.state"
									name="address.state"
									type="text"
									className="form-control form-control-sm"
									style={{ width: "100px" }}
									placeholder="State"
									value={formik.values.address.state}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								<input
									id="address.country"
									name="address.country"
									type="text"
									className="form-control form-control-sm"
									style={{ width: "100px" }}
									placeholder="Country"
									value={formik.values.address.country}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								{formik.touched.address?.country &&
									formik.errors.address?.country && (
										<div style={{ color: "red", fontSize: "0.8rem" }}>
											{formik.errors.address.country}
										</div>
									)}
								<input
									id="address.city"
									name="address.city"
									type="text"
									className="form-control form-control-sm"
									style={{ width: "100px" }}
									placeholder="City"
									value={formik.values.address.city}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								{formik.touched.address?.city &&
									formik.errors.address?.city && (
										<div style={{ color: "red", fontSize: "0.8rem" }}>
											{formik.errors.address.city}
										</div>
									)}
							</div>

							<div className="d-flex mb-2">
								<input
									id="address.street"
									name="address.street"
									type="text"
									className="form-control form-control-sm"
									style={{ width: "210px" }}
									placeholder="Street"
									value={formik.values.address.street}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								<input
									id="address.houseNumber"
									name="address.houseNumber"
									type="number"
									className="form-control form-control-sm"
									style={{ width: "90px" }}
									placeholder="House #"
									value={formik.values.address.houseNumber || ""}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								{formik.touched.address?.street &&
									formik.errors.address?.street && (
										<div style={{ color: "red", fontSize: "0.8rem" }}>
											{formik.errors.address.street}
										</div>
									)}
							</div>
							<input
								id="address.zip"
								name="address.zip"
								type="number"
								className="form-control form-control-sm"
								placeholder="Zip"
								value={formik.values.address.zip || ""}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</div>

						<div
							className="card-footer d-flex justify-content-between border-0"
							style={{
								borderBottomLeftRadius: "20px",
								borderBottomRightRadius: "20px",
								background: theme === "dark" ? "#34495e" : "#f8f9fa",
							}}
						>
							<button
								type="button"
								className="btn btn-outline-secondary"
								onClick={onClose}
							>
								Cancel
							</button>
							<button
								type="submit"
								className="btn btn-primary"
								disabled={!formik.isValid || !formik.dirty}
							>
								Done
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default CreateCardModal;
