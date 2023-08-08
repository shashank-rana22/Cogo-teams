import { useRequest } from '@cogoport/request';

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

	return {
		data,
		loading,
		refetchListFclSearches,
	};
};

export default useListFclSearches;
