import axios from "axios";


// const url = 'https://andruxnet-random-famous-quotes.p.rapidapi.com/'
const url = 'https://api.quotable.io/random'

export default async () => {
	const {data} = await axios.get(url)
	return data
}
