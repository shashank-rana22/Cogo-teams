import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const INITIAL_ARRAY = [];

const useGetAccountWiseFunnel = (byEtd, headerFilters) => {
	const scope = useSelector(({ general }) => general.scope);

	const { entity_code = INITIAL_ARRAY } = headerFilters;

	const [{ loading, data, error }, trigger] = useRequest({
		url    : 'get_account_wise_organization_funnel',
		method : 'GET',
		scope,
	}, { manual: true });

	const getAccountWiseFunnel = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						by_etd      : byEtd,
						entity_code : entity_code?.length > 0 ? entity_code : undefined,
					},
				});
			} catch (err) {
				console.log(err, 'error');
			}
		},
		[entity_code, byEtd, trigger],
	);

	useEffect(() => {
		getAccountWiseFunnel();
	}, [getAccountWiseFunnel]);

	return {
		loading,
		data,
		error,
	};
};

export default useGetAccountWiseFunnel;
