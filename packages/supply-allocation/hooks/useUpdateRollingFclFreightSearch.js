import { useRequest } from '@cogoport/request';

const useUpdateRollingFclFreightSearch = ({ refetchListFclSearches }) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/update_rolling_fcl_freight_search',
			method : 'POST',
		},
		{ manual: true },
	);

	const updateRollingFclFreightSearch = async ({ payload }) => {
		try {
			await trigger({ data: payload });
			refetchListFclSearches();
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
