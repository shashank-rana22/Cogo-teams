import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

const useGetAccountWiseFunnel = (revenueFilter, headerFilters) => {
	const scope = useSelector(({ general }) => general.scope);

	const { entity_code = [] } = headerFilters;

	const [{ loading, data, error }, trigger] = useRequest({
		url    : 'get_account_wise_organization_funnel',
		method : 'GET',
		scope,
	}, { manual: true });

	useEffect(() => {
		const getAccountWiseFunnel = async () => {
			try {
				await trigger({
					params: {
						visualize_by : revenueFilter,
						entity_code  : entity_code.length > 0 ? entity_code : undefined,
					},
				});
			} catch (err) {
				console.log(err, 'error');
			}
		};
		getAccountWiseFunnel();
	}, [revenueFilter, entity_code, trigger]);

	return {
		loading,
		data,
		error,
	};
};

export default useGetAccountWiseFunnel;
