const apiURL = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users";

export function login(data) {
	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: apiURL + "/login",
		headers: {
			"Content-Type": "application/json",
		},
		data: data,
	};

	axios
		.request(config)
		.then((response) => {
			console.log(JSON.stringify(response.data));
		})
		.catch((error) => {
			console.log(error);
		});
}
