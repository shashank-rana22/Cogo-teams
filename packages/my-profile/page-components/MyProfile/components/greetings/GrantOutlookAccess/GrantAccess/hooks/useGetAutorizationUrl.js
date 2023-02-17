import { usePublicRequest } from '@cogoport/request';

/**
 * Single utility hook to get authorization Url
 */

const useGetAutorizationUrl = () => {
	const [authorizationUrlApi, triggerAuthorizationUrl] = usePublicRequest(
		{
			url    : `${process.env.NEXT_PUBLIC_COGO_LENS_URL}/outlook_authorization_url`,
			method : 'GET',
		},
		{ manual: true },
	);

	/**
	 *
	 * @param {String} id Id of mail
	 */
	const getAuthorizationUrl = ({ scopes = [], redirect_url }) => triggerAuthorizationUrl({
		params: { scopes: JSON.stringify(scopes), redirect_url },
	});

	return {
		authorizationUrlApi,
		getAuthorizationUrl,
	};
};

export default useGetAutorizationUrl;
