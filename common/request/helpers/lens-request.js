import Axios from 'axios';

export const lensRequest = Axios.create({ baseURL: process.env.NEXT_PUBLIC_LENS_BASE_URL });
