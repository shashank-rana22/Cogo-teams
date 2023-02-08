import { usePublicRequest } from '@cogoport/request';
import { useEffect } from 'react';

/**
 * Single utility hook to get outlook scopes
 */

const useScopes = () => {
	const [getScopesApi, triggerGetMail] = usePublicRequest(
		{
			url    : `${process.env.COGO_LENS_URL}/outlook_scopes`,
			method : 'GET',
		},
		{ manual: true },
	);

	/**
	 *
	 * @param {String} id Id of mail
	 */
	const getScopes = async () => {
		try {
			await triggerGetMail();
		} catch (err) {
			console.log(err);
		}
	};

	const scopeOptions = (getScopesApi?.data || []).map((scope) => ({
		label : scope,
		value : scope,
	}));

	useEffect(() => {
		getScopes();
		// eslint-disable-next-line
	}, []);

	return {
		getScopesApi,
		getScopes,
		scopeOptions,
	};
};

export default useScopes;
