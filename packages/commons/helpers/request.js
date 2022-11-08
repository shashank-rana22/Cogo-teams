import Axios from 'axios';

const requestBack = Axios.create({
	baseURL: process.env.REST_BASE_API_URL,
});

export default requestBack;
