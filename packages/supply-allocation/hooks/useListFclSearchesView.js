import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useListFclSearchesView = () => {
	const [{ data, loading }, trigger] = useRequest(
		{
			url: '/list_rolling_fcl_freight_searches',
			method: 'get',
			params: {
				service_data_required: true,
				allocation_data_required: true,
			},
		},
		{ manual: true },
	);

	const findFclSearch = useCallback(
		async (id) => {
			try {
				await trigger({
					params: {
						service_data_required: true,
						allocation_data_required: true,
						filters: { id },
					},
				});
			} catch (err) {
				console.error(err);
			}
		},
		[trigger],
	);

	return {
		data,
		loading,
		findFclSearch,
	};
};

export default useListFclSearchesView;
