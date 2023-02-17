import { usePublicRequest } from '@cogoport/request';
import { useEffect } from 'react';

/**
 * Single utility hook to get outlook scopes
 */

const useScopes = ({ showAccessUrl, scopes }) => {
	const [getScopesApi, triggerGetMail] = usePublicRequest(
		{
			url    : `${process.env.NEXT_PUBLIC_COGO_LENS_URL}/outlook_scopes`,
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
			console.log('err ::', err);
		}
	};

	const scopeOptions = (getScopesApi?.data || []).map((scope) => ({
		label : scope,
		value : scope,
	}));

	useEffect(() => {
		if (showAccessUrl) {
			getScopes();
		}
		// eslint-disable-next-line
	}, [showAccessUrl,scopes]);

	return {
		getScopesApi,
		getScopes,
		scopeOptions,
	};
};

export default useScopes;
