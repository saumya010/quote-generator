import axios from "axios";

const URL = 'https://api.quotable.io/random'

export default async () => {
	const {data} = await axios.get(URL)
	return data
}
