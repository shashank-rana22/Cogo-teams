import { useRequest } from '@cogoport/request';

const useCreateSupplySearch = () => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/create_supply_fcl_freight_search',
		method : 'POST',
	}, { manual: true });

	const createSupplySearch = async ({ payload }) => {
		try {
			await trigger({ data: payload });
		} catch (err) {
			console.error(err);
		}
	};
	return {
		data,
		createSupplySearch,
		loading,
	};
};

export default useCreateSupplySearch;
