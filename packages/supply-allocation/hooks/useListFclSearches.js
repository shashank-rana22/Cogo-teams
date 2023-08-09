import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useListFclSearches = () => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_supply_fcl_freight_searches',
		method : 'get',
		params : {
			service_data_required: true,
		},
	}, { manual: false });

	const refetchListFclSearches = async () => {
		try {
			await trigger({
				params: {
					service_data_required: true,
				},
			});
		} catch (err) {
			console.error(err);
		}
	};

	const findFclSearch = useCallback(async (id) => {
		try {
			await trigger({
				params: {
					service_data_required : true,
					filters               : { id },
				},
			});
		} catch (err) {
			console.error(err);
		}
	}, [trigger]);

	return {
		data,
		loading,
		refetchListFclSearches,
		findFclSearch,
	};
};

export default useListFclSearches;
