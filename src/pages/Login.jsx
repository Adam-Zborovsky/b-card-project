import { useNavigate } from "react-router-dom";

function Login() {
	const navigate = useNavigate();
	const formik = useFromi({
		initialValues: { email: "", password: "" },
		validationSchema: yup.object({
			email: yup.string().required().email(),
			password: yup.string().required().min(6),
		}),
		onSubmit: (values) => {
			checkUser(values)
				.then((res) => {
					if (res.data.length) {
						navigate("/home");
						localStorage.setItem("userId", JSON.stringify(res.data[0].id));
					}
				})
				.catch((err) => console.log(err));
		},
	});
	return (
		<>
			<div className="container w-50">
				<h4 className="display-4 my-2">Login</h4>
				<form onSubmit={formik.handleSubmit}>
					<div className="form-floating mb-3">
						<input
							type="email"
							className="form-control"
							id="email"
							placeholder="name@example.com"
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						<label htmlFor="floatingInput">Email address</label>
						{formik.touched.email && formik.errors.email && (
							<p className="text-danger">{formik.errors.email}</p>
						)}
					</div>
					<div className="form-floating mb-3">
						<input
							type="password"
							className="form-control"
							id="password"
							placeholder="password"
							value={formik.values.password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						<label htmlFor="floatingInput">Password</label>
						{formik.touched.password && formik.errors.password && (
							<p className="text-danger">{formik.errors.password}</p>
						)}
					</div>
					<button
						type="submit"
						className="btn btn-primary w-100 mb-3"
						disabled={!formik.dirty || !formik.isValid}
					>
						Login
					</button>
					<Link to="/register">New User? Register Now!</Link>
				</form>
			</div>
		</>
	);
}

export default Login;
