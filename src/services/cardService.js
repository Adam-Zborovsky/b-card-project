import axios from "axios";

const apiURL = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards";

export function getAllCards() {
	let config = {
		method: "get",
		maxBodyLength: Infinity,
		url: apiURL,
		headers: {},
	};

	return axios.request(config);
}
