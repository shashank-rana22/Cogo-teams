import { usePublicRequest } from '@cogoport/request';
import { useEffect } from 'react';

/**
 * Single utility hook to get authorization Url
 */

const useGetAutorizationUrl = () => {
	const [authorizationUrlApi, triggerAuthorizationUrl] = usePublicRequest(
		{
			url    : `${process.env.COGO_LENS_URL}/outlook_authorization_url`,
			method : 'GET',
		},
		{ manual: true },
	);

	/**
	 *
	 * @param {String} id Id of mail
	 */
	const getAuthorizationUrl = () => triggerAuthorizationUrl({
		params: { scopes: {} },
	});

	useEffect(() => {
		getAuthorizationUrl();
		// eslint-disable-next-line
	}, []);

	return {
		authorizationUrlApi,
		getAuthorizationUrl,
	};
};

export default useGetAutorizationUrl;
