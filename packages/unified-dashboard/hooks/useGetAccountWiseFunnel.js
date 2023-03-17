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
		try {
			await trigger({
				params: {
					by_etd      : byEtd,
					entity_code : entity_code.length > 0 ? entity_code : undefined,
				},
			});
		} catch (err) {
			console.log(err, 'error');
		}
	};

	useEffect(() => {
		getAccountWiseFunnel();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [byEtd, JSON.stringify(entity_code)]);

	return {
		loading,
		data,
		error,
	};
};

export default useGetAccountWiseFunnel;
