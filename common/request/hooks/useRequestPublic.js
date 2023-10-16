import Axios from 'axios';
import { makeUseAxios } from 'axios-hooks';

const request = Axios.create({
	baseURL : `${process.env.NEXT_PUBLIC_CMS_SERVER_URL}v1/cogo_public`,
	headers : {
		authorization: `Bearer ${process.env.NEXT_PUBLIC_CMS_TOKEN}`,
	},
});

const commonConfig = {
	cache          : false,
	defaultOptions : {
		ssr: true,
	},
};

const useRequestPublic = makeUseAxios({ axios: request, ...commonConfig });

export default useRequestPublic;
