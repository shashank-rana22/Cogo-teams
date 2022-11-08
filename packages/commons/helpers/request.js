import Axios from 'axios';

export const request = Axios.create({
	baseURL: process.env.REST_BASE_API_URL,
});
export const requestV2 = Axios.create();


