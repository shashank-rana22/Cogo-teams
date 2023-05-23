import { useLensRequest } from '@cogoport/request';
import { useEffect } from 'react';

/**
 * Single utility hook to get outlook scopes
 */

const useScopes = ({ showAccessUrl, scopes }) => {
	const [getScopesApi, triggerGetMail] = useLensRequest(
		{
			url    : '/outlook_scopes',
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
			// eslint-disable-next-line no-console
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
