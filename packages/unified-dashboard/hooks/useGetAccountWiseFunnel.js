import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

const useGetAccountWiseFunnel = (byEtd, headerFilters) => {
	const scope = useSelector(({ general }) => general.scope);

	const { entity_code = [] } = headerFilters;

	const [{ loading, data, error }, trigger] = useRequest({
		url    : 'get_account_wise_organization_funnel',
		method : 'GET',
		scope,
	}, { manual: false });

	const getAccountWiseFunnel = async () => {
		await trigger({
			params: {
				by_etd      : byEtd,
				entity_code : entity_code.length > 0 ? entity_code : undefined,
			},
		});
	};

	useEffect(() => {
		getAccountWiseFunnel();
	}, [byEtd, JSON.stringify(entity_code)]);

	return {
		loading,
		data,
		error,
	};
};

export default useGetAccountWiseFunnel;
