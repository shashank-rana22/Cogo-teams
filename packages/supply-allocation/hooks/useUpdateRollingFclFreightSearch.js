import { useRequest } from '@cogoport/request';

const useUpdateRollingFclFreightSearch = () => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/update_rolling_fcl_freight_search',
		method : 'POST',
	}, { manual: true });

	const updateRollingFclFreightSearch = async ({ payload }) => {
		try {
			await trigger({ data: payload });
		} catch (err) {
			console.error(err);
		}
	};

	return {
		data,
		loading,
		updateRollingFclFreightSearch,
	};
};
export default useUpdateRollingFclFreightSearch;
