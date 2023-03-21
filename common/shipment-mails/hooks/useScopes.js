import useAxios from 'axios-hooks';
import { useEffect, useCallback } from 'react';

/**
 * Single utility hook to get outlook scopes
 */

const useScopes = () => {
	const [getScopesApi, triggerGetMail] = useAxios(
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

	const getScopes = useCallback(() => {
		(
			async () => {
				try {
					await triggerGetMail();
				} catch (err) {
					console.log(err);
				}
			}
		)();
	}, [triggerGetMail]);

	const scopeOptions = (getScopesApi?.data || []).map((scope) => ({
		label : scope,
		value : scope,
	}));

	useEffect(() => {
		getScopes();
	}, [getScopes]);

	return {
		getScopesApi,
		getScopes,
		scopeOptions,
	};
};

export default useScopes;
